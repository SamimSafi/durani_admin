import  { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext, ThemeProviderWrapper } from './context/ThemeContext';
import router from './routes/Router.js';
import './App.css';
import { setupInterceptors } from './api/axios'; // Adjust path
import useAuthStore from './context/authStore.jsx';

const App = () => {

  useEffect(() => {
    console.log('App - Setting upd interceptors and initializing store');
    setupInterceptors(useAuthStore); // Set up Axios interceptors
    useAuthStore.getState().initialize(); // Run store initialization
  }, []);

  return (
    <ThemeProviderWrapper>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.8)'
                        : 'rgba(0, 0, 0, 0.8)',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <RouterProvider router={router} />
            </Suspense>
            <ToastContainer theme={theme.palette.mode} />
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProviderWrapper>
  );
};

export default App;