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
import useBioStore from '../../context/bioStore';

const BioTable = ({
  Bio,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const { activateBio, deactivateBio } = useBioStore();
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
                Key
              </TableSortLabel>
            </TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Bio.map((Bio) => (
            <TableRow
              key={Bio.id}
              selected={selected.includes(Bio.id)}
            >
              <TableCell>{Bio.key}</TableCell>
              <TableCell>{Bio.value}</TableCell>
              <TableCell>{Bio.language}</TableCell>
              <TableCell>
                        {Bio.isActive ? (
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
                  onClick={() => navigate(`/bio/edit/${Bio.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Bio.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {Bio.isActive ? (
                              <IconButton
                                onClick={() => deactivateBio(Bio.id)}
                                color="warning"
                              >
                                <Cancel />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => activateBio(Bio.id)}
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

export default BioTable;