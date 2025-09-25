import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ShoeGallery from './components/ShoeGallery';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <Hero />
            <Features />
            <ShoeGallery />
            <Pricing />
            <About />
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
