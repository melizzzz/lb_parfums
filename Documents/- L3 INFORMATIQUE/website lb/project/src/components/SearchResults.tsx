import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchPerfumes } from '../utils/search';
import { Star } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchPerfumes(query);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-serif mb-4">
            Résultats de recherche pour "{query}"
          </h1>
          <p className="text-gray-600">
            {results.length} parfum(s) trouvé(s)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(perfume => (
            <article key={perfume.id} className="group">
              <a href={`/perfume/${perfume.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300" />
                </div>
                <div className="p-6 bg-white border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif">{perfume.name}</h3>
                    <Star className="h-5 w-5 text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{perfume.type}</p>
                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.map(note => (
                      <span
                        key={note}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;