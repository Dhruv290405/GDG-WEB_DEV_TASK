import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const OnboardingModal = ({ isOpen, onClose }) => {
  const { user, completeOnboarding } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    preferences: {
      sportsInterests: [],
      shoeSize: '',
      gender: '',
      fitnessLevel: '',
      favoriteActivities: [],
      notifications: {
        newProducts: true,
        sales: true,
        personalizedOffers: true
      }
    },
    goals: {
      primary: '',
      secondary: []
    },
    style: {
      preferredColors: [],
      stylePreference: ''
    }
  });

  const steps = [
    {
      title: "Welcome to Nike!",
      subtitle: "Let's personalize your experience",
      component: WelcomeStep
    },
    {
      title: "What sports do you love?",
      subtitle: "Help us recommend the perfect gear",
      component: SportsStep
    },
    {
      title: "Tell us about yourself",
      subtitle: "We'll customize your Nike experience",
      component: PersonalStep
    },
    {
      title: "Your style preferences",
      subtitle: "Find products that match your taste",
      component: StyleStep
    },
    {
      title: "Set your goals",
      subtitle: "We'll help you achieve them",
      component: GoalsStep
    },
    {
      title: "Notification preferences",
      subtitle: "Stay updated on what matters to you",
      component: NotificationsStep
    }
  ];

  const sportsOptions = [
    { id: 'running', name: 'Running', icon: '🏃' },
    { id: 'basketball', name: 'Basketball', icon: '⛹️' },
    { id: 'soccer', name: 'Soccer', icon: '⚽' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'training', name: 'Training', icon: '💪' },
    { id: 'yoga', name: 'Yoga', icon: '🧘' },
    { id: 'skateboarding', name: 'Skateboarding', icon: '🛹' },
    { id: 'golf', name: 'Golf', icon: '⛳' }
  ];

  const activitiesOptions = [
    { id: 'gym', name: 'Gym Workouts', icon: '🏋️' },
    { id: 'outdoor', name: 'Outdoor Activities', icon: '🌲' },
    { id: 'cardio', name: 'Cardio', icon: '❤️' },
    { id: 'strength', name: 'Strength Training', icon: '💪' },
    { id: 'dance', name: 'Dance', icon: '💃' },
    { id: 'swimming', name: 'Swimming', icon: '🏊' }
  ];

  const colorOptions = [
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'white', name: 'White', color: '#FFFFFF' },
    { id: 'red', name: 'Red', color: '#DC2626' },
    { id: 'blue', name: 'Blue', color: '#2563EB' },
    { id: 'orange', name: 'Orange', color: '#EA580C' },
    { id: 'green', name: 'Green', color: '#16A34A' },
    { id: 'purple', name: 'Purple', color: '#9333EA' },
    { id: 'pink', name: 'Pink', color: '#EC4899' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    const result = await completeOnboarding(onboardingData);
    if (result.success) {
      onClose();
    }
  };

  const updateOnboardingData = (path, value) => {
    setOnboardingData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const toggleArrayItem = (path, item) => {
    const currentArray = path.split('.').reduce((obj, key) => obj[key], onboardingData) || [];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateOnboardingData(path, newArray);
  };

  // Step Components
  function WelcomeStep() {
    return (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center">
          <span className="text-4xl">👋</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Hey {user?.firstName || user?.name?.split(' ')[0] || 'there'}!
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Nike! We're excited to help you find the perfect gear and reach your goals. 
            Let's take a few minutes to personalize your experience.
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <p className="text-sm text-orange-800">
            <span className="font-medium">Pro tip:</span> The more you tell us, the better we can recommend products you'll love!
          </p>
        </div>
      </div>
    );
  }

  function SportsStep() {
    return (
      <div className="space-y-6">
        <p className="text-gray-600 text-center">Select all the sports you're interested in</p>
        <div className="grid grid-cols-2 gap-3">
          {sportsOptions.map((sport) => {
            const isSelected = onboardingData.preferences.sportsInterests.includes(sport.id);
            return (
              <button
                key={sport.id}
                onClick={() => toggleArrayItem('preferences.sportsInterests', sport.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{sport.icon}</div>
                <div className="font-medium text-sm">{sport.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function PersonalStep() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shoe Size (US)
            </label>
            <select
              value={onboardingData.preferences.shoeSize}
              onChange={(e) => updateOnboardingData('preferences.shoeSize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select size</option>
              {Array.from({ length: 20 }, (_, i) => i + 5).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={onboardingData.preferences.gender}
              onChange={(e) => updateOnboardingData('preferences.gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select gender</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fitness Level
          </label>
          <div className="space-y-2">
            {[
              { value: 'beginner', label: 'Beginner - Just getting started' },
              { value: 'intermediate', label: 'Intermediate - Regular activity' },
              { value: 'advanced', label: 'Advanced - Very active' },
              { value: 'athlete', label: 'Athlete - Professional/competitive level' }
            ].map((level) => (
              <label key={level.value} className="flex items-center">
                <input
                  type="radio"
                  name="fitnessLevel"
                  value={level.value}
                  checked={onboardingData.preferences.fitnessLevel === level.value}
                  onChange={(e) => updateOnboardingData('preferences.fitnessLevel', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favorite Activities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {activitiesOptions.map((activity) => {
              const isSelected = onboardingData.preferences.favoriteActivities.includes(activity.id);
              return (
                <button
                  key={activity.id}
                  onClick={() => toggleArrayItem('preferences.favoriteActivities', activity.id)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{activity.icon}</span>
                  {activity.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function StyleStep() {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Colors
          </label>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map((color) => {
              const isSelected = onboardingData.style.preferredColors.includes(color.id);
              return (
                <button
                  key={color.id}
                  onClick={() => toggleArrayItem('style.preferredColors', color.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isSelected ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-2 border"
                    style={{ 
                      backgroundColor: color.color,
                      borderColor: color.id === 'white' ? '#e5e7eb' : 'transparent'
                    }}
                  />
                  <div className="text-xs font-medium">{color.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Style Preference
          </label>
          <div className="space-y-2">
            {[
              { value: 'classic', label: 'Classic - Timeless, clean designs' },
              { value: 'bold', label: 'Bold - Eye-catching, statement pieces' },
              { value: 'minimalist', label: 'Minimalist - Simple, understated style' },
              { value: 'trendy', label: 'Trendy - Latest fashion and trends' },
              { value: 'performance', label: 'Performance - Function over fashion' }
            ].map((style) => (
              <label key={style.value} className="flex items-center">
                <input
                  type="radio"
                  name="stylePreference"
                  value={style.value}
                  checked={onboardingData.style.stylePreference === style.value}
                  onChange={(e) => updateOnboardingData('style.stylePreference', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm">{style.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function GoalsStep() {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Goal
          </label>
          <div className="space-y-2">
            {[
              { value: 'fitness', label: 'Get Fit & Healthy' },
              { value: 'performance', label: 'Improve Athletic Performance' },
              { value: 'style', label: 'Look Good & Feel Confident' },
              { value: 'comfort', label: 'Stay Comfortable All Day' },
              { value: 'explore', label: 'Explore New Activities' }
            ].map((goal) => (
              <label key={goal.value} className="flex items-center">
                <input
                  type="radio"
                  name="primaryGoal"
                  value={goal.value}
                  checked={onboardingData.goals.primary === goal.value}
                  onChange={(e) => updateOnboardingData('goals.primary', e.target.value)}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm">{goal.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Goals (Optional)
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { value: 'weight-loss', label: 'Weight Management' },
              { value: 'muscle-gain', label: 'Build Muscle' },
              { value: 'endurance', label: 'Improve Endurance' },
              { value: 'flexibility', label: 'Increase Flexibility' },
              { value: 'stress-relief', label: 'Stress Relief' },
              { value: 'social', label: 'Meet Like-minded People' }
            ].map((goal) => {
              const isSelected = onboardingData.goals.secondary.includes(goal.value);
              return (
                <button
                  key={goal.value}
                  onClick={() => toggleArrayItem('goals.secondary', goal.value)}
                  className={`p-3 rounded-lg border text-left text-sm transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {goal.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function NotificationsStep() {
    return (
      <div className="space-y-6">
        <p className="text-gray-600 text-center">
          Choose what updates you'd like to receive from Nike
        </p>
        
        <div className="space-y-4">
          {[
            {
              key: 'newProducts',
              title: 'New Products',
              description: 'Be the first to know about new releases'
            },
            {
              key: 'sales',
              title: 'Sales & Promotions',
              description: 'Get notified about exclusive deals and discounts'
            },
            {
              key: 'personalizedOffers',
              title: 'Personalized Offers',
              description: 'Receive offers tailored to your interests'
            }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.preferences.notifications[notification.key]}
                  onChange={(e) => updateOnboardingData(`preferences.notifications.${notification.key}`, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> You can always change these preferences later in your account settings.
          </p>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
                <p className="text-gray-600 mt-1">{steps[currentStep].subtitle}</p>
              </div>
              {currentStep === 0 && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between">
              {currentStep > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  ← Previous
                </button>
              ) : (
                <div />
              )}
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  Complete Setup ✨
                </button>
              )}
            </div>
            
            {currentStep === 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Skip for now
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OnboardingModal;