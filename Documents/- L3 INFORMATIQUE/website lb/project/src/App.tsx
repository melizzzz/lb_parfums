
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';
import AboutUs from './components/AboutUs';
import Collections from './components/Collections';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import PerfumeDetails from './components/PerfumeDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <NewArrivals />
              <AboutUs />
              <Collections />
            </main>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/perfume/:id" element={<PerfumeDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;