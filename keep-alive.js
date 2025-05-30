const fetch = require('node-fetch');

// URLs to ping
const FRONTEND_URL = 'https://edcoding-decoding.onrender.com/';
const BACKEND_URL = 'https://edcoding-decoding-api.onrender.com/api/encode';

// Test data for backend API call
const testData = {
  text: 'keep alive'
};

// Function to ping the frontend
async function pingFrontend() {
  try {
    const response = await fetch(FRONTEND_URL);
    console.log(`[${new Date().toISOString()}] Frontend pinged, status: ${response.status}`);
    return response.status;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error pinging frontend:`, error.message);
    return null;
  }
}

// Function to ping the backend
async function pingBackend() {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    console.log(`[${new Date().toISOString()}] Backend pinged, status: ${response.status}`);
    return response.status;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error pinging backend:`, error.message);
    return null;
  }
}

// Function to ping both services
async function pingBoth() {
  await pingFrontend();
  await pingBackend();
  console.log('-'.repeat(50));
}

// Initial ping when the script starts
console.log('Starting keep-alive service for Symbol Cipher app...');
pingBoth();

// Set interval to ping every 10 minutes (600000 ms)
const TEN_MINUTES = 10 * 60 * 1000;
setInterval(pingBoth, TEN_MINUTES);

console.log(`Services will be pinged every 10 minutes to prevent sleep.`);
console.log(`Press Ctrl+C to stop the script.`); 