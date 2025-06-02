import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageContainer from 'src/components/container/PageContainer';
import {
  IconLayoutDashboard,
  IconUsers,
  IconHistory,
  IconAward,
  IconRocket,
  IconHeartHandshake,
  IconBriefcase,
  IconSlideshow,
  IconTrophy,
  IconCategory,
  IconUser,
  IconBuilding,
  IconUsersGroup,
  IconFileCv,
  IconHandClick,
} from '@tabler/icons-react';
import { IconAddressBook } from '@tabler/icons-react';

// Dashboard routes (unchanged)
const dashboardRoutes = [
  { label: 'Dashboard', path: '/dashboard', icon: <IconLayoutDashboard /> },
  { label: 'Users', path: '/users', icon: <IconUsers /> },
  { label: 'History', path: '/history', icon: <IconHistory /> },
  { label: 'Leadership', path: '/leadership', icon: <IconAward /> },
  { label: 'Mission', path: '/mission', icon: <IconRocket /> },
  { label: 'Partnership', path: '/partnership', icon: <IconHeartHandshake /> },
  { label: 'Services', path: '/services', icon: <IconBriefcase /> },
  { label: 'Sliders', path: '/sliders', icon: <IconSlideshow /> },
  { label: 'Success Snapshots', path: '/successSnapshots', icon: <IconTrophy /> },
  { label: 'Projects', path: '/projects', icon: <IconRocket /> },
  { label: 'Project Categories', path: '/projectCategories', icon: <IconCategory /> },
  { label: 'Job Postings', path: '/jobposting', icon: <IconFileCv /> },
  { label: 'Bio', path: '/bio', icon: <IconUser /> },
  { label: 'Company Info', path: '/companyInfo', icon: <IconBuilding /> },
  { label: 'Team', path: '/team', icon: <IconUsersGroup /> },
  { label: 'Contact', path: '/contact', icon: <IconAddressBook /> },
  { label: 'Why Choose us', path: '/whyChooseUs', icon: <IconHandClick /> },
];

// Styled Card with orange and dark green low-opacity colors
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 3,
  background: `linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(46, 125, 50, 0.1) 100%)`,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[12],
    background: `linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(46, 125, 50, 0.2) 100%)`,
    '& .card-content': {
      color: theme.palette.text.primary,
    },
    '& .icon-bg': {
      opacity: 0.15,
    },
  },
  '&:active': {
    transform: 'translateY(-2px)',
  },
  minHeight: 120,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

// Styled Icon Background
const IconBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: -20,
  top: -20,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  color: 'rgba(255, 152, 0, 0.3)',
  zIndex: 0,
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter routes based on search term
  const filteredRoutes = dashboardRoutes.filter((route) =>
    route.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle card click
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Search Bar */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                background: '#fff',
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[2],
              }}
            />
          </Grid>

          {/* Route Cards */}
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Quick Access
            </Typography>
            <Grid container spacing={3}>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={route.path}>
                    <StyledCard
                      onClick={() => handleCardClick(route.path)}
                      aria-label={`Navigate to ${route.label}`}
                    >
                      <CardContent
                        className="card-content"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center', // Center horizontally
                          alignItems: 'center', // Center vertically
                          position: 'relative',
                          zIndex: 1,
                          p: 2,
                          transition: 'color 0.3s ease',
                          width: '100%',
                          gap: 1, // Space between icon and text
                        }}
                      >
                        {React.cloneElement(route.icon, {
                          sx: {
                            fontSize: 32,
                            color: 'rgba(255, 152, 0, 0.7)',
                          },
                        })}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            color: 'text.primary',
                            textAlign: 'center', // Ensure text is centered
                          }}
                        >
                          {route.label}
                        </Typography>
                        {/* Subtle background icon */}
                        <IconBackground className="icon-bg">
                          {React.cloneElement(route.icon, {
                            sx: { fontSize: 100 },
                          })}
                        </IconBackground>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary">
                    No pages found matching your search.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;