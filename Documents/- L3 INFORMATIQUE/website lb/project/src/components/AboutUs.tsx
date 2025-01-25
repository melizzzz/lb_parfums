import React from 'react';
import { Star, Heart, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Notre Histoire</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une passion pour la parfumerie d'exception
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition duration-700 blur-xl"></div>
            <div className="relative">
              <img
                src="/path-to-your-about-image.jpg"
                alt="LB PARFUMS Atelier"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-100 to-white opacity-0 hover:opacity-100 transition duration-500 blur-lg"></div>
              <div className="relative space-y-4">
                <Star className="h-8 w-8 text-gray-700" />
                <h3 className="text-xl font-serif">Notre Savoir-Faire</h3>
                <p className="text-gray-600">
                  Depuis notre création, nous nous efforçons de créer des parfums d'exception, 
                  alliant tradition et modernité pour une expérience olfactive unique.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-100 to-white opacity-0 hover:opacity-100 transition duration-500 blur-lg"></div>
              <div className="relative space-y-4">
                <Heart className="h-8 w-8 text-gray-700" />
                <h3 className="text-xl font-serif">Notre Passion</h3>
                <p className="text-gray-600">
                  Chaque fragrance est soigneusement élaborée pour raconter une histoire unique, 
                  créant une symphonie de notes qui évoque émotions et souvenirs.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-100 to-white opacity-0 hover:opacity-100 transition duration-500 blur-lg"></div>
              <div className="relative space-y-4">
                <Award className="h-8 w-8 text-gray-700" />
                <h3 className="text-xl font-serif">Notre Engagement</h3>
                <p className="text-gray-600">
                  La qualité et l'excellence sont au cœur de notre démarche, 
                  avec une sélection rigoureuse des meilleurs ingrédients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;