import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const usewhyChooseUsStore = create((set) => ({
  WhyChooseUs: [],
  loading: false,
  error: null,

  fetchWhyChooseUs: async () => {
    set({ loading: true, error: null });
    try {
      const whyChooseUs = await agent.WhyChooseUs.fetchWhyChooseUs();
      set({ WhyChooseUs:whyChooseUs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch whyChooseUs.');
    }
  },

  // Create a new whyChooseUs record
createWhyChooseUs: async (whyChooseUsData) => {
    set({ loading: true, error: null });
    try {
      const newwhyChooseUs = await agent.WhyChooseUs.createWhyChooseUs(whyChooseUsData);
      set((state) => ({
        WhyChooseUs: [...state.whyChooseUs, newwhyChooseUs],
        loading: false,
      }));
      return newwhyChooseUs;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create whyChooseUs.');
      throw error;
    }
  },

  updateWhyChooseUs: async (id, whyChooseUsData) => {
    set({ loading: true, error: null });
    try {
      const updatedwhyChooseUs = await agent.WhyChooseUs.updateWhyChooseUs(id, whyChooseUsData);
      set((state) => ({
        WhyChooseUs: state.WhyChooseUs.map((whyChooseUs) =>
          whyChooseUs.id === id ? updatedwhyChooseUs : whyChooseUs
        ),
        loading: false,
      }));
      return updatedwhyChooseUs;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteWhyChooseUs: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.WhyChooseUs.deleteWhyChooseUs(id);
      set((state) => ({
        WhyChooseUs: state.WhyChooseUs.filter((whyChooseUs) => whyChooseUs.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getWhyChooseUs: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.WhyChooseUs.getWhyChooseUs(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateWhyChooseUs: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedwhyChooseUs = await agent.WhyChooseUs.activateWhyChooseUs(id);
      set((state) => ({
        WhyChooseUs: state.WhyChooseUs.map((whyChooseUs) =>
          whyChooseUs.id === id ? { ...whyChooseUs, isActive: true } : whyChooseUs
        ),
        loading: false,
      }));
      toast.success('whyChooseUs activated successfully.');
      return updatedwhyChooseUs;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate whyChooseUs.');
      throw error;
    }
  },

  deactivateWhyChooseUs: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedwhyChooseUs = await agent.WhyChooseUs.deactivateWhyChooseUs(id);
      set((state) => ({
        WhyChooseUs: state.WhyChooseUs.map((whyChooseUs) =>
          whyChooseUs.id === id ? { ...whyChooseUs, isActive: false } : whyChooseUs
        ),
        loading: false,
      }));
      toast.success('whyChooseUs deactivated successfully.');
      return updatedwhyChooseUs;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate whyChooseUs.');
      throw error;
    }
  },
}));

export default usewhyChooseUsStore;