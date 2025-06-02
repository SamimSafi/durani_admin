import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useSlidersStore = create((set) => ({
  Sliders: [],
  loading: false,
  error: null,

  fetchSliders: async () => {
    set({ loading: true, error: null });
    try {
      const Sliders = await agent.Sliders.fetchSliders();
      set({ Sliders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Sliders.');
    }
  },

  // Create a new sliders record
createSliders: async (data) => {
    console.log('createSliders called with data:', data);
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
      const response = await agent.Sliders.createSliders(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createSliders error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create sliders record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing sliders record
  updateSliders: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.Sliders.updateSliders(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update sliders record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteSliders: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Sliders.deleteSliders(id);
      set((state) => ({
        Sliders: state.Sliders.filter((Sliders) => Sliders.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getSliders: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Sliders.getSliders(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateSliders: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedSliders = await agent.Sliders.activateSliders(id);
      set((state) => ({
        Sliders: state.Sliders.map((Sliders) =>
          Sliders.id === id ? { ...Sliders, isActive: true } : Sliders
        ),
        loading: false,
      }));
      toast.success('Sliders activated successfully.');
      return updatedSliders;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Sliders.');
      throw error;
    }
  },

  deactivateSliders: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedSliders = await agent.Sliders.deactivateSliders(id);
      set((state) => ({
        Sliders: state.Sliders.map((Sliders) =>
          Sliders.id === id ? { ...Sliders, isActive: false } : Sliders
        ),
        loading: false,
      }));
      toast.success('Sliders deactivated successfully.');
      return updatedSliders;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Sliders.');
      throw error;
    }
  },
}));

export default useSlidersStore;