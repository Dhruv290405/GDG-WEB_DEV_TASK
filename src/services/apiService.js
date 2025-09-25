// Simulate backend API calls
class NikeApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.orders = JSON.parse(localStorage.getItem('nike-orders') || '[]');
    this.products = JSON.parse(localStorage.getItem('nike-products') || '[]');
  }

  // Simulate network delay
  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Product API
  async getProducts(filters = {}) {
    await this.delay();
    
    try {
      // In a real app, this would be an HTTP request
      let products = this.products.length > 0 ? this.products : this.getDefaultProducts();
      
      // Apply filters
      if (filters.category && filters.category !== 'all') {
        products = products.filter(p => 
          p.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.search) {
        products = products.filter(p => 
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.category.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      return {
        success: true,
        data: products,
        total: products.length
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch products'
      };
    }
  }

  async getProduct(id) {
    await this.delay(200);
    
    try {
      const products = this.products.length > 0 ? this.products : this.getDefaultProducts();
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return {
          success: false,
          error: 'Product not found'
        };
      }
      
      return {
        success: true,
        data: product
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch product'
      };
    }
  }

  // Order API
  async createOrder(orderData) {
    await this.delay(1000); // Simulate longer processing time
    
    try {
      const order = {
        id: 'ORD-' + Date.now(),
        orderNumber: 'NK' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        ...orderData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      this.orders.push(order);
      localStorage.setItem('nike-orders', JSON.stringify(this.orders));
      
      // Send confirmation email (simulated)
      this.sendOrderConfirmation(order);
      
      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create order'
      };
    }
  }

  async getOrders(userId) {
    await this.delay();
    
    try {
      const userOrders = this.orders.filter(order => order.userId === userId);
      
      return {
        success: true,
        data: userOrders
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch orders'
      };
    }
  }

  async getOrder(orderId) {
    await this.delay();
    
    try {
      const order = this.orders.find(order => order.id === orderId);
      
      if (!order) {
        return {
          success: false,
          error: 'Order not found'
        };
      }
      
      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch order'
      };
    }
  }

  // User API
  async loginUser(credentials) {
    await this.delay();
    
    try {
      // Simulate user authentication
      if (credentials.email && credentials.password) {
        const user = {
          id: 'user-' + Date.now(),
          email: credentials.email,
          name: credentials.name || 'Nike Customer',
          token: 'fake-jwt-token-' + Math.random().toString(36).substr(2)
        };
        
        localStorage.setItem('nike-user', JSON.stringify(user));
        
        return {
          success: true,
          data: user
        };
      }
      
      return {
        success: false,
        error: 'Invalid credentials'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed'
      };
    }
  }

  async registerUser(userData) {
    await this.delay();
    
    try {
      const user = {
        id: 'user-' + Date.now(),
        ...userData,
        token: 'fake-jwt-token-' + Math.random().toString(36).substr(2),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('nike-user', JSON.stringify(user));
      
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed'
      };
    }
  }

  // Inventory API
  async checkInventory(productId, size) {
    await this.delay(200);
    
    try {
      // Simulate inventory check
      const inStock = Math.random() > 0.1; // 90% chance of being in stock
      const quantity = inStock ? Math.floor(Math.random() * 10) + 1 : 0;
      
      return {
        success: true,
        data: {
          productId,
          size,
          inStock,
          quantity,
          estimatedRestock: inStock ? null : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to check inventory'
      };
    }
  }

  // Payment API
  async processPayment(paymentData) {
    await this.delay(2000); // Simulate payment processing
    
    try {
      // Simulate payment processing
      const success = Math.random() > 0.05; // 95% success rate
      
      if (success) {
        return {
          success: true,
          data: {
            transactionId: 'TXN-' + Date.now(),
            status: 'completed',
            amount: paymentData.amount,
            currency: paymentData.currency || 'USD',
            processedAt: new Date().toISOString()
          }
        };
      } else {
        return {
          success: false,
          error: 'Payment declined'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
  }

  // Wishlist API
  async addToWishlist(userId, productId) {
    await this.delay(300);
    
    try {
      const wishlists = JSON.parse(localStorage.getItem('nike-wishlists') || '{}');
      
      if (!wishlists[userId]) {
        wishlists[userId] = [];
      }
      
      if (!wishlists[userId].includes(productId)) {
        wishlists[userId].push(productId);
        localStorage.setItem('nike-wishlists', JSON.stringify(wishlists));
      }
      
      return {
        success: true,
        data: wishlists[userId]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to add to wishlist'
      };
    }
  }

  async getWishlist(userId) {
    await this.delay();
    
    try {
      const wishlists = JSON.parse(localStorage.getItem('nike-wishlists') || '{}');
      const userWishlist = wishlists[userId] || [];
      
      // Get product details for wishlist items
      const products = this.getDefaultProducts();
      const wishlistProducts = products.filter(p => userWishlist.includes(p.id));
      
      return {
        success: true,
        data: wishlistProducts
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch wishlist'
      };
    }
  }

  // Helper methods
  sendOrderConfirmation(order) {
    // Simulate sending email confirmation
    console.log(`Order confirmation sent for order ${order.orderNumber}`);
    
    // In a real app, this would trigger an email service
    setTimeout(() => {
      console.log(`Order ${order.orderNumber} confirmed via email`);
    }, 1000);
  }

  getDefaultProducts() {
    return [
      {
        id: 1,
        name: "Air Max 270",
        category: "Lifestyle",
        price: "$150",
        priceNum: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center"
        ],
        description: "The Nike Air Max 270 delivers visible Air cushioning under every step.",
        features: ["Air Max cushioning", "Breathable mesh", "Durable construction"],
        sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        colors: ["Black/White", "Blue/Red", "Grey/Orange"],
        rating: 4.5,
        reviews: 1234
      },
      {
        id: 2,
        name: "Air Jordan 1",
        category: "Basketball",
        price: "$170",
        priceNum: 170,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center"
        ],
        description: "The legendary Air Jordan 1 in its original colorway.",
        features: ["Classic design", "Premium leather", "Air cushioning"],
        sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        colors: ["Chicago", "Bred", "Royal"],
        rating: 4.8,
        reviews: 2156
      }
      // Add more products as needed
    ];
  }

  // Analytics API
  async trackEvent(eventName, properties = {}) {
    // Simulate analytics tracking
    console.log('Analytics Event:', eventName, properties);
    
    const events = JSON.parse(localStorage.getItem('nike-analytics') || '[]');
    events.push({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    });
    
    localStorage.setItem('nike-analytics', JSON.stringify(events));
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('nike-session-id');
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2);
      sessionStorage.setItem('nike-session-id', sessionId);
    }
    return sessionId;
  }
}

// Create singleton instance
const nikeApiService = new NikeApiService();

export default nikeApiService;