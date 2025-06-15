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
import { DescriptionComponent } from '../utilities/dateUtils';

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
  const [menuProject, setMenuProject] = useState(null);

  const open = Boolean(anchorEl);

const handleClick = (event, project) => {
  setAnchorEl(event.currentTarget);
  setMenuProject(project);
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
          {Projects.map((Projects,index) => (
            <TableRow
              key={index}
              selected={selected.includes(index)}
            >
              <TableCell>{Projects.title}</TableCell>
              <TableCell>{Projects.title_pashto}</TableCell>
              <TableCell>{Projects.title_dari}</TableCell>
              <TableCell> <DescriptionComponent description={Projects.briefSummary} maxLength={100} /></TableCell>
              <TableCell><DescriptionComponent description={Projects.briefSummary_pashto} maxLength={100} /></TableCell>
              <TableCell><DescriptionComponent description={Projects.briefSummary_dari} maxLength={100} /></TableCell>
              <TableCell><DescriptionComponent description={Projects.FullDescription} maxLength={100} /></TableCell>
              <TableCell><DescriptionComponent description={Projects.FullDescription_pashto} maxLength={100} /></TableCell>
              <TableCell><DescriptionComponent description={Projects.FullDescription_dari} maxLength={100} /></TableCell>
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
      <IconButton onClick={(event) => handleClick(event, Projects)}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleNavigate(`/projects/edit/${menuProject?.id}`)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit Project
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(`/projectGoals/${menuProject?.id}`)}>
          <ListItemIcon>
            <List fontSize="small" />
          </ListItemIcon>
          View Project Goals
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(`/projectSliders/${menuProject?.id}`)}>
          <ListItemIcon>
            <Slideshow fontSize="small" />
          </ListItemIcon>
          View Project Sliders
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(`/projectFinalOutcomes/${menuProject?.id}`)}>
          <ListItemIcon>
            <Slideshow fontSize="small" />
          </ListItemIcon>
          View Project Final Outcome
        </MenuItem>
        {Projects.isActive ? (
          <MenuItem onClick={() => { deactivateProjects(menuProject?.id); handleClose(); }}>
            <ListItemIcon>
              <Cancel fontSize="small" />
            </ListItemIcon>
            Deactivate Project
          </MenuItem>
        ) : (
          <MenuItem onClick={() => { activateProjects(menuProject?.id); handleClose(); }}>
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            Activate Project
          </MenuItem>
        )}
        <MenuItem onClick={() => { handleDelete(menuProject?.id); handleClose(); }}>
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