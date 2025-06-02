import  { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Updated for React Router v6
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import useAuthStore from '../../../context/authStore';

const AuthLogin = ({ title, subtitle, subtext }) => {
  // State for form inputs
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(true);

  // Zustand store
  const { signIn, error, isAuthenticated, logout } = useAuthStore();

  // Navigation
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(credentials);
      // On success, redirect to dashboard
      navigate('/dashboard'); // Adjust the route as needed
    } catch (err) {
      // Error is handled by Zustand store and available in `error`
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // If already authenticated, redirect or show logout option
  if (isAuthenticated) {
    return (
      <Box textAlign="center">
        <Typography variant="h4" mb={2}>
          Already logged in!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            logout();
            navigate('/auth/login');
          }}
        >
          Logout
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 2 }}
          component={Link}
          to="/dashboard"
        >
          Go to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* Display error if present */}
      {error && (
        <Typography color="error" variant="body1" mb={2}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              disabled={loading}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              disabled={loading}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            {/* <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password" // Adjust route as needed
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password?
            </Typography> */}
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;