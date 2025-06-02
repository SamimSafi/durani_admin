import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useLeadershipStore = create((set) => ({
  Leadership: [],
  loading: false,
  error: null,

  fetchLeadership: async () => {
    set({ loading: true, error: null });
    try {
      const Leadership = await agent.Leadership.fetchLeadership();
      set({ Leadership, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Leadership.');
    }
  },

  // Create a new leadership record
createLeadership: async (data) => {
    console.log('createLeadership called with data:', data);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value); // Append File object
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      console.log('FormData prepared:', formData);
      const response = await agent.Leadership.createLeadership(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createLeadership error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create leadership record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing leadership record
  updateLeadership: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.Leadership.updateLeadership(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update leadership record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteLeadership: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Leadership.deleteLeadership(id);
      set((state) => ({
        Leadership: state.Leadership.filter((Leadership) => Leadership.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getLeadership: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Leadership.getLeadership(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateLeadership: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedLeadership = await agent.Leadership.activateLeadership(id);
      set((state) => ({
        Leadership: state.Leadership.map((Leadership) =>
          Leadership.id === id ? { ...Leadership, isActive: true } : Leadership
        ),
        loading: false,
      }));
      toast.success('Leadership activated successfully.');
      return updatedLeadership;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Leadership.');
      throw error;
    }
  },

  deactivateLeadership: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedLeadership = await agent.Leadership.deactivateLeadership(id);
      set((state) => ({
        Leadership: state.Leadership.map((Leadership) =>
          Leadership.id === id ? { ...Leadership, isActive: false } : Leadership
        ),
        loading: false,
      }));
      toast.success('Leadership deactivated successfully.');
      return updatedLeadership;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Leadership.');
      throw error;
    }
  },
}));

export default useLeadershipStore;