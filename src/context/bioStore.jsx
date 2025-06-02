import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useBioStore = create((set) => ({
  Bio: [],
  loading: false,
  error: null,

  fetchBio: async () => {
    set({ loading: true, error: null });
    try {
      const Bio = await agent.Bio.fetchBio();
      set({ Bio, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Bio.');
    }
  },

  // Create a new Bio record
createBio: async (BioData) => {
    set({ loading: true, error: null });
    try {
      const newBio = await agent.Bio.createBio(BioData);
      set((state) => ({
        Bio: [...state.Bio, newBio],
        loading: false,
      }));
      return newBio;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create Bio.');
      throw error;
    }
  },

  updateBio: async (id, BioData) => {
    set({ loading: true, error: null });
    try {
      const updatedBio = await agent.Bio.updateBio(id, BioData);
      set((state) => ({
        Bio: state.Bio.map((Bio) =>
          Bio.id === id ? updatedBio : Bio
        ),
        loading: false,
      }));
      return updatedBio;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteBio: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Bio.deleteBio(id);
      set((state) => ({
        Bio: state.Bio.filter((Bio) => Bio.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getBio: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Bio.getBio(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateBio: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedBio = await agent.Bio.activateBio(id);
      set((state) => ({
        Bio: state.Bio.map((Bio) =>
          Bio.id === id ? { ...Bio, isActive: true } : Bio
        ),
        loading: false,
      }));
      toast.success('Bio activated successfully.');
      return updatedBio;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Bio.');
      throw error;
    }
  },

  deactivateBio: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedBio = await agent.Bio.deactivateBio(id);
      set((state) => ({
        Bio: state.Bio.map((Bio) =>
          Bio.id === id ? { ...Bio, isActive: false } : Bio
        ),
        loading: false,
      }));
      toast.success('Bio deactivated successfully.');
      return updatedBio;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Bio.');
      throw error;
    }
  },
}));

export default useBioStore;