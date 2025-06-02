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
import { Delete, Edit, ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../context/userStore';
import { styled } from '@mui/material/styles';

const ErrorTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  '& .MuiTableCell-root': {
    color: theme.palette.error.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.error.main}`,
    borderBottom: `1px solid ${theme.palette.error.main}`,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

const UserTable = ({
  users,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const { error } = useUserStore();

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
                Username
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {error && error.statusCode === 403 ? (
            <ErrorTableRow>
              <TableCell colSpan={2} align="center">
                <ErrorOutline sx={{ verticalAlign: 'middle', mr: 1 }} />
                Unauthorized access: You do not have permission to view this data.
              </TableCell>
            </ErrorTableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                selected={selected.includes(user.id)}
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                    disabled={error && error.statusCode === 403}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;