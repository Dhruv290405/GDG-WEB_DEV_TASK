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
      name: "Essential",
      price: "$50-90",
      period: "price range",
      description: "Perfect for everyday athletes",
      features: [
        "Classic Nike designs",
        "Basic comfort technology",
        "Durable construction",
        "Wide size selection",
        "Standard warranty"
      ],
      buttonText: "Shop Essential",
      buttonStyle: "border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white",
      popular: false
    },
    {
      name: "Performance",
      price: "$90-150",
      period: "price range",
      description: "For serious athletes and enthusiasts",
      features: [
        "Advanced cushioning technology",
        "Premium materials",
        "Sport-specific designs",
        "Enhanced durability",
        "Performance analytics",
        "Exclusive colorways"
      ],
      buttonText: "Shop Performance",
      buttonStyle: "bg-orange-500 text-white hover:bg-orange-600",
      popular: true
    },
    {
      name: "Elite",
      price: "$150+",
      period: "premium range",
      description: "For professional and elite athletes",
      features: [
        "Cutting-edge innovations",
        "Limited edition releases",
        "Custom fit options",
        "Professional athlete collaborations",
        "Premium materials only",
        "VIP access to drops"
      ],
      buttonText: "Shop Elite",
      buttonStyle: "border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-black">
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
            💰 Shop by Price
          </motion.span>
          
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Find Your <span className="text-orange-400">Perfect Pair</span>
          </motion.h2>
          
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            From everyday essentials to elite performance gear, we have Nike shoes that fit your needs and budget.
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
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.popular 
                  ? 'border-orange-400 shadow-lg shadow-orange-400/20' 
                  : 'border-gray-700 hover:border-orange-400/50'
              }`}>
                {/* Background glow for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-400/10"></div>
                )}

                <div className="relative z-10">
                  {/* Plan header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-orange-400">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 to-red-400/0 group-hover:from-orange-500/5 group-hover:to-red-400/5 transition-all duration-300"></div>
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
            <h3 className="text-2xl font-bold text-white mb-4">60-Day Return Policy</h3>
            <p className="text-gray-300">
              Try any Nike shoes risk-free. If you're not completely satisfied with the fit or performance, return them within 60 days.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;