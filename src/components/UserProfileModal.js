import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout, startOnboarding } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      const [firstName = '', lastName = ''] = (user.name || '').split(' ');
      setProfileData({
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    const result = await updateProfile({
      ...profileData,
      name: `${profileData.firstName} ${profileData.lastName}`
    });
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'wishlist', name: 'Wishlist', icon: '❤️' }
  ];

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=f97316&color=fff&size=64`}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name || `${profileData.firstName} ${profileData.lastName}`}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      Nike Member since {new Date(user.createdAt || Date.now()).getFullYear()}
                    </span>
                  </div>
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
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={startOnboarding}
                  className="w-full flex items-center px-4 py-3 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="mr-3 text-lg">🎯</span>
                  Retake Onboarding
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                >
                  <span className="mr-3 text-lg">🚪</span>
                  Sign Out
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isEditing
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="(555) 123-4567"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Account Stats */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Account Statistics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-blue-700">Orders Placed</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">$1,247</div>
                        <div className="text-sm text-green-700">Total Spent</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">8</div>
                        <div className="text-sm text-purple-700">Wishlist Items</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Preferences & Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
                      <div className="space-y-2">
                        {[
                          { key: 'email', label: 'Email notifications' },
                          { key: 'sms', label: 'SMS notifications' },
                          { key: 'push', label: 'Push notifications' }
                        ].map((pref) => (
                          <label key={pref.key} className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{pref.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Privacy</h4>
                      <div className="space-y-2">
                        {[
                          { key: 'profile', label: 'Make profile public' },
                          { key: 'activity', label: 'Share activity with friends' },
                          { key: 'recommendations', label: 'Personalized recommendations' }
                        ].map((pref) => (
                          <label key={pref.key} className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked={pref.key !== 'profile'}
                              className="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{pref.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">Order #NK-{1000 + order}</h4>
                            <p className="text-sm text-gray-600">Placed on December {order}, 2023</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Delivered
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <img
                            src={`https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-mens-shoes-jBrhbr.png`}
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">Nike Air Force 1 '07</h5>
                            <p className="text-sm text-gray-600">Size: 10, Color: White</p>
                            <p className="text-sm font-medium text-gray-900">$90.00</p>
                          </div>
                          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">My Wishlist</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={`https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-mens-shoes-jBrhbr.png`}
                          alt="Product"
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium text-gray-900 mb-1">Nike Air Max 270</h4>
                        <p className="text-sm text-gray-600 mb-2">$150.00</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800">
                            Add to Cart
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfileModal;