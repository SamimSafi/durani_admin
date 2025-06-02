import { Link } from 'react-router';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import background from 'src/assets/images/backgrounds/images.avif';
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  
  return (
    <PageContainer title="Login" description="this is Login page" sx={{
   
  }}
      >
   <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Image as <img> */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 0,
        }}
      >
        <img
          src={background}
          alt="Background"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover', // Mimics background-size: 100% 100%
            objectPosition: 'center', // Mimics background-position: center
          }}
        />
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)'
                : 'radial-gradient(#2c3e50, #34495e, #2e4053)',
            opacity: (theme) => (theme.palette.mode === 'light' ? 0.3 : 0.2),
            animation: 'gradient 15s ease infinite',
          }}
        />
      </Box>

      {/* Content */}
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh', zIndex: 1 }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: '500px',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              border: (theme) =>
                theme.palette.mode === 'light'
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
              <Logo />
            </Box>
            <AuthLogin
              subtext={
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color={(theme) =>
                    theme.palette.mode === 'light' ? 'textSecondary' : 'textPrimary'
                  }
                  mb={1}
                >
                  Login Here
                </Typography>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
    </PageContainer>
  );
};

export default Login2;
