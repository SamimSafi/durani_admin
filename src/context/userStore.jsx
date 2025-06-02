import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  PermissionError: null,

  fetchUsers: async ({ pageSize = 10, pageIndex = 0, search = '' } = {}) => {
    set({ loading: true, error: null });
    try {
      const users = await agent.Users.fetchUsers({ pageSize, pageIndex, search });
      set({ users, loading: false, hasMore: users.length === pageSize });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch users';
      const statusCode = error.response?.status || null;
      set({ error: { message: errorMessage, statusCode }, loading: false });
    }
  },

  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await agent.Users.createUser(userData);
      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
      }));
      toast.success('User created successfully.');
      return newUser;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create user.');
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await agent.Users.updateUser(id, userData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? updatedUser : user
        ),
        loading: false,
      }));
      toast.success('User updated successfully.');
      return updatedUser;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update user.');
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Users.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
      toast.success('User deleted successfully.');
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to delete user.');
      throw error;
    }
  },

  bulkDeleteUsers: async (ids) => {
    set({ loading: true, error: null });
    try {
      await agent.Users.bulkDeleteUsers(ids);
      set((state) => ({
        users: state.users.filter((user) => !ids.includes(user.id)),
        loading: false,
      }));
      toast.success('Users deleted successfully.');
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to delete users.');
      throw error;
    }
  },
}));

export default useUserStore;