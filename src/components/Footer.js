import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' },
    { name: 'TikTok', icon: '🎵', url: '#' }
  ];

  const footerSections = [
    {
      title: 'Products',
      links: ['Shoes', 'Clothing', 'Accessories', 'New Releases', 'Sale']
    },
    {
      title: 'Sports',
      links: ['Running', 'Basketball', 'Football', 'Soccer', 'Training']
    },
    {
      title: 'Support',
      links: ['Size Guide', 'Returns', 'Shipping', 'Contact Us', 'Nike App']
    },
    {
      title: 'Company',
      links: ['About Nike', 'News', 'Careers', 'Investors', 'Sustainability']
    }
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-6 gap-8 mb-12"
        >
          {/* Logo and Description */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.064-.462-1.824-1.386l1.02-3.927c.24-.924 1.2-1.848 2.88-2.772L9.6 6.16l-4.32-2.4c-.48-.265-.72-.663-.72-1.195 0-.532.252-.855.756-.97L7.92 1.2c.36-.086.695-.129 1.008-.129.528 0 .996.115 1.404.345L24 7.8z"/>
                </svg>
              </div>
              <span className="text-white font-bold text-2xl">NIKE</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Inspiring athletes around the world with innovative athletic footwear, apparel, and equipment.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Connected</h3>
              <p className="text-gray-400">Get the latest Nike releases, athletic tips, and exclusive offers delivered to your inbox.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
              <motion.button
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
              Accessibility
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-gray-400 text-center md:text-right">
            <p>&copy; 2024 Nike, Inc. All rights reserved.</p>
            <p className="text-sm mt-1">Made with ❤️ for athletes worldwide</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;