import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Just Do It",
    "Find Your Greatness",
    "Unleash Your Potential",
    "Victory Starts Here"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-spotify-black via-gray-900 to-green-900">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-spotify-green rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 z-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                👟 New Collection
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block">Step Into</span>
                <motion.span
                  key={currentText}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 min-h-[1.2em]"
                >
                  {texts[currentText]}
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Discover the latest Nike sneakers, athletic wear, and sports gear designed for champions. Elevate your performance.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => {
                  const element = document.getElementById('products');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-spotify-black transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start space-x-8 mt-12"
            >
              {[
                { number: '500+', label: 'Shoe Models' },
                { number: '180+', label: 'Countries' },
                { number: '50+', label: 'Sports' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-spotify-green">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Nike Shoe Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-96 lg:h-[500px] relative flex items-center justify-center"
          >
            {/* Main Shoe Image */}
            <motion.div
              className="relative w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center" 
                alt="Nike Air Max Sneaker"
                className="w-64 h-64 object-contain transform -rotate-12 hover:rotate-0 transition-transform duration-500"
              />
              
              {/* Floating product highlights */}
              {[
                { icon: "🏃", label: "Run", pos: { top: "10%", left: "10%" } },
                { icon: "🏀", label: "Basketball", pos: { top: "20%", right: "10%" } },
                { icon: "⚽", label: "Soccer", pos: { bottom: "20%", left: "5%" } },
                { icon: "🎾", label: "Tennis", pos: { bottom: "10%", right: "15%" } },
                { icon: "🏋️", label: "Training", pos: { top: "50%", left: "0%" } },
                { icon: "🚴", label: "Cycling", pos: { top: "60%", right: "0%" } }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 text-white text-sm font-semibold border border-white/20"
                  style={item.pos}
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Additional shoe images floating around */}
            <motion.img
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=150&fit=crop&crop=center"
              alt="Nike Running Shoe"
              className="absolute top-20 left-10 w-24 h-24 object-contain opacity-60"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=150&fit=crop&crop=center"
              alt="Nike Basketball Shoe"
              className="absolute bottom-20 right-10 w-24 h-24 object-contain opacity-60"
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
        <p className="text-white text-sm mt-2 text-center">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;