import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  TablePagination,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import UserTable from './UserTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useDebounce from '../../hooks/useDebounce';
import userService from '../../services/userService';
import useUserStore from '../../context/userStore';


const UserList = () => {
  const { users, loading, hasMore, deleteUser, bulkDeleteUsers, fetchUsers } = useUserStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchUsers({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
  }, [fetchUsers, page, rowsPerPage, debouncedSearch]);

  useEffect(() => {
    let result = users;
    result = userService.sortUsers(result, sortOrder);
    setFilteredUsers(result);
  }, [users, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filteredUsers.map((user) => user.id));
    } else {
      setSelected([]);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };


  const confirmDelete = async () => {
    try {
      if (deleteId) {
        await deleteUser(deleteId);
      } else if (selected.length > 0) {
        await bulkDeleteUsers(selected);
        setSelected([]);
      }
      fetchUsers({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
      toast.success('User(s) deleted successfully.');
    } catch (error) {
      // Extract and display the server error message
      const errorMessage = error.response?.data?.message || 'Failed to delete users.';
      toast.error(errorMessage);
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ maxWidth: 400 }}
            placeholder="Enter search term"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/users/create')}
          >
            Create New User
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <UserTable
            users={filteredUsers}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            nextIconButtonProps={{ disabled: !hasMore }}
          />
        </>
      )}
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message={deleteId ? 'Are you sure you want to delete this user?' : 'Are you sure you want to delete the selected users?'}
      />
    </Box>
  );
};

export default UserList;