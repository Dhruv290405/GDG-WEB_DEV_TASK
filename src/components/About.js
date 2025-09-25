import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
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

  const itemVariants = {
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

  const stats = [
    { number: '100M+', label: 'Active Users', icon: '👥' },
    { number: '50+', label: 'Countries', icon: '🌍' },
    { number: '10B+', label: 'Songs Played', icon: '🎵' },
    { number: '5M+', label: 'Artists', icon: '🎤' }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Music industry veteran with 15+ years of experience"
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?w=300&h=300&fit=crop&crop=face",
      bio: "Former Spotify product manager passionate about user experience"
    },
    {
      name: "Marcus Williams",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Tech innovator specializing in audio streaming technology"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-spotify-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block bg-spotify-green/20 text-spotify-green px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            🏢 About Us
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            The Future of <span className="text-spotify-green">Music Streaming</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Founded in 2020, SoundWave has quickly become one of the world's leading music streaming platforms. 
            Our mission is to connect people through the universal language of music, making it accessible to everyone, everywhere.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-spotify-green/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-spotify-green mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                It all started with a simple idea: music should be accessible to everyone, regardless of where they are or what device they're using. 
                Our founders, passionate music lovers themselves, noticed the gap in the market for a truly user-centric streaming platform.
              </p>
              <p>
                What began as a small startup in a garage has now grown into a global platform serving millions of users worldwide. 
                We've partnered with major record labels, independent artists, and content creators to bring you the most diverse music library ever assembled.
              </p>
              <p>
                Today, we continue to innovate with cutting-edge AI technology, high-fidelity audio, and social features that bring music lovers together. 
                Our journey is just beginning, and we're excited to have you along for the ride.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="w-full h-80 bg-gray-800 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" 
                  alt="Music Studio" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-spotify-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-2">Where It All Began</h4>
                <p className="text-gray-300">Our first recording studio in 2020</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Meet Our Team</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind SoundWave, working tirelessly to bring you the best music streaming experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-spotify-green/50 transition-all duration-300 text-center"
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-spotify-green/20"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-spotify-green/20 animate-pulse"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-spotify-green font-semibold mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-spotify-green to-green-400 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Values</h3>
              <div className="grid md:grid-cols-3 gap-8 text-white">
                <div>
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-xl font-bold mb-2">Innovation</h4>
                  <p className="text-white/90">Constantly pushing boundaries to deliver cutting-edge music experiences.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-xl font-bold mb-2">Community</h4>
                  <p className="text-white/90">Building connections between artists and fans around the world.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🌟</div>
                  <h4 className="text-xl font-bold mb-2">Quality</h4>
                  <p className="text-white/90">Delivering the highest quality audio and user experience possible.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;