/* eslint-disable react/prop-types */
import { useState } from 'react';
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as LogoIcon,
  Photo as CoverPhotoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from '../../components/ImageDisplay';

const CompanyInfoTable = ({
  CompanyInfo,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  // Handle menu open
  const handleMenuOpen = (event, companyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompanyId(companyId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCompanyId(null);
  };

  // Handle menu actions
  const handleMenuAction = (action, companyId) => {
    switch (action) {
      case 'edit':
        navigate(`/companyInfo/edit/${companyId}`);
        break;
      case 'delete':
        handleDelete(companyId);
        break;
      case 'updateLogo':
        navigate(`/companyInfo/${companyId}/logo`);
        break;
      case 'updateCoverPhoto':
        navigate(`/companyInfo/${companyId}/cover-photo`);
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
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Name Pashto</TableCell>
            <TableCell>Name Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Cover Photo</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CompanyInfo.map((company) => (
            <TableRow
              key={company.id}
              selected={selected.includes(company.id)}
            >
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.name_pashto}</TableCell>
              <TableCell>{company.name_dari}</TableCell>
              <TableCell>{company.description}</TableCell>
              <TableCell>{company.description_pashto}</TableCell>
              <TableCell>{company.description_dari}</TableCell>
              <TableCell>
                <ImageDisplay
                              path={company.logo}
                              alt={company.name}
                              fallbackText="No Logo"
                            />
              </TableCell>
              <TableCell>
                  <ImageDisplay
                              path={company.coverPhoto}
                              alt={company.name}
                              fallbackText="No Cover Photo"
                            />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={(event) => handleMenuOpen(event, company.id)}
                  color="primary"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedCompanyId === company.id}
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
                  <MenuItem onClick={() => handleMenuAction('edit', company.id)}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('delete', company.id)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('updateLogo', company.id)}>
                    <ListItemIcon>
                      <LogoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Update Logo</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuAction('updateCoverPhoto', company.id)}>
                    <ListItemIcon>
                      <CoverPhotoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Update Cover Photo</ListItemText>
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

export default CompanyInfoTable;