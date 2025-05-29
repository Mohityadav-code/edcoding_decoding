// API Configuration
const config = {
  // Production API URL (Render.com)
  production: {
    apiUrl: 'https://edcoding-decoding-api.onrender.com'
  },
  // Local development API URL
  development: {
    apiUrl: 'http://localhost:3000'
  }
};

// Determine current environment
// Use production URL if in production or if running from a deployed site
// Otherwise, use local development URL
const isProduction = 
  window.location.hostname !== 'localhost' && 
  window.location.hostname !== '127.0.0.1';

// Export appropriate config based on environment
const apiUrl = isProduction ? config.production.apiUrl : config.development.apiUrl;

export { apiUrl }; 