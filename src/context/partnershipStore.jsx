import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const usePartnershipStore = create((set) => ({
  Partnership: [],
  loading: false,
  error: null,

  fetchPartnership: async () => {
    set({ loading: true, error: null });
    try {
      const Partnership = await agent.Partnership.fetchPartnership();
      set({ Partnership, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Partnership.');
    }
  },

  // Create a new leadership record
createPartnership: async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value); // Append File object
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      const response = await agent.Partnership.createPartnership(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createPartnership error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create leadership record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing leadership record
  updatePartnership: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.Partnership.updatePartnership(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update leadership record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deletePartnership: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Partnership.deletePartnership(id);
      set((state) => ({
        Partnership: state.Partnership.filter((Partnership) => Partnership.id !== id),
        loading: false,
      }));
      toast.success('Partnership Deleted successfully.');

    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getPartnership: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Partnership.getPartnership(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activatePartnership: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedPartnership = await agent.Partnership.activatePartnership(id);
      set((state) => ({
        Partnership: state.Partnership.map((Partnership) =>
          Partnership.id === id ? { ...Partnership, isActive: true } : Partnership
        ),
        loading: false,
      }));
      toast.success('Partnership activated successfully.');
      return updatedPartnership;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Partnership.');
      throw error;
    }
  },

  deactivatePartnership: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedPartnership = await agent.Partnership.deactivatePartnership(id);
      set((state) => ({
        Partnership: state.Partnership.map((Partnership) =>
          Partnership.id === id ? { ...Partnership, isActive: false } : Partnership
        ),
        loading: false,
      }));
      toast.success('Partnership deactivated successfully.');
      return updatedPartnership;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Partnership.');
      throw error;
    }
  },
}));

export default usePartnershipStore;