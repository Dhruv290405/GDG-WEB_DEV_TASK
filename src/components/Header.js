import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-spotify-black/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center transform -skew-x-12">
              <svg className="w-5 h-5 text-black transform skew-x-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.064-.462-1.824-1.386l1.02-3.927c.24-.924 1.2-1.848 2.88-2.772L9.6 6.16l-4.32-2.4c-.48-.265-.72-.663-.72-1.195 0-.532.252-.855.756-.97L7.92 1.2c.36-.086.695-.129 1.008-.129.528 0 .996.115 1.404.345L24 7.8z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl">NIKE</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'features', 'pricing', 'about'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white hover:text-spotify-green transition-colors duration-200 capitalize font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="text-white hover:text-spotify-green transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Log in
            </motion.button>
            <motion.button
              className="bg-spotify-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col space-y-4">
              {['home', 'features', 'pricing', 'about'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-spotify-green transition-colors duration-200 capitalize font-medium text-left"
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <motion.button
                  className="text-white hover:text-spotify-green transition-colors duration-200 text-left"
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  Log in
                </motion.button>
                <motion.button
                  className="bg-spotify-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition-all duration-200 w-fit"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;