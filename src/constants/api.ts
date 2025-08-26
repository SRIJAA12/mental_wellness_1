// Firebase collections
export const COLLECTIONS = {
  USERS: 'users',
  MOODS: 'moods',
  CHAT_HISTORY: 'chatHistory',
  WELLNESS_GOALS: 'wellnessGoals'
} as const;

// API endpoints (if you add external APIs later)
export const API_ENDPOINTS = {
  WEATHER: '/api/weather',
  QUOTES: '/api/quotes'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Please sign in to continue.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'No account found with this email.',
  EMAIL_IN_USE: 'This email is already registered.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  MOOD_SAVED: 'Mood entry saved successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!'
} as const;
