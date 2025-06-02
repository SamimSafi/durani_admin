import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Move interceptor setup to a separate function to avoid circular dependencies
export const setupInterceptors = () => {
  // Request interceptor to set Authorization header with access token
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        console.log('Set Authorization header with accessToken:', accessToken); // Debug
      } else {
        console.warn('No access token found in localStorage'); // Debug
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor (unchanged from your latest request)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Axios error:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      return Promise.reject(error);
    }
  );
};


export default axiosInstance;