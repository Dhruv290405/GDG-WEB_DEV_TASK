import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-spotify-green text-white hover:bg-green-500 focus:ring-spotify-green shadow-lg hover:shadow-green-500/25',
    secondary: 'border-2 border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-white focus:ring-spotify-green',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-spotify-black focus:ring-white',
    ghost: 'text-white hover:text-spotify-green hover:bg-spotify-green/10 focus:ring-spotify-green'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;