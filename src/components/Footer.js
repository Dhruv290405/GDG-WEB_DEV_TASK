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
      title: 'Product',
      links: ['Premium', 'Free', 'Mobile App', 'Web Player', 'Download']
    },
    {
      title: 'Company',
      links: ['About', 'Jobs', 'For the Record', 'Press', 'Investors']
    },
    {
      title: 'Communities',
      links: ['For Artists', 'Developers', 'Advertising', 'Vendors', 'Spotify for Work']
    },
    {
      title: 'Useful Links',
      links: ['Support', 'Web Player', 'Free Mobile App', 'Privacy Policy', 'Terms of Service']
    }
  ];

  return (
    <footer className="bg-spotify-black text-white py-16">
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
              <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10l-3.5-2v4L12 14l3.5-2V8z"/>
                </svg>
              </div>
              <span className="text-white font-bold text-2xl">SoundWave</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Discover millions of songs, create playlists, and enjoy high-quality audio streaming anywhere, anytime.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 hover:bg-spotify-green rounded-full flex items-center justify-center transition-colors duration-200"
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
                      className="text-gray-400 hover:text-spotify-green transition-colors duration-200"
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
              <h3 className="text-2xl font-bold text-white mb-2">Stay in the Loop</h3>
              <p className="text-gray-400">Get the latest news, updates, and exclusive content delivered to your inbox.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotify-green focus:ring-1 focus:ring-spotify-green"
              />
              <motion.button
                className="bg-spotify-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors duration-200"
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
            <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors duration-200">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-spotify-green transition-colors duration-200">
              Accessibility
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-gray-400 text-center md:text-right">
            <p>&copy; 2024 SoundWave. All rights reserved.</p>
            <p className="text-sm mt-1">Made with ❤️ for music lovers worldwide</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;