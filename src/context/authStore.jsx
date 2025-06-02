import { create } from 'zustand';
import agent from '../api/agent'; // Import the API agent
import { jwtDecode } from "jwt-decode";
// Utility to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded); // Debug
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Utility to get token expiration time
const getTokenExpiration = (token) => {
  if (!token) return 0;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error decoding token:', error);
    return 0;
  }
};

let refreshPromise = null; // Track ongoing refresh promise

const useAuthStore = create((set,get) => ({
  // State
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
 isAuthenticated: !!localStorage.getItem('accessToken') && !isTokenExpired(localStorage.getItem('accessToken')),
  error: null,

  // Actions
  signIn: async (credentials) => {
    try {
      const response = await agent.Auth.signIn(credentials);
      const { accessToken,refreshToken } = response;

      // Store token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Update state
      set({
        accessToken,
        refreshToken,
        isAuthenticated: true,
        error: null,
      });

      // Optionally fetch user data after login
      // const user = await agent.Users.getUser(userId); // Adjust based on your API
      // set({ user });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed' });
      throw error;
    }
  },

  
  refreshAccessToken: async () => {
    const { isRefreshing, refreshToken } = get();
    if (isRefreshing && refreshPromise) {
      console.log('Refresh already in progress, waiting...');
      return await refreshPromise; // Wait for ongoing refresh
    }
    if (!refreshToken || isTokenExpired(refreshToken)) {
      console.log('No valid refresh token available');
      throw new Error('No valid refresh token available');
    }
    refreshPromise = (async () => {
      set({ isRefreshing: true });
      try {
        console.log('Sending refresh token:', refreshToken);
        const response = await agent.Auth.refreshToken(refreshToken);
        console.log('Refresh response:', response);
        const { accessToken, refreshToken: newRefreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        set({
          accessToken,
          refreshToken: newRefreshToken,
          isAuthenticated: true,
          error: null,
          isRefreshing: false,
        });
        return accessToken;
      } catch (error) {
        console.error('Refresh token error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        set({
          error: error.response?.data?.message || 'Failed to refresh token',
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          isRefreshing: false,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error;
      } finally {
        refreshPromise = null; // Clear promise after completion
      }
    })();
    return await refreshPromise;
  },
  
  logout: () => {
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Reset state
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },

 initialize: () => {
  const { accessToken, refreshToken } = get();
  if (accessToken && isTokenExpired(accessToken) && refreshToken) {
    get().refreshAccessToken();
  }
  const checkTokenExpiration = setInterval(() => {
    const { accessToken, isRefreshing } = get();
    if (accessToken && !isRefreshing) {
      const expirationTime = getTokenExpiration(accessToken);
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      const bufferTime = 5 * 60 * 1000; // 5 minutes
      if (expirationTime > 0 && timeUntilExpiration < bufferTime) {
        console.log('Token nearing expiration, refreshing...'); // Debug
        get().refreshAccessToken();
      }
    }
  }, 60 * 1000); // Check every 60 seconds (less aggressive)
  return () => clearInterval(checkTokenExpiration);
},
}));

// Call initialize on store creation
useAuthStore.getState().initialize();
console.log('Auth store initialized');
export default useAuthStore;