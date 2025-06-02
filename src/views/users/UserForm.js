/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { toast } from 'react-toastify';
import useUserStore from '../../context/userStore';

const UserForm = () => {
  const { id } = useParams(); // Get user ID from URL for editing
  const navigate = useNavigate();
  const { createUser, updateUser, fetchUsers, users } = useUserStore();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Fetch user data for editing
      const user = users.find((u) => u.id === id);
      if (user) {
        setFormData({
          username: user.username,
          password: '', // Don't prefill password for security
        });
      } else {
        fetchUsers(); // Fetch users if not already loaded
      }
    }
  }, [id, isEdit, users, fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateUser(id, {
          ...formData,
          password: formData.password || undefined, // Don't send empty password
        });
      } else {
        await createUser(formData);
      }
      navigate('/users');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} user.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit User' : 'Create User'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required={!isEdit} // Password optional for updates
            disabled={loading}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/users')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default UserForm;