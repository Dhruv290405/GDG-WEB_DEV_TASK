import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import OnboardingModal from './OnboardingModal';
import UserProfileModal from './UserProfileModal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, needsOnboarding } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle onboarding flow
  useEffect(() => {
    if (needsOnboarding && isAuthenticated) {
      setIsOnboardingModalOpen(true);
    }
  }, [needsOnboarding, isAuthenticated]);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      setIsProfileModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      setIsOnboardingModalOpen(true);
    } else {
      setIsRegisterModalOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <motion.button
                onClick={handleLoginClick}
                className="flex items-center space-x-2 text-white hover:text-spotify-green transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=f97316&color=fff&size=32`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                />
                <span className="font-medium">{user?.firstName || user?.name?.split(' ')[0] || 'User'}</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleLoginClick}
                className="text-white hover:text-spotify-green transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            )}
            
            {/* Cart Icon */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-orange-400 transition-colors duration-200 p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCartItemsCount()}
                </span>
              )}
            </motion.button>
            
            <motion.button
              onClick={handleGetStartedClick}
              className="bg-spotify-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(29, 185, 84, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {isAuthenticated ? 'Personalize' : 'Get Started'}
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
                {isAuthenticated ? (
                  <motion.button
                    onClick={handleLoginClick}
                    className="flex items-center space-x-2 text-white hover:text-spotify-green transition-colors duration-200 text-left"
                    variants={itemVariants}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=f97316&color=fff&size=32`}
                      alt="Profile"
                      className="w-6 h-6 rounded-full border border-white/20"
                    />
                    <span>{user?.firstName || user?.name?.split(' ')[0] || 'Profile'}</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleLoginClick}
                    className="text-white hover:text-spotify-green transition-colors duration-200 text-left"
                    variants={itemVariants}
                    whileTap={{ scale: 0.95 }}
                  >
                    Log In
                  </motion.button>
                )}
                
                {/* Mobile Cart Button */}
                <motion.button
                  onClick={() => setIsCartOpen(true)}
                  className="text-white hover:text-orange-400 transition-colors duration-200 text-left flex items-center"
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart ({getCartItemsCount()})
                </motion.button>
                
                <motion.button
                  onClick={handleGetStartedClick}
                  className="bg-spotify-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition-all duration-200 w-fit"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAuthenticated ? 'Personalize' : 'Get Started'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
      
      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Authentication Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        switchToRegister={switchToRegister}
      />
      
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
        switchToLogin={switchToLogin}
      />
      
      <OnboardingModal 
        isOpen={isOnboardingModalOpen} 
        onClose={() => setIsOnboardingModalOpen(false)}
      />
      
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
      />
    </motion.header>
  );
};

export default Header;