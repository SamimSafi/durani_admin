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
import useLeadershipStore from '../../context/leadershipStore';
import ImageDisplay from '../../components/ImageDisplay';

const LeadershipFormTable = ({
  Leadership,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateLeadership, deactivateLeadership } = useLeadershipStore();
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
                Full Name 
              </TableSortLabel>
            </TableCell>
            <TableCell>Full Name Pashto </TableCell>
            <TableCell>Full Name Dari</TableCell>
            <TableCell>job</TableCell>
            <TableCell>job Pashto</TableCell>
            <TableCell>job Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Leadership.map((Leadership) => (
            <TableRow
              key={Leadership.id}
              selected={selected.includes(Leadership.id)}
            >
              <TableCell>{Leadership.fullName}</TableCell>
              <TableCell>{Leadership.fullName_pashto}</TableCell>
              <TableCell>{Leadership.fullName_dari}</TableCell>
              <TableCell>{Leadership.job}</TableCell>
              <TableCell>{Leadership.job_pashto}</TableCell>
              <TableCell>{Leadership.job_dari}</TableCell>
              <TableCell>{Leadership.description}</TableCell>
              <TableCell>{Leadership.description_pashto}</TableCell>
              <TableCell>{Leadership.description_dari}</TableCell>
              <TableCell> 
                       <ImageDisplay
                              path={Leadership.photoPath}
                              alt={Leadership.fullName}
                              fallbackText="No Image"
                            />
                    </TableCell>
              <TableCell>
                        {Leadership.isActive ? (
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
                  onClick={() => navigate(`/leadership/edit/${Leadership.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Leadership.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {Leadership.isActive ? (
              <IconButton
                onClick={() => deactivateLeadership(Leadership.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateLeadership(Leadership.id)}
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

export default LeadershipFormTable;