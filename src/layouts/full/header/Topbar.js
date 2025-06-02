import { Box, AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';
import Profile from './Profile';
import { Logo } from 'react-mui-sidebar';
import { NavLink } from 'react-router';
import logoicn from '../../../assets/images/logos/logo-adminmart.svg';
import ThemeToggle from '../../../components/ThemeToggle';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = ({ onSidebarToggle }) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.primary[200],
    zIndex: 1000,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '60px',
    },
    height: '120px',
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled sx={{ flexWrap: 'wrap' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            py: { xs: '8px', lg: '0px' },
          }}
        >
          {/* Left: Profile (mobile), Logo and ThemeToggle (desktop) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Profile for Mobile */}
            <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
              <Profile />
            </Box>
            {/* Logo for Desktop and Mobile */}
            <Box
              sx={{
                position: { xs: 'absolute', lg: 'static' },
                left: { xs: '50%', lg: 'auto' },
                transform: { xs: 'translateX(-50%)', lg: 'none' },
              }}
            >
              <Logo img={logoicn} component={NavLink} to="/" />
            </Box>
            {/* ThemeToggle for Desktop */}
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: { xs: 'none', lg: 'flex' },
                alignItems: 'center',
                ml: 2, // Space between Logo and ThemeToggle
              }}
            >
              <ThemeToggle />
            </Stack>
          </Box>

          {/* Right: Menu Icon (mobile), Profile (desktop) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Menu Icon for Mobile */}
            <IconButton
              color="inherit"
              aria-label="open sidebar"
              onClick={onSidebarToggle}
              sx={{ display: { xs: 'block', lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* Profile for Desktop */}
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Profile />
            </Box>
          </Box>
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Topbar;