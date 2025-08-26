// Navigation routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  CHATBOT: '/chatbot',
  PROFILE: '/profile',
  BREATHING: '/breathing'
} as const;

// Theme constants
export const THEME_COLORS = {
  PRIMARY: '#667eea',
  SUCCESS: '#48bb78',
  WARNING: '#ed8936',
  DANGER: '#f56565',
  INFO: '#4299e1'
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const;
