// Copyright 2014 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:io';

import 'package:file/file.dart';
import 'package:file_testing/file_testing.dart';

import '../../src/common.dart';
import '../test_utils.dart' show ProcessResultMatcher, fileSystem;
import '../transition_test_utils.dart';

Future<Directory> createTestProject(String packageName, Directory tempDirectory) async {
  final ProcessResult result = processManager.runSync(
    <String>[
      flutterBin,
      'create',
      '--no-pub',
      '--template=package_ffi',
      packageName,
    ],
    workingDirectory: tempDirectory.path,
  );
  if (result.exitCode != 0) {
    throw Exception(
      'flutter create failed: ${result.exitCode}\n${result.stderr}\n${result.stdout}',
    );
  }

  final Directory packageDirectory = tempDirectory.childDirectory(packageName);

  // No platform-specific boilerplate files.
  expect(packageDirectory.childDirectory('android'), isNot(exists));
  expect(packageDirectory.childDirectory('ios'), isNot(exists));
  expect(packageDirectory.childDirectory('linux'), isNot(exists));
  expect(packageDirectory.childDirectory('macos'), isNot(exists));
  expect(packageDirectory.childDirectory('windows'), isNot(exists));

  await pinDependencies(packageDirectory.childFile('pubspec.yaml'));
  await pinDependencies(
      packageDirectory.childDirectory('example').childFile('pubspec.yaml'));

  await addLinkHookDependency(packageName, packageDirectory);
  await addDynamicallyLinkedNativeLibrary(packageName, packageDirectory);

  final ProcessResult result2 = await processManager.run(
    <String>[
      flutterBin,
      'pub',
      'get',
    ],
    workingDirectory: packageDirectory.path,
  );
  expect(result2, const ProcessResultMatcher());

  return packageDirectory;
}

Future<void> addLinkHookDependency(String packageName, Directory packageDirectory) async {
  final Directory flutterDirectory = fileSystem.currentDirectory.parent.parent;
  final Directory linkHookDirectory = flutterDirectory
      .childDirectory('dev')
      .childDirectory('integration_tests')
      .childDirectory('link_hook');
  expect(linkHookDirectory, exists);

  final File pubspecFile = packageDirectory.childFile('pubspec.yaml');
  final String pubspecOld =
      (await pubspecFile.readAsString()).replaceAll('\r\n', '\n');
  final String pubspecNew = pubspecOld.replaceFirst('''
dependencies:
''', '''
dependencies:
  link_hook:
    path: ${linkHookDirectory.path}
''');
  expect(pubspecNew, isNot(pubspecOld));
  await pubspecFile.writeAsString(pubspecNew);

  final File dartFile =
      packageDirectory.childDirectory('lib').childFile('$packageName.dart');
  final String dartFileOld =
      (await dartFile.readAsString()).replaceAll('\r\n', '\n');
  // Replace with something that results in the same resulting int, so that the
  // tests don't have to be updated.
  final String dartFileNew = dartFileOld.replaceFirst(
    '''
import '${packageName}_bindings_generated.dart' as bindings;
''',
    '''
import 'package:link_hook/link_hook.dart' as l;

import '${packageName}_bindings_generated.dart' as bindings;
''',
  );
  expect(dartFileNew, isNot(dartFileOld));
  final String dartFileNew2 = dartFileNew.replaceFirst(
    'int sum(int a, int b) => bindings.sum(a, b);',
    'int sum(int a, int b) => bindings.sum(a, b) + l.difference(2, 1) - 1;',
  );
  expect(dartFileNew2, isNot(dartFileNew));
  await dartFile.writeAsString(dartFileNew2);
}

/// Adds a native library to be built by the builder and dynamically link it to
/// the  main library.
Future<void> addDynamicallyLinkedNativeLibrary(String packageName, Directory packageDirectory) async {
  // Add linked library source files.
  final Directory srcDirectory = packageDirectory.childDirectory('src');
  final File linkedLibraryHeaderFile = srcDirectory.childFile('add.h');
  await linkedLibraryHeaderFile.writeAsString('''
#include <stdint.h>

#if _WIN32
#define FFI_PLUGIN_EXPORT __declspec(dllexport)
#else
#define FFI_PLUGIN_EXPORT
#endif

FFI_PLUGIN_EXPORT intptr_t add(intptr_t a, intptr_t b);
'''
  );
  final File linkedLibrarySourceFile = srcDirectory.childFile('add.c');
  await linkedLibrarySourceFile.writeAsString('''
#include "add.h"

FFI_PLUGIN_EXPORT intptr_t add(intptr_t a, intptr_t b) {
  return a + b;
}
''');

  // Update main library to include call to linked library.
  final File mainLibrarySourceFile = srcDirectory.childFile('$packageName.c');
  String mainLibrarySource = await mainLibrarySourceFile.readAsString();
  mainLibrarySource = mainLibrarySource.replaceFirst(
    '#include "$packageName.h"',
'''
#include "$packageName.h"
#include "add.h"
''',
  );
  mainLibrarySource = mainLibrarySource.replaceAll('a + b', 'add(a, b)');
  await mainLibrarySourceFile.writeAsString(mainLibrarySource);

  // Update builder to build the native library and link it into the main library.
  const String builderSource = r'''
import 'package:native_toolchain_c/native_toolchain_c.dart';
import 'package:logging/logging.dart';
import 'package:native_assets_cli/native_assets_cli.dart';

void main(List<String> args) async {
  await build(args, (config, output) async {
    final packageName = config.packageName;

    final builders = [
      CBuilder.library(
        name: 'add',
        assetName: 'add',
        sources: ['src/add.c'],
      ),
      CBuilder.library(
        name: packageName,
        assetName: '${packageName}_bindings_generated.dart',
        sources: ['src/$packageName.c'],
        flags: config.dynamicLinkingFlags('add'),
      ),
    ];

    final logger = Logger('')
        ..level = Level.ALL
        ..onRecord.listen((record) => print(record.message));

    for (final builder in builders) {
      await builder.run(
        config: config,
        output: output,
        logger: logger,
      );
    }
  });
}

extension on BuildConfig {
  List<String> dynamicLinkingFlags(String libraryName) => switch (targetOS) {
        OS.macOS || OS.iOS => [
            '-L${outputDirectory.toFilePath()}',
            '-l$libraryName',
          ],
        OS.linux || OS.android => [
            '-Wl,-rpath=\$ORIGIN/.',
            '-L${outputDirectory.toFilePath()}',
            '-l$libraryName',
          ],
        OS.windows => [
            outputDirectory.resolve('$libraryName.lib').toFilePath()
          ],
        _ => throw UnimplementedError('Unsupported OS: $targetOS'),
      };
}
''';

  final Directory hookDirectory = packageDirectory.childDirectory('hook');
  final File builderFile = hookDirectory.childFile('build.dart');
  await builderFile.writeAsString(builderSource);
}

Future<void> pinDependencies(File pubspecFile) async {
  expect(pubspecFile, exists);
  final String oldPubspec = await pubspecFile.readAsString();
  final String newPubspec = oldPubspec.replaceAll(RegExp(r':\s*\^'), ': ');
  expect(newPubspec, isNot(oldPubspec));
  await pubspecFile.writeAsString(newPubspec);
}


Future<void> inTempDir(Future<void> Function(Directory tempDirectory) fun) async {
  final Directory tempDirectory = fileSystem.directory(fileSystem.systemTempDirectory.createTempSync().resolveSymbolicLinksSync());
  try {
    await fun(tempDirectory);
  } finally {
    tryToDelete(tempDirectory);
  }
}
