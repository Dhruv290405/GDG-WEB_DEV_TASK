import React, { createContext, useContext, useReducer, useEffect } from 'react';
import nikeApiService from '../services/apiService';

// Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  SET_ONBOARDING_STEP: 'SET_ONBOARDING_STEP',
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING'
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        needsOnboarding: action.payload.isNewUser || false
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        needsOnboarding: false,
        onboardingStep: 0
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case AUTH_ACTIONS.SET_ONBOARDING_STEP:
      return {
        ...state,
        onboardingStep: action.payload
      };

    case AUTH_ACTIONS.COMPLETE_ONBOARDING:
      return {
        ...state,
        needsOnboarding: false,
        onboardingStep: 0,
        user: { ...state.user, onboardingCompleted: true }
      };

    default:
      return state;
  }
};

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  needsOnboarding: false,
  onboardingStep: 0
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nike-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
        
        // Track user login
        nikeApiService.trackEvent('user_session_restored', {
          userId: user.id,
          method: 'localStorage'
        });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('nike-user');
      }
    }
  }, []);

  // Auth Functions
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const response = await nikeApiService.loginUser(credentials);
      
      if (response.success) {
        const user = response.data;
        localStorage.setItem('nike-user', JSON.stringify(user));
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
        
        // Track login event
        await nikeApiService.trackEvent('user_login', {
          userId: user.id,
          method: credentials.method || 'email',
          timestamp: new Date().toISOString()
        });
        
        showNotification('Welcome back to Nike!', 'success');
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: response.error });
        return { success: false, error: response.error };
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    
    try {
      const response = await nikeApiService.registerUser({
        ...userData,
        isNewUser: true,
        onboardingCompleted: false
      });
      
      if (response.success) {
        const user = response.data;
        localStorage.setItem('nike-user', JSON.stringify(user));
        dispatch({ 
          type: AUTH_ACTIONS.REGISTER_SUCCESS, 
          payload: { ...user, isNewUser: true }
        });
        
        // Track registration event
        await nikeApiService.trackEvent('user_register', {
          userId: user.id,
          method: 'email',
          timestamp: new Date().toISOString()
        });
        
        showNotification('Welcome to Nike! Let\'s get you started.', 'success');
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: response.error });
        return { success: false, error: response.error };
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const socialLogin = async (provider) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Simulate social login
      const mockSocialUser = {
        id: `${provider}-${Date.now()}`,
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        provider: provider,
        avatar: `https://ui-avatars.com/api/?name=${provider}&background=f97316&color=fff`,
        createdAt: new Date().toISOString()
      };
      
      const response = await nikeApiService.loginUser({
        ...mockSocialUser,
        method: provider
      });
      
      if (response.success) {
        const user = response.data;
        localStorage.setItem('nike-user', JSON.stringify(user));
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
        
        await nikeApiService.trackEvent('user_social_login', {
          userId: user.id,
          provider: provider,
          timestamp: new Date().toISOString()
        });
        
        showNotification(`Welcome! Signed in with ${provider}.`, 'success');
        return { success: true };
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Track logout event
      if (state.user) {
        await nikeApiService.trackEvent('user_logout', {
          userId: state.user.id,
          timestamp: new Date().toISOString()
        });
      }
      
      localStorage.removeItem('nike-user');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      showNotification('Logged out successfully', 'info');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...state.user, ...profileData };
      localStorage.setItem('nike-user', JSON.stringify(updatedUser));
      dispatch({ type: AUTH_ACTIONS.UPDATE_PROFILE, payload: profileData });
      
      await nikeApiService.trackEvent('user_profile_update', {
        userId: state.user.id,
        updatedFields: Object.keys(profileData),
        timestamp: new Date().toISOString()
      });
      
      showNotification('Profile updated successfully', 'success');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const startOnboarding = () => {
    dispatch({ type: AUTH_ACTIONS.SET_ONBOARDING_STEP, payload: 1 });
  };

  const nextOnboardingStep = () => {
    dispatch({ type: AUTH_ACTIONS.SET_ONBOARDING_STEP, payload: state.onboardingStep + 1 });
  };

  const completeOnboarding = async (onboardingData) => {
    try {
      await updateProfile({
        ...onboardingData,
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString()
      });
      
      dispatch({ type: AUTH_ACTIONS.COMPLETE_ONBOARDING });
      
      await nikeApiService.trackEvent('user_onboarding_complete', {
        userId: state.user.id,
        onboardingData,
        timestamp: new Date().toISOString()
      });
      
      showNotification('Welcome to Nike! Your account is all set up.', 'success');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Notification helper
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full max-w-sm`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 
                   type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';
    
    notification.className += ` ${bgColor} text-white`;
    
    const icon = type === 'success' ? '✓' : 
                type === 'error' ? '✗' : 
                type === 'warning' ? '⚠' : 'ℹ';
    
    notification.innerHTML = `
      <div class="flex items-center">
        <span class="text-lg mr-2">${icon}</span>
        <span class="font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  };

  const value = {
    ...state,
    login,
    register,
    socialLogin,
    logout,
    updateProfile,
    startOnboarding,
    nextOnboardingStep,
    completeOnboarding,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;