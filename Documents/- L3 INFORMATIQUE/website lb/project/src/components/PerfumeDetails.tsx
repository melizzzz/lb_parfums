
import { useParams } from 'react-router-dom';
import { perfumes } from '../data/perfumes';
import { Star } from 'lucide-react';

const PerfumeDetails = () => {
  const { id } = useParams();
  const perfume = perfumes.find(p => p.id === id);
  if (!perfume) {
    return <div>Parfum non trouvé</div>;
  }

  console.log('Image path:', perfume.image);

  const similarPerfumes = perfumes.filter(p => 
    p.id !== perfume.id && 
    p.notes.some(note => perfume.notes.includes(note)) &&
    p.notes.filter(note => perfume.notes.includes(note)).length >= 2
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition duration-700 blur-xl"></div>
            <div className="relative">
              <img
                src={perfume.image}
                alt={perfume.name}
                className="rounded-lg shadow-xl w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif mb-2">{perfume.name}</h1>
              <span className="inline-block px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                {perfume.type.charAt(0).toUpperCase() + perfume.type.slice(1)}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-serif mb-3">Description</h2>
              <p className="text-gray-600">{perfume.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-serif mb-3">Notes</h2>
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

            <div className="space-y-2">
              <h2 className="text-xl font-serif">Détails</h2>
              <p className="text-2xl font-semibold">{perfume.price}€</p>
              <p className="text-gray-600">Contenance: {perfume.size}</p>
            </div>
          </div>
        </div>

        {similarPerfumes.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-serif mb-8">Parfums Similaires</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {similarPerfumes.map(similar => (
                <article key={similar.id} className="group">
                  <a href={`/perfume/${similar.id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={similar.image}
                        alt={similar.name}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300" />
                    </div>
                    <div className="p-6 bg-white border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-serif">{similar.name}</h3>
                        <Star className="h-5 w-5 text-amber-400" />
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{similar.type}</p>
                      <div className="flex flex-wrap gap-2">
                        {similar.notes.map(note => (
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
        )}
      </div>
    </div>
  );
}

export default PerfumeDetails;