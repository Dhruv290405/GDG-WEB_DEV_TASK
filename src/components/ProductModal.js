import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart, loading } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
  
  const productImages = [
    product?.image,
    product?.image, // In a real app, you'd have multiple product images
    product?.image,
    product?.image
  ];

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      ...product,
      size: selectedSize,
      quantity: quantity,
      id: `${product.name}-${selectedSize}-${Date.now()}`
    };

    await addToCart(cartItem);
    
    // Reset form
    setSelectedSize('');
    setQuantity(1);
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={productImages[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image thumbnails */}
                  <div className="grid grid-cols-4 gap-2">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-orange-500' : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h2 className="text-3xl font-bold text-gray-900 mt-1">
                        Nike {product.name}
                      </h2>
                      <div className="flex items-center mt-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm ml-2">(4.8) • 1,234 reviews</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-bold text-gray-900">
                    {product.price}
                  </div>

                  {/* Description */}
                  <div className="text-gray-600">
                    <p>
                      Experience ultimate comfort and style with the Nike {product.name}. 
                      Featuring innovative technology and premium materials, these shoes are 
                      designed for both performance and everyday wear.
                    </p>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 border rounded-lg font-semibold transition-colors ${
                            selectedSize === size
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-gray-300 hover:border-orange-300 text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Size guide • Free returns within 30 days
                    </p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-orange-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Breathable mesh upper
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Air cushioning technology
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Durable rubber outsole
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Classic Nike styling
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={loading || !selectedSize}
                      className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding to Cart...
                        </span>
                      ) : (
                        `Add to Cart • ${product.price}`
                      )}
                    </motion.button>
                    
                    <button className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Add to Favorites
                    </button>
                  </div>

                  {/* Shipping Info */}
                  <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Free shipping on orders over $50
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Free returns within 30 days
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Delivery in 2-5 business days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;