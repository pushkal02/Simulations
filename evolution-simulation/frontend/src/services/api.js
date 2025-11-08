import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Can add auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running');
    } else if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Service
class SimulationAPI {
  /**
   * Initialize the simulation
   */
  async init() {
    const response = await apiClient.post('/init');
    return response.data;
  }

  /**
   * Start the simulation
   */
  async start() {
    const response = await apiClient.post('/start');
    return response.data;
  }

  /**
   * Pause the simulation
   */
  async pause() {
    const response = await apiClient.post('/pause');
    return response.data;
  }

  /**
   * Reset the simulation
   */
  async reset() {
    const response = await apiClient.post('/reset');
    return response.data;
  }

  /**
   * Set simulation speed
   * @param {number} speed - Cycles per second (1-100)
   */
  async setSpeed(speed) {
    const response = await apiClient.post('/speed', { speed });
    return response.data;
  }

  /**
   * Get current statistics
   */
  async getStats() {
    const response = await apiClient.get('/stats');
    return response.data;
  }

  /**
   * Get simulation status
   */
  async getStatus() {
    const response = await apiClient.get('/status');
    return response.data;
  }
}

export default new SimulationAPI();
