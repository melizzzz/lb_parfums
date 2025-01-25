import React from 'react';
import { SprayCan as Spray } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <Spray className="h-6 w-6" />
              <span className="text-xl font-serif">LB PARFUMS</span>
            </div>
            <p className="text-sm">
              Le luxe accessible, des parfums d'exception
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-serif mb-4">Contact</h4>
            <address className="text-sm not-italic">
              <p>LB PARFUMS</p>
              <p>13500 Martigues</p>
              <p className="mt-2">contact@lbparfums.fr</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-white font-serif mb-4">Suivez-nous</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-white transition">Instagram</a>
              <a href="#" className="block hover:text-white transition">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} LB PARFUMS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;