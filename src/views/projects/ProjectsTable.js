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
  TableSortLabel, Menu, MenuItem, ListItemIcon
} from '@mui/material';
import { MoreVert, Edit, Delete, Cancel, CheckCircle, List, Slideshow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useProjectsStore from '../../context/projectsStore';
import ImageDisplay from '../../components/ImageDisplay';

const ProjectsFormTable = ({
  Projects,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateProjects, deactivateProjects } = useProjectsStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
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
                Title 
              </TableSortLabel>
            </TableCell>
            <TableCell>Title Pashto </TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>brief Summary</TableCell>
            <TableCell>brief Summary Pashto</TableCell>
            <TableCell>brief Summary Dari</TableCell>
            <TableCell>Full Description</TableCell>
            <TableCell>Full Description Pashto</TableCell>
            <TableCell>Full Description Dari</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Client Pashto</TableCell>
            <TableCell>Client Dari</TableCell>
            <TableCell>Complete Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>satisfied Clients</TableCell>
            <TableCell>order Served</TableCell>
            <TableCell>star Received</TableCell>
            <TableCell>happy Customers</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Projects.map((Projects) => (
            <TableRow
              key={Projects.id}
              selected={selected.includes(Projects.id)}
            >
              <TableCell>{Projects.title}</TableCell>
              <TableCell>{Projects.title_pashto}</TableCell>
              <TableCell>{Projects.title_dari}</TableCell>
              <TableCell>{Projects.briefSummary}</TableCell>
              <TableCell>{Projects.briefSummary_pashto}</TableCell>
              <TableCell>{Projects.briefSummary_dari}</TableCell>
              <TableCell>{Projects.FullDescription}</TableCell>
              <TableCell>{Projects.FullDescription_pashto}</TableCell>
              <TableCell>{Projects.FullDescription_dari}</TableCell>
              <TableCell>{Projects.Client}</TableCell>
              <TableCell>{Projects.Client_pashto}</TableCell>
              <TableCell>{Projects.Client_dari}</TableCell>
              <TableCell>{Projects.CompleteDate}</TableCell>
              <TableCell>{Projects.Location}</TableCell>
              <TableCell>{Projects.satisfiedClients}</TableCell>
              <TableCell>{Projects.orderServed}</TableCell>
              <TableCell>{Projects.starReceived}</TableCell>
              <TableCell>{Projects.happyCustomers}</TableCell>
              <TableCell> 
                         <ImageDisplay
                                                  path={Projects.image}
                                                  alt={Projects.title}
                                                  fallbackText="No Image"
                                                />
                    </TableCell>
              <TableCell>
                        {Projects.isActive ? (
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
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleNavigate(`/projects/edit/${Projects.id}`)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit Project
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(`/projectGoals/${Projects.id}`)}>
          <ListItemIcon>
            <List fontSize="small" />
          </ListItemIcon>
          View Project Goals
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(`/projectSliders/${Projects.id}`)}>
          <ListItemIcon>
            <Slideshow fontSize="small" />
          </ListItemIcon>
          View Project Sliders
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(`/projectFinalOutcomes/${Projects.id}`)}>
          <ListItemIcon>
            <Slideshow fontSize="small" />
          </ListItemIcon>
          View Project Final Outcome
        </MenuItem>
        {Projects.isActive ? (
          <MenuItem onClick={() => { deactivateProjects(Projects.id); handleClose(); }}>
            <ListItemIcon>
              <Cancel fontSize="small" />
            </ListItemIcon>
            Deactivate Project
          </MenuItem>
        ) : (
          <MenuItem onClick={() => { activateProjects(Projects.id); handleClose(); }}>
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            Activate Project
          </MenuItem>
        )}
        <MenuItem onClick={() => { handleDelete(Projects.id); handleClose(); }}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete Project
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

export default ProjectsFormTable;