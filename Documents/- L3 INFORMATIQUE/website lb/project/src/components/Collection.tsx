import React from 'react';
import { Star } from 'lucide-react';

const perfumes = [
  {
    id: 1,
    name: "Royal Oud",
    brand: "Maison de Luxe",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80",
    description: "A majestic blend of rare oud wood and royal roses",
    notes: ["Oud", "Rose", "Sandalwood"]
  },
  {
    id: 2,
    name: "Midnight Jasmine",
    brand: "Essence Pure",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80",
    description: "An enchanting evening fragrance with blooming jasmine",
    notes: ["Jasmine", "Vanilla", "Musk"]
  },
  {
    id: 3,
    name: "Azure Dreams",
    brand: "Maison de Luxe",
    image: "https://images.unsplash.com/photo-1592945403244-b3faa7b3a4e1?auto=format&fit=crop&q=80",
    description: "Fresh marine notes mixed with exotic citrus",
    notes: ["Bergamot", "Marine Notes", "Amber"]
  }
];

const Collection = () => {
  return (
    <section id="collection" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Signature Collection</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Each fragrance tells a unique story, crafted with the finest ingredients
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumes.map((perfume) => (
            <article key={perfume.id} className="group">
              <div className="relative overflow-hidden">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300" />
              </div>
              <div className="p-6 bg-white border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif">{perfume.name}</h3>
                  <Star className="h-5 w-5 text-amber-400" />
                </div>
                <p className="text-sm text-neutral-500 mb-4">{perfume.brand}</p>
                <p className="text-neutral-600 mb-4">{perfume.description}</p>
                <div className="flex flex-wrap gap-2">
                  {perfume.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full"
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
  );
}

export default Collection;