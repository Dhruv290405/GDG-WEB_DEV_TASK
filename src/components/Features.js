import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: "�",
      title: "Air Max Technology",
      description: "Revolutionary cushioning system that provides superior comfort and impact protection for every step.",
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop&crop=center"
    },
    {
      icon: "⚡",
      title: "Zoom Air Responsive",
      description: "Lightning-fast energy return technology engineered for explosive performance and speed.",
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=200&fit=crop&crop=center"
    },
    {
      icon: "🛡️",
      title: "Durable Construction",
      description: "Premium materials and innovative design built to withstand the toughest training sessions.",
      color: "from-green-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop&crop=center"
    },
    {
      icon: "🎯",
      title: "Precision Fit",
      description: "Advanced fitting system that adapts to your foot shape for personalized comfort and support.",
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop&crop=center"
    },
    {
      icon: "🌟",
      title: "Style Innovation",
      description: "Cutting-edge designs that seamlessly blend athletic performance with street-ready fashion.",
      color: "from-indigo-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=200&fit=crop&crop=center"
    },
    {
      icon: "�",
      title: "Sustainable Materials",
      description: "Eco-friendly construction using recycled materials without compromising on performance or style.",
      color: "from-pink-500 to-rose-500",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=200&fit=crop&crop=center"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-spotify-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={cardVariants}
            className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            👟 Technology
          </motion.span>
          
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Why Choose <span className="text-orange-400">NIKE?</span>
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Experience athletic excellence with innovative technology and designs crafted for champions at every level.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 overflow-hidden">
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Shoe Image */}
                <div className="relative z-10 mb-4">
                  <div className="w-full h-32 bg-gray-700 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional feature showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.div
            variants={cardVariants}
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Elevate Your Game?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join millions of athletes worldwide and discover your perfect pair of Nike shoes today.
              </p>
              <motion.button
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Collection
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;