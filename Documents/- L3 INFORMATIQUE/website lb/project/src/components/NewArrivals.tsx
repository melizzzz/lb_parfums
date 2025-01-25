import React from 'react';
import { Star } from 'lucide-react';

const newArrivals = [
  {
    id: 1,
    name: "L'Élégance",
    type: "Femme",
    image: "/path-to-your-new-arrival-1.jpg",
    description: "Une nouvelle création florale et délicate"
  },
  {
    id: 2,
    name: "Le Distingué",
    type: "Homme",
    image: "/path-to-your-new-arrival-2.jpg",
    description: "Un parfum boisé aux notes raffinées"
  }
];

const NewArrivals = () => {
  return (
    <section id="new-arrivals" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Nouveautés</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos dernières créations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {newArrivals.map((perfume) => (
            <article key={perfume.id} className="group">
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 transition duration-300" />
              </div>
              <div className="p-6 bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif">{perfume.name}</h3>
                  <span className="text-sm text-gray-500">{perfume.type}</span>
                </div>
                <p className="text-gray-600">{perfume.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;