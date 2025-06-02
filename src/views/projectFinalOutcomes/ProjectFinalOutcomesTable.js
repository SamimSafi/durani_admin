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
import useProjectFinalOutcomesStore from '../../context/projectFinalOutcomesStore';

const ProjectFinalOutcomesTable = ({
  ProjectFinalOutcomes,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const { activateProjectFinalOutcomes, deactivateProjectFinalOutcomes } = useProjectFinalOutcomesStore();

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
            <TableCell>Title Pashto</TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Project ID</TableCell>
            <TableCell>Video Link</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ProjectFinalOutcomes.map((outcome) => (
            <TableRow
              key={outcome.id}
              selected={selected.includes(outcome.id)}
            >
              <TableCell>{outcome.title}</TableCell>
              <TableCell>{outcome.title_pashto}</TableCell>
              <TableCell>{outcome.title_dari}</TableCell>
              <TableCell>{outcome.description}</TableCell>
              <TableCell>{outcome.description_pashto}</TableCell>
              <TableCell>{outcome.description_dari}</TableCell>
              <TableCell>{outcome.projectId}</TableCell>
              <TableCell>
                {outcome.video_link ? (
                  <a
                    href={outcome.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'underline' }}
                  >
                    {outcome.video_link}
                  </a>
                ) : (
                  'No Video'
                )}
              </TableCell>
              <TableCell>
                {outcome.isActive ? (
                  <span
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Active
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Inactive
                  </span>
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/projectFinalOutcomes/edit/${outcome.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(outcome.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
                {outcome.isActive ? (
                  <IconButton
                    onClick={() => deactivateProjectFinalOutcomes(outcome.id)}
                    color="warning"
                  >
                    <Cancel />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => activateProjectFinalOutcomes(outcome.id)}
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

export default ProjectFinalOutcomesTable;