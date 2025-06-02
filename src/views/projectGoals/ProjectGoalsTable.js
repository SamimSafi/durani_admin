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
import useProjectGoalsStore from '../../context/projectGoalsStore';
import ImageDisplay from '../../components/ImageDisplay';

const ProjectGoalsFormTable = ({
  ProjectGoals,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateProjectGoals, deactivateProjectGoals } = useProjectGoalsStore();
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
          {ProjectGoals.map((ProjectGoals) => (
            <TableRow
              key={ProjectGoals.id}
              selected={selected.includes(ProjectGoals.id)}
            >
              <TableCell>{ProjectGoals.title}</TableCell>
              <TableCell>{ProjectGoals.title_pashto}</TableCell>
              <TableCell>{ProjectGoals.title_dari}</TableCell>
              <TableCell>{ProjectGoals.briefSummary}</TableCell>
              <TableCell>{ProjectGoals.briefSummary_pashto}</TableCell>
              <TableCell>{ProjectGoals.briefSummary_dari}</TableCell>
              <TableCell> 
                    <ImageDisplay
                              path={ProjectGoals.image}
                              alt={ProjectGoals.title}
                              fallbackText="No Image"
                            />
                    </TableCell>
              <TableCell>
                        {ProjectGoals.isActive ? (
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
                  onClick={() => navigate(`/projectGoals/edit/${ProjectGoals.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(ProjectGoals.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {ProjectGoals.isActive ? (
              <IconButton
                onClick={() => deactivateProjectGoals(ProjectGoals.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateProjectGoals(ProjectGoals.id)}
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

export default ProjectGoalsFormTable;