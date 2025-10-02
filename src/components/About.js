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
    { number: '75,000+', label: 'Global Employees', icon: '👥' },
    { number: '190+', label: 'Countries Served', icon: '🌍' },
    { number: 'Millions', label: 'Athletes Inspired', icon: '�' },
    { number: '60+', label: 'Years of Innovation', icon: '�' }
  ];

  const team = [
    {
      name: "Phil Knight",
      role: "Co-Founder & Chairman Emeritus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Co-founded Nike in 1964, transforming it into the world's leading athletic brand"
    },
    {
      name: "John Donahoe",
      role: "President & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?w=300&h=300&fit=crop&crop=face",
      bio: "Leading Nike's digital transformation and global expansion strategy"
    },
    {
      name: "Bill Bowerman",
      role: "Co-Founder & Innovation Pioneer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Track coach and innovator who created Nike's first revolutionary sole designs"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
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
            className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            👟 About Nike
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Inspiring Athletes <span className="text-orange-400">Around the World</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Founded in 1964 as Blue Ribbon Sports, Nike has grown from a small Oregon-based company to the world's leading athletic footwear and apparel brand. 
            Our mission remains unchanged: to bring inspiration and innovation to every athlete in the world.
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
              className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-orange-400/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-orange-400 mb-2">{stat.number}</div>
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
                It all started with a simple idea by Bill Bowerman and Phil Knight: athletes deserved better footwear that could enhance their performance. 
                What began as Blue Ribbon Sports in 1964 was founded on the belief that if you have a body, you are an athlete.
              </p>
              <p>
                From our revolutionary waffle sole design to the iconic Air cushioning technology, Nike has consistently pushed the boundaries of athletic performance. 
                We've grown from a small Oregon-based company to serving athletes across more than 190 countries worldwide.
              </p>
              <p>
                Today, Nike continues to innovate with cutting-edge materials, sustainable practices, and empowering athletes at every level. 
                Our commitment to inspiration and innovation drives everything we do - because greatness isn't just a destination, it's a journey.
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
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop" 
                  alt="Nike Shoes Collection" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-2">Innovation in Every Step</h4>
                <p className="text-gray-300">Nike's commitment to athletic excellence</p>
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
            <h3 className="text-3xl font-bold text-white mb-4">Our Leadership</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The visionary leaders who have shaped Nike into the world's leading athletic brand, inspiring athletes everywhere.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-orange-400/50 transition-all duration-300 text-center"
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-orange-400/20"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-orange-400/20 animate-pulse"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-orange-400 font-semibold mb-3">{member.role}</p>
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
            className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Values</h3>
              <div className="grid md:grid-cols-4 gap-6 text-white">
                <div>
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-xl font-bold mb-2">Innovation</h4>
                  <p className="text-white/90">Constantly pushing boundaries to deliver cutting-edge athletic performance and design.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-xl font-bold mb-2">Authenticity</h4>
                  <p className="text-white/90">Staying true to our athletic roots while inspiring athletes around the world.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🌟</div>
                  <h4 className="text-xl font-bold mb-2">Excellence</h4>
                  <p className="text-white/90">Delivering the highest quality products and experiences for every athlete.</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🌱</div>
                  <h4 className="text-xl font-bold mb-2">Sustainability</h4>
                  <p className="text-white/90">Protecting the planet for future generations of athletes through sustainable practices.</p>
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