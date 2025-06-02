import { useLocation, Link } from 'react-router-dom';
import { useTheme, Box, Typography } from '@mui/material';
import {
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from 'react-mui-sidebar';
import { IconPoint } from '@tabler/icons-react';
import { Icon } from '@iconify/react';
import Menuitems from './MenuItems';
import ThemeToggle from '../../../components/ThemeToggle';

const renderMenuItems = (items, pathDirect, theme) => {
  return items.map((item) => {
    const IconComponent = item.icon ? item.icon : IconPoint;
    const itemIcon = typeof item.icon === 'string' ? (
      <Icon
        icon={`solar:${item.icon}`}
        width="20"
        height="20"
        sx={{
          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        }}
      />
    ) : (
      <Box
        sx={{
          color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
        }}
      >
        <IconComponent stroke={1.5} size="1.3rem" />
      </Box>
    );

    if (item.subheader) {
      return (
        <Box sx={{ margin: '0 -24px', textTransform: 'uppercase' }} key={item.subheader}>
          <Menu subHeading={item.subheader} key={item.subheader} />
        </Box>
      );
    }

    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius="7px"
          sx={{
            '& .sidebar-submenu-icon': {
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
            },
          }}
        >
          {renderMenuItems(item.children, pathDirect, theme)}
        </Submenu>
      );
    }

    const menuItemProps = {
      isSelected: pathDirect === item.href,
      borderRadius: '7px',
      icon: item.icon ? (
        typeof item.icon === 'string' ? (
          <Icon
            icon={`solar:${item.icon}`}
            width="20"
            height="20"
            sx={{
              color: pathDirect === item.href
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#ffffff'
                : theme.palette.text.primary,
            }}
          />
        ) : (
          <Box
            sx={{
              color: pathDirect === item.href
                ? '#fff'
                : theme.palette.mode === 'dark'
                ? '#ffffff'
                : theme.palette.text.primary,
            }}
          >
            <IconComponent stroke={1.5} size="1.3rem" />
          </Box>
        )
      ) : (
        <Icon
          icon="mdi:circle"
          width="6"
          height="6"
          sx={{
            color: pathDirect === item.href
              ? '#fff'
              : theme.palette.mode === 'dark'
              ? '#ffffff'
              : theme.palette.text.primary,
          }}
        />
      ),
      badge: item.chip ? true : false,
      badgeContent: item.chip || '',
      badgeColor: 'secondary',
      badgeTextColor: '#1b84ff',
      disabled: item.disabled,
      sx: {
        '& .sidebar-menu-item-icon': {
          color: pathDirect === item.href
            ? '#fff'
            : theme.palette.mode === 'dark'
            ? '#ffffff'
            : theme.palette.text.primary,
        },
      },
    };

    const titleColor = pathDirect === item.href
      ? '#fff'
      : theme.palette.mode === 'dark'
      ? '#ffffff'
      : theme.palette.text.primary;

    if (item.href && item.href.startsWith('https')) {
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem {...menuItemProps}>
            <Typography component="span" sx={{ color: titleColor }}>
              {item.title}
            </Typography>
          </MenuItem>
        </a>
      );
    } else if (item.href) {
      return (
        <Link
          key={item.id}
          to={item.href}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem {...menuItemProps}>
            <Typography component="span" sx={{ color: titleColor }}>
              {item.title}
            </Typography>
          </MenuItem>
        </Link>
      );
    } else {
      return (
        <MenuItem key={item.id} {...menuItemProps}>
          <Typography component="span" sx={{ color: titleColor }}>
            {item.title}
          </Typography>
        </MenuItem>
      );
    }
  });
};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;
  const theme = useTheme();

  return (
    <Box sx={{ px: '24px', overflowX: 'hidden' }}>
      <MUI_Sidebar
        width="100%"
        showProfile={false}
        themeColor={theme.palette.primary.main}
        themeSecondaryColor={theme.palette.secondary.main}
        sx={{
          '& .sidebar-menu-item': {
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
          },
          '& .sidebar-menu-item.selected': {
            color: '#fff',
          },
          '& .sidebar-menu-item-icon': {
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
          },
          '& .sidebar-menu-item.selected .sidebar-menu-item-icon': {
            color: '#fff',
          },
        }}
      >
        {renderMenuItems(Menuitems, pathDirect, theme)}
        
      </MUI_Sidebar>
    </Box>
  );
};

export default SidebarItems;