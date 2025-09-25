// Nike API Service - Comprehensive e-commerce and authentication simulation
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

  // Authentication API
  async loginUser(credentials) {
    await this.delay();
    
    try {
      const { email, password, provider } = credentials;
      
      // For social login
      if (provider && (provider === 'google' || provider === 'facebook')) {
        const user = {
          id: credentials.id || `${provider}-${Date.now()}`,
          email: credentials.email || `user@${provider}.com`,
          name: credentials.name || `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          firstName: credentials.firstName || provider.charAt(0).toUpperCase() + provider.slice(1),
          lastName: credentials.lastName || 'User',
          provider: provider,
          avatar: credentials.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name || provider)}&background=f97316&color=fff`,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          preferences: {},
          isNewUser: false
        };
        
        return {
          success: true,
          data: user
        };
      }
      
      // For email/password login
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }
      
      // Simulate checking credentials (in real app, this would be server-side)
      const existingUsers = JSON.parse(localStorage.getItem('nike-users') || '[]');
      const user = existingUsers.find(u => u.email === email);
      
      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  async registerUser(userData) {
    await this.delay();
    
    try {
      const { email, firstName, lastName, name, provider } = userData;
      
      if (!email) {
        return {
          success: false,
          error: 'Email is required'
        };
      }
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('nike-users') || '[]');
      const existingUser = existingUsers.find(u => u.email === email);
      
      if (existingUser) {
        return {
          success: false,
          error: 'An account with this email already exists'
        };
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        email,
        firstName: firstName || name?.split(' ')[0] || 'User',
        lastName: lastName || name?.split(' ')[1] || '',
        name: name || `${firstName} ${lastName}`,
        provider: provider || 'email',
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=f97316&color=fff`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: userData.preferences || {},
        goals: userData.goals || {},
        style: userData.style || {},
        isNewUser: true,
        onboardingCompleted: false,
        ...userData
      };
      
      // Save user
      existingUsers.push(newUser);
      localStorage.setItem('nike-users', JSON.stringify(existingUsers));
      
      return {
        success: true,
        data: newUser
      };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    }
  }

  async updateUserProfile(userId, profileData) {
    await this.delay();
    
    try {
      const existingUsers = JSON.parse(localStorage.getItem('nike-users') || '[]');
      const userIndex = existingUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return {
          success: false,
          error: 'User not found'
        };
      }
      
      // Update user
      existingUsers[userIndex] = {
        ...existingUsers[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('nike-users', JSON.stringify(existingUsers));
      
      return {
        success: true,
        data: existingUsers[userIndex]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Profile update failed'
      };
    }
  }

  async trackEvent(eventName, eventData) {
    // Simulate event tracking
    try {
      const events = JSON.parse(localStorage.getItem('nike-events') || '[]');
      const event = {
        id: `event-${Date.now()}`,
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId()
      };
      
      events.push(event);
      
      // Keep only last 1000 events to prevent storage bloat
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }
      
      localStorage.setItem('nike-events', JSON.stringify(events));
      
      return { success: true };
    } catch (error) {
      console.error('Event tracking failed:', error);
      return { success: false };
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('nike-session-id');
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('nike-session-id', sessionId);
    }
    return sessionId;
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
      
      if (product) {
        return {
          success: true,
          data: product
        };
      } else {
        return {
          success: false,
          error: 'Product not found'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch product'
      };
    }
  }

  // Default Products for Demo
  getDefaultProducts() {
    return [
      {
        id: 'nike-air-force-1',
        name: 'Nike Air Force 1 \'07',
        category: 'Lifestyle',
        price: 90,
        originalPrice: 110,
        discount: 18,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png',
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png',
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/00375837-849f-4f17-ba24-d201d27be73b/air-force-1-07-mens-shoes-jBrhbr.png'
        ],
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        colors: ['White', 'Black', 'Triple Black'],
        description: 'The Nike Air Force 1 \'07 brings back the hardwood classic with premium leather in crisp team colors for a fresh look.',
        features: ['Premium leather upper', 'Nike Air cushioning', 'Rubber outsole with pivot points'],
        rating: 4.5,
        reviews: 1247,
        isFeatured: true,
        tags: ['bestseller', 'classic', 'versatile']
      },
      {
        id: 'nike-air-max-270',
        name: 'Nike Air Max 270',
        category: 'Running',
        price: 150,
        originalPrice: 160,
        discount: 6,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0conp/air-max-270-mens-shoes-KkLcGR.png',
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0conp/air-max-270-mens-shoes-KkLcGR.png'
        ],
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        colors: ['Black/White', 'Triple Black', 'White/Black'],
        description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.',
        features: ['270 degrees of Air', 'Breathable mesh upper', 'Rubber Waffle outsole'],
        rating: 4.3,
        reviews: 892,
        isFeatured: true,
        tags: ['air-max', 'lifestyle', 'comfort']
      },
      {
        id: 'nike-dunk-low',
        name: 'Nike Dunk Low',
        category: 'Basketball',
        price: 100,
        originalPrice: 100,
        discount: 0,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/pkfbqhsq8igmjyxe5dop/dunk-low-mens-shoes-DDPY23.png',
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/pkfbqhsq8igmjyxe5dop/dunk-low-mens-shoes-DDPY23.png'
        ],
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        colors: ['White/Black', 'Panda', 'University Blue'],
        description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low retro returns to its origins.',
        features: ['Leather and synthetic upper', 'Foam midsole', 'Rubber outsole with circular tread'],
        rating: 4.6,
        reviews: 2103,
        isFeatured: false,
        tags: ['retro', 'basketball', 'street']
      },
      {
        id: 'nike-react-element-55',
        name: 'Nike React Element 55',
        category: 'Running',
        price: 130,
        originalPrice: 130,
        discount: 0,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/jystkyrwvzr2zbrlqggc/react-element-55-mens-shoes-jNpL93.png',
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/jystkyrwvzr2zbrlqggc/react-element-55-mens-shoes-jNpL93.png'
        ],
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        colors: ['Black/White', 'Grey/White', 'Triple Black'],
        description: 'The Nike React Element 55 is a hybrid that marries the best of Nike heritage with modern innovation.',
        features: ['Nike React foam', 'Textile and synthetic upper', 'Rubber Waffle outsole'],
        rating: 4.2,
        reviews: 456,
        isFeatured: false,
        tags: ['react', 'modern', 'hybrid']
      },
      {
        id: 'nike-blazer-mid-77',
        name: 'Nike Blazer Mid \'77',
        category: 'Lifestyle',
        price: 100,
        originalPrice: 120,
        discount: 17,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/05859dc2-f4b9-4c42-b60e-90c7626dd5d3/blazer-mid-77-vintage-mens-shoes-nw30B2.png',
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/05859dc2-f4b9-4c42-b60e-90c7626dd5d3/blazer-mid-77-vintage-mens-shoes-nw30B2.png'
        ],
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        colors: ['White/Black', 'White/Navy', 'All Black'],
        description: 'Styled for the \'70s. Loved in the \'80s. Classic in the \'90s. Ready for the future.',
        features: ['Leather upper', 'Vintage styling', 'Rubber cupsole'],
        rating: 4.4,
        reviews: 723,
        isFeatured: false,
        tags: ['vintage', 'retro', 'classic']
      },
      {
        id: 'nike-pegasus-39',
        name: 'Nike Air Zoom Pegasus 39',
        category: 'Running',
        price: 130,
        originalPrice: 130,
        discount: 0,
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7db96e4a-9bb4-4467-b5e4-7d4bb28c10bb/air-zoom-pegasus-39-mens-running-shoes-BjlV5K.png',
        images: [
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7db96e4a-9bb4-4467-b5e4-7d4bb28c10bb/air-zoom-pegasus-39-mens-running-shoes-BjlV5K.png'
        ],
        sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
        colors: ['Black/White', 'White/Black', 'University Blue'],
        description: 'Responsive and durable with a comfortable fit, the Pegasus 39 is built for everyday running.',
        features: ['Nike Air Zoom unit', 'Engineered mesh upper', 'Waffle-inspired outsole'],
        rating: 4.7,
        reviews: 1834,
        isFeatured: true,
        tags: ['running', 'zoom', 'performance']
      }
    ];
  }

  // Orders API
  async createOrder(orderData) {
    await this.delay(1000);
    
    try {
      const order = {
        id: 'NK-' + Date.now(),
        ...orderData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      this.orders.push(order);
      localStorage.setItem('nike-orders', JSON.stringify(this.orders));
      
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

  async getOrder(orderId) {
    await this.delay();
    
    try {
      const order = this.orders.find(o => o.id === orderId);
      
      if (order) {
        return {
          success: true,
          data: order
        };
      } else {
        return {
          success: false,
          error: 'Order not found'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch order'
      };
    }
  }

  // Payment API
  async processPayment(paymentData) {
    await this.delay(1000);
    
    try {
      // Simulate payment processing
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      if (isSuccess) {
        return {
          success: true,
          data: {
            transactionId: 'txn-' + Date.now(),
            amount: paymentData.amount,
            method: paymentData.method,
            status: 'completed',
            processedAt: new Date().toISOString()
          }
        };
      } else {
        return {
          success: false,
          error: 'Payment processing failed. Please try again.'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Payment system error'
      };
    }
  }

  // Address API
  async validateAddress(address) {
    await this.delay(300);
    
    try {
      // Simple address validation
      const required = ['street', 'city', 'state', 'zipCode'];
      const missing = required.filter(field => !address[field]);
      
      if (missing.length > 0) {
        return {
          success: false,
          error: `Missing required fields: ${missing.join(', ')}`
        };
      }
      
      return {
        success: true,
        data: {
          ...address,
          validated: true,
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.0060 + (Math.random() - 0.5) * 0.1
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Address validation failed'
      };
    }
  }

  // Shipping API
  async getShippingOptions(orderData) {
    await this.delay();
    
    try {
      const options = [
        {
          id: 'standard',
          name: 'Standard Shipping',
          price: 0,
          estimatedDays: '5-7 business days',
          description: 'Free standard shipping on orders over $75'
        },
        {
          id: 'express',
          name: 'Express Shipping',
          price: 9.99,
          estimatedDays: '2-3 business days',
          description: 'Faster delivery for urgent orders'
        },
        {
          id: 'overnight',
          name: 'Overnight Shipping',
          price: 24.99,
          estimatedDays: '1 business day',
          description: 'Next day delivery available for most locations'
        }
      ];
      
      return {
        success: true,
        data: options
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to get shipping options'
      };
    }
  }
}

// Create singleton instance
const nikeApiService = new NikeApiService();

export default nikeApiService;