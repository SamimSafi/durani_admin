import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useSloganStore = create((set) => ({
  Slogan: [],
  loading: false,
  error: null,

  fetchSlogan: async () => {
    set({ loading: true, error: null });
    try {
      const Slogan = await agent.Slogan.fetchSlogan();
      set({ Slogan, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Slogan.');
    }
  },

  // Create a new Slogan record
createSlogan: async (SloganData) => {
    set({ loading: true, error: null });
    try {
      const newSlogan = await agent.Slogan.createSlogan(SloganData);
      set((state) => ({
        Slogan: [...state.Slogan, newSlogan],
        loading: false,
      }));
      return newSlogan;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create Slogan.');
      throw error;
    }
  },

  updateSlogan: async (id, SloganData) => {
    set({ loading: true, error: null });
    try {
      const updatedSlogan = await agent.Slogan.updateSlogan(id, SloganData);
      set((state) => ({
        Slogan: state.Slogan.map((Slogan) =>
          Slogan.id === id ? updatedSlogan : Slogan
        ),
        loading: false,
      }));
      return updatedSlogan;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateSloganImage: async (id, logoFile) => {
    set({ loading: true, error: null });
    try {
      const updatedSlogan = await agent.Slogan.updateSloganImage(id, logoFile);
      set((state) => ({
        Slogan: state.Slogan.map((Slogan) =>
          Slogan.id === id ? { ...Slogan, imagePath: updatedSlogan.imagePath } : Slogan
        ),
        loading: false,
      }));
      return updatedSlogan;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update Slogan Image.');
      throw error;
    }
  },

  deleteSlogan: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Slogan.deleteSlogan(id);
      set((state) => ({
        Slogan: state.Slogan.filter((Slogan) => Slogan.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getSlogan: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Slogan.getSlogan(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

}));

export default useSloganStore;