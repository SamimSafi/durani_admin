import React, { useContext } from 'react';
import { useTheme, Switch, FormControlLabel, Box } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { Icon } from '@iconify/react';

const ThemeToggle = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, px: 2 }}>
      <Box
        sx={{
          color: mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        }}
      >
        <Icon
          icon={mode === 'light' ? 'solar:sun-linear' : 'solar:moon-linear'}
          width="20"
          height="20"
        />
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'dark'}
            onChange={toggleTheme}
            color="primary"
          />
        }
        label={mode === 'light' ? 'Light Mode' : 'Dark Mode'}
        sx={{
          '& .MuiFormControlLabel-label': {
            color: mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
          },
        }}
      />
    </Box>
  );
};

export default ThemeToggle;