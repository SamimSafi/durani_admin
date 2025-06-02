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
} from '@mui/material';
import { Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useProjectSlidersStore from '../../context/projectSlidersStore';
import ImageDisplay from '../../components/ImageDisplay';

const ProjectSlidersFormTable = ({
  ProjectSliders,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateProjectSliders, deactivateProjectSliders } = useProjectSlidersStore();
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
            <TableCell>Image</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ProjectSliders.map((ProjectSliders) => (
            <TableRow
              key={ProjectSliders.id}
              selected={selected.includes(ProjectSliders.id)}
            >
              <TableCell>{ProjectSliders.title}</TableCell>
              <TableCell>{ProjectSliders.title_pashto}</TableCell>
              <TableCell>{ProjectSliders.title_dari}</TableCell>
              <TableCell>{ProjectSliders.briefSummary}</TableCell>
              <TableCell>{ProjectSliders.briefSummary_pashto}</TableCell>
              <TableCell>{ProjectSliders.briefSummary_dari}</TableCell>
              <TableCell> 
                        <ImageDisplay
                          path={ProjectSliders.image}
                          alt={ProjectSliders.title}
                          fallbackText="No Image"
                         />
                    </TableCell>
              <TableCell>
                        {ProjectSliders.isActive ? (
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
                  onClick={() => navigate(`/projectSliders/edit/${ProjectSliders.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(ProjectSliders.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {ProjectSliders.isActive ? (
              <IconButton
                onClick={() => deactivateProjectSliders(ProjectSliders.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateProjectSliders(ProjectSliders.id)}
                color="success"
              >
                <CheckCircle />
              </IconButton>
            )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectSlidersFormTable;