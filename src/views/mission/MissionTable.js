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
import useMissionStore from '../../context/missionStore';

const MissionTable = ({
  Mission,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateMission, deactivateMission } = useMissionStore();
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
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Mission.map((Mission) => (
            <TableRow
              key={Mission.id}
              selected={selected.includes(Mission.id)}
            >
              <TableCell>{Mission.title}</TableCell>
              <TableCell>{Mission.title_pashto}</TableCell>
              <TableCell>{Mission.title_dari}</TableCell>
              <TableCell>{Mission.description}</TableCell>
              <TableCell>{Mission.description_pashto}</TableCell>
              <TableCell>{Mission.description_dari}</TableCell>
<TableCell>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: Mission.color,
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell>{Mission.color}</TableCell>
              <TableCell>
                        {Mission.isActive ? (
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
                  onClick={() => navigate(`/mission/edit/${Mission.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Mission.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {Mission.isActive ? (
              <IconButton
                onClick={() => deactivateMission(Mission.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateMission(Mission.id)}
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

export default MissionTable;