import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Pricing = () => {
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

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for casual listeners",
      features: [
        "Ad-supported streaming",
        "Shuffle play only",
        "Limited skips",
        "Standard audio quality",
        "Mobile and web access"
      ],
      buttonText: "Get Started",
      buttonStyle: "border-2 border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-white",
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "For the ultimate music experience",
      features: [
        "Ad-free streaming",
        "Unlimited skips",
        "Offline downloads",
        "High-quality audio",
        "All devices supported",
        "Exclusive content"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-spotify-green text-white hover:bg-green-500",
      popular: true
    },
    {
      name: "Family",
      price: "$14.99",
      period: "per month",
      description: "Share music with your loved ones",
      features: [
        "Up to 6 accounts",
        "All Premium features",
        "Family mix playlists",
        "Parental controls",
        "Individual profiles",
        "Shared playlists"
      ],
      buttonText: "Choose Family",
      buttonStyle: "border-2 border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-white",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-spotify-black">
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
            className="inline-block bg-spotify-green/20 text-spotify-green px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            💰 Pricing
          </motion.span>
          
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Choose Your <span className="text-spotify-green">Perfect Plan</span>
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            From free listening to premium features, we have a plan that fits your lifestyle and budget.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
              className={`relative group ${plan.popular ? 'z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-spotify-green text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.popular 
                  ? 'border-spotify-green shadow-lg shadow-spotify-green/20' 
                  : 'border-gray-700 hover:border-spotify-green/50'
              }`}>
                {/* Background glow for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-spotify-green/10 to-green-400/10"></div>
                )}

                <div className="relative z-10">
                  {/* Plan header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-spotify-green">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-spotify-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-200 ${plan.buttonStyle}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.buttonText}
                  </motion.button>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-spotify-green/0 to-green-400/0 group-hover:from-spotify-green/5 group-hover:to-green-400/5 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money back guarantee */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-gray-700">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-white mb-4">30-Day Money Back Guarantee</h3>
            <p className="text-gray-300">
              Try any premium plan risk-free. If you're not completely satisfied, we'll refund your money within 30 days.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;