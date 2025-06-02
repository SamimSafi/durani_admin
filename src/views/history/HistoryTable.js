/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableSortLabel,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as LogoIcon,
  Cancel,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useHistorytore from '../../context/historyStore';
import { useState } from 'react';
import ImageDisplay from '../../components/ImageDisplay';

const HistoryFormTable = ({
  History,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedHistoryId, setSelectedHistoryId] = useState(null);
 const { activateHistory, deactivateHistory } = useHistorytore();

   // Handle menu open
  const handleMenuOpen = (event, historyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedHistoryId(historyId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedHistoryId(null);
  };

  // Handle menu actions
  const handleMenuAction = (action, historyId) => {
    switch (action) {
      case 'edit':
        navigate(`/history/edit/${historyId}`);
        break;
      case 'delete':
        handleDelete(historyId);
        break;
      case 'updateImage':
        navigate(`/history/${historyId}/image`);
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active
                direction={sortOrder}
                onClick={handleSort}
              >
                title
              </TableSortLabel>
            </TableCell>
            <TableCell>Title Pashto</TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>Sub Title</TableCell>
            <TableCell>Sub Title Pashto</TableCell>
            <TableCell>Sub Title Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {History.map((History) => (
            <TableRow
              key={History.id}
              selected={selected.includes(History.id)}
            >
              <TableCell>{History.title}</TableCell>
              <TableCell>{History.title_pashto}</TableCell>
              <TableCell>{History.title_dari}</TableCell>
              <TableCell>{History.subTitle}</TableCell>
              <TableCell>{History.subTitle_pashto}</TableCell>
              <TableCell>{History.subTitle_dari}</TableCell>
              <TableCell>{History.description}</TableCell>
              <TableCell>{History.description_pashto}</TableCell>
              <TableCell>{History.description_dari}</TableCell>
              <TableCell>{History.description_dari}   <ImageDisplay
                                            path={History.imagePath}
                                            alt={History.title}
                                            fallbackText="No Image"
                                          /></TableCell>
              <TableCell>
                        {History.isActive ? (
                          <span style={{ backgroundColor: 'green', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ backgroundColor: 'red', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                            Deactive
                          </span>
                        )}
              </TableCell>

               <TableCell>
                            <IconButton
                              onClick={(event) => handleMenuOpen(event, History.id)}
                              color="primary"
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedHistoryId === History.id}
                              onClose={handleMenuClose}
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                            >
                              <MenuItem onClick={() => handleMenuAction('edit', History.id)}>
                                <ListItemIcon>
                                  <EditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                              </MenuItem>
                              <MenuItem onClick={() => handleMenuAction('delete', History.id)}>
                                <ListItemIcon>
                                  <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                              </MenuItem>
                               {History.isActive ? (
                                        <MenuItem onClick={() => { deactivateHistory(History.id); handleMenuClose(); }}>
                                          <ListItemIcon>
                                            <Cancel fontSize="small" />
                                          </ListItemIcon>
                                          Deactivate Team
                                        </MenuItem>
                                      ) : (
                                        <MenuItem onClick={() => { activateHistory(History.id); handleMenuClose(); }}>
                                          <ListItemIcon>
                                            <CheckCircle fontSize="small" />
                                          </ListItemIcon>
                                          Activate Team
                                        </MenuItem>
                                      )}
                              <MenuItem onClick={() => handleMenuAction('updateImage', History.id)}>
                                <ListItemIcon>
                                  <LogoIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Update Image</ListItemText>
                              </MenuItem>
                            </Menu>
                          </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryFormTable;