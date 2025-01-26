

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center bg-gradient-to-b from-gray-100 to-white">
      <div className="absolute inset-0">
        <img
          src="src\public\images\main.jpeg"
          alt="LB PARFUMS Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/30" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
       
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
          Luxe à Portée de Main
        </h1>
        <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
          Une collection exclusive de parfums d'exception
        </p>
        <a
          href="#new-arrivals"
          className="inline-flex items-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 transition duration-300"
        >
          Découvrir la Collection
        </a>
      </div>
    </section>
  );
}

export default Hero;