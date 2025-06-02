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
import useSuccessSnapshotsStore from '../../context/successSnapshotsStore';

const SuccessSnapshotsTable = ({
  SuccessSnapshots,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateSuccessSnapshots, deactivateSuccessSnapshots } = useSuccessSnapshotsStore();
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
            <TableCell>complete Project count</TableCell>
            <TableCell>Happy Client Count</TableCell>
            <TableCell>Qualified Enginner Count</TableCell>
            <TableCell>Years Experience</TableCell>
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
          {SuccessSnapshots.map((SuccessSnapshots) => (
            <TableRow
              key={SuccessSnapshots.id}
              selected={selected.includes(SuccessSnapshots.id)}
            >
              <TableCell>{SuccessSnapshots.title}</TableCell>
              <TableCell>{SuccessSnapshots.title_pashto}</TableCell>
              <TableCell>{SuccessSnapshots.title_dari}</TableCell>
              <TableCell>{SuccessSnapshots.completeProjectcount}</TableCell>
              <TableCell>{SuccessSnapshots.HappyClientCount}</TableCell>
              <TableCell>{SuccessSnapshots.QualifiedEnginnerCount}</TableCell>
              <TableCell>{SuccessSnapshots.YearsExperience}</TableCell>
              <TableCell>{SuccessSnapshots.description}</TableCell>
              <TableCell>{SuccessSnapshots.description_pashto}</TableCell>
              <TableCell>{SuccessSnapshots.description_dari}</TableCell>
<TableCell>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: SuccessSnapshots.color,
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell>{SuccessSnapshots.color}</TableCell>
              <TableCell>
                        {SuccessSnapshots.isActive ? (
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
                  onClick={() => navigate(`/successSnapshots/edit/${SuccessSnapshots.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(SuccessSnapshots.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {SuccessSnapshots.isActive ? (
              <IconButton
                onClick={() => deactivateSuccessSnapshots(SuccessSnapshots.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateSuccessSnapshots(SuccessSnapshots.id)}
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

export default SuccessSnapshotsTable;