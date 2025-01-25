import React from 'react';

const femmeCollection = [
  {
    id: 1,
    name: "Élégance Nocturne",
    image: "/path-to-your-femme-1.jpg",
    description: "Notes florales et musquées",
    notes: ["Rose", "Jasmin", "Musc Blanc"]
  },
  // Add more feminine perfumes
];

const hommeCollection = [
  {
    id: 1,
    name: "Bois Précieux",
    image: "/path-to-your-homme-1.jpg",
    description: "Notes boisées et épicées",
    notes: ["Santal", "Vétiver", "Poivre Noir"]
  },
  // Add more masculine perfumes
];

const Collections = () => {
  return (
    <>
      <section id="femme" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Collection Femme</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des fragrances délicates et raffinées
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {femmeCollection.map((perfume) => (
              <article key={perfume.id} className="group">
                <div className="relative overflow-hidden bg-white">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 transition duration-300" />
                </div>
                <div className="p-6 bg-white border border-gray-200">
                  <h3 className="text-xl font-serif mb-2">{perfume.name}</h3>
                  <p className="text-gray-600 mb-4">{perfume.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="homme" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Collection Homme</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des fragrances élégantes et caractère
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hommeCollection.map((perfume) => (
              <article key={perfume.id} className="group">
                <div className="relative overflow-hidden bg-white">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 transition duration-300" />
                </div>
                <div className="p-6 bg-white border border-gray-200">
                  <h3 className="text-xl font-serif mb-2">{perfume.name}</h3>
                  <p className="text-gray-600 mb-4">{perfume.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Collections;