import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, loading } = useCart();

  const allProducts = useMemo(() => [
    {
      name: "Air Max 270",
      category: "Lifestyle",
      price: "$150",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center",
      color: "from-blue-500 to-purple-600",
      priceNum: 150
    },
    {
      name: "Air Jordan 1",
      category: "Basketball",
      price: "$170",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
      color: "from-red-500 to-pink-600",
      priceNum: 170
    },
    {
      name: "React Infinity",
      category: "Running",
      price: "$160",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop&crop=center",
      color: "from-green-500 to-teal-600",
      priceNum: 160
    },
    {
      name: "Blazer Mid '77",
      category: "Casual",
      price: "$100",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&crop=center",
      color: "from-orange-500 to-yellow-600",
      priceNum: 100
    },
    {
      name: "Dunk Low",
      category: "Skateboarding",
      price: "$110",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop&crop=center",
      color: "from-purple-500 to-indigo-600",
      priceNum: 110
    },
    {
      name: "Air Force 1",
      category: "Classic",
      price: "$90",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&crop=center",
      color: "from-gray-500 to-gray-700",
      priceNum: 90
    },
    {
      name: "Zoom Pegasus",
      category: "Running",
      price: "$130",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&crop=center",
      color: "from-blue-400 to-cyan-500",
      priceNum: 130
    },
    {
      name: "Cortez Classic",
      category: "Retro",
      price: "$75",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center",
      color: "from-red-400 to-orange-500",
      priceNum: 75
    },
    {
      name: "Metcon 7",
      category: "Training",
      price: "$130",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
      color: "from-gray-600 to-black",
      priceNum: 130
    }
  ], []);

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (filter !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filter.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.priceNum - b.priceNum;
        case 'price-high':
          return b.priceNum - a.priceNum;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [filter, searchTerm, sortBy, allProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleQuickAdd = async (product, e) => {
    e.stopPropagation();
    
    const cartItem = {
      ...product,
      size: '9',
      quantity: 1,
      id: `${product.name}-9-${Date.now()}`
    };

    await addToCart(cartItem);
  };

  const categories = ['all', 'running', 'basketball', 'lifestyle', 'classic', 'training', 'casual', 'skateboarding', 'retro'];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Nike <span className="text-orange-400">Store</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our complete collection of Nike footwear, from performance running shoes to lifestyle sneakers.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  filter === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-400">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={`${product.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
              onClick={() => handleProductClick(product)}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Price tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-black font-bold">{product.price}</span>
                </div>

                {/* Quick actions */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  Nike {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={(e) => handleQuickAdd(product, e)}
                    disabled={loading}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    whileTap={{ scale: loading ? 1 : 0.95 }}
                  >
                    {loading ? 'Adding...' : 'Quick Add'}
                  </motion.button>
                  
                  <span className="text-2xl font-bold text-white">
                    {product.price}
                  </span>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </div>
    </section>
  );
};

export default Shop;