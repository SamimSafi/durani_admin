import { useMediaQuery, Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';
import Scrollbar from '../../../components/custom-scroll/Scrollbar';

const Sidebar = (props) => {
  const { isSidebarOpen, isMobileSidebarOpen, onSidebarClose, onSidebarToggle } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const sidebarWidth = '270px';

  // Debugging logs
  console.log('Sidebar Props:', { isSidebarOpen, isMobileSidebarOpen, lgUp });
  console.log('onSidebarToggle exists:', !!onSidebarToggle);

  return (
    <>
      {lgUp ? (
        <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
          {/* Sidebar for desktop */}
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            variant="permanent"
            PaperProps={{
              sx: {
                width: sidebarWidth,
                boxSizing: 'border-box',
                top: '128px',
              },
            }}
          >
            <Scrollbar sx={{ height: 'calc(100% - 83px)' }}>
              <Box sx={{ paddingBottom: '60px' }}> {/* Add bottom padding */}
                <SidebarItems />
              </Box>
            </Scrollbar>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isMobileSidebarOpen}
          onClose={() => {
            console.log('Closing mobile sidebar');
            if (onSidebarClose) onSidebarClose();
          }}
          variant="temporary"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          <Scrollbar sx={{ height: 'calc(100% - 73px)' }}>
            <Box sx={{ paddingBottom: '60px' }}> {/* Add bottom padding */}
              <SidebarItems />
            </Box>
          </Scrollbar>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;