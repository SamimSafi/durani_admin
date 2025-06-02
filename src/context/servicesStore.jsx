import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useServicesStore = create((set) => ({
  Services: [],
  loading: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const Services = await agent.Services.fetchServices();
      set({ Services, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Services.');
    }
  },

  // Create a new services record
createServices: async (data) => {
    try {
      const formData = new FormData();
       Object.entries(data).forEach(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) {
        // Append each file under the 'files' key
        value.forEach((file) => {
          if (file) {
            formData.append('files', file); // Use 'files' for all files
            console.log(`Appending file: ${file.name}, size: ${file.size}`);
          }
        });
      } else if (value !== undefined && value !== null) {
        // Append non-file fields
        formData.append(key, value);
      }
    });
      console.log('FormData prepared:', formData);
      const response = await agent.Services.createServices(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createServices error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create services record';
      toast.error(errorMessage);
      throw error;
    }
  },

updateServices: async (id, data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) {
        // Define specific keys for each file based on their position
        value.forEach((file) => {
          if (file) {
            formData.append('files', file);
          }
        });
      } else if (value !== undefined && value !== null) {
        // Append non-file fields
        formData.append(key, value);
      }
    });
    const response = await agent.Services.updateServices(id, formData);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update services record';
    toast.error(errorMessage);
    throw error;
  }
},

  deleteServices: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Services.deleteServices(id);
      set((state) => ({
        Services: state.Services.filter((Services) => Services.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

getServices: async (id) => {
    try {
      const result = await agent.Services.getServices(id);
      const newData = {
        ...result,
        icon: result.icon ? result.icon : null,
        image1: result.image1 ? result.image1 : null,
        image2: result.image2 ? result.image2 : null,
      };
      console.log('Fetched services:', newData);
      return newData;
    } catch (error) {
      console.error('getServices error:', error);
      toast.error('Failed to fetch services data.');
      throw error;
    }
  },

  activateServices: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedServices = await agent.Services.activateServices(id);
      set((state) => ({
        Services: state.Services.map((Services) =>
          Services.id === id ? { ...Services, isActive: true } : Services
        ),
        loading: false,
      }));
      toast.success('Services activated successfully.');
      return updatedServices;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Services.');
      throw error;
    }
  },

  deactivateServices: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedServices = await agent.Services.deactivateServices(id);
      set((state) => ({
        Services: state.Services.map((Services) =>
          Services.id === id ? { ...Services, isActive: false } : Services
        ),
        loading: false,
      }));
      toast.success('Services deactivated successfully.');
      return updatedServices;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Services.');
      throw error;
    }
  },
}));

export default useServicesStore;