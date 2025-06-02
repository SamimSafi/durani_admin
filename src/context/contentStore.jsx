import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useContentStore = create((set) => ({
  Content: [],
  loading: false,
  error: null,

  fetchContent: async () => {
    set({ loading: true, error: null });
    try {
      const Content = await agent.Content.fetchContent();
      set({ Content, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Content.');
    }
  },

  // Create a new content record
createContent: async (data) => {
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
      const response = await agent.Content.createContent(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createContent error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create content record';
      toast.error(errorMessage);
      throw error;
    }
  },

updateContent: async (id, data) => {
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
    const response = await agent.Content.updateContent(id, formData);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update content record';
    toast.error(errorMessage);
    throw error;
  }
},

  deleteContent: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Content.deleteContent(id);
      set((state) => ({
        Content: state.Content.filter((Content) => Content.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

getContent: async (id) => {
    try {
      const result = await agent.Content.getContent(id);
      const newData = {
        ...result,
        icon: result.icon ? result.icon : null,
        image1: result.image1 ? result.image1 : null,
        image2: result.image2 ? result.image2 : null,
      };
      console.log('Fetched content:', newData);
      return newData;
    } catch (error) {
      console.error('getContent error:', error);
      toast.error('Failed to fetch content data.');
      throw error;
    }
  },

  activateContent: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedContent = await agent.Content.activateContent(id);
      set((state) => ({
        Content: state.Content.map((Content) =>
          Content.id === id ? { ...Content, isActive: true } : Content
        ),
        loading: false,
      }));
      toast.success('Content activated successfully.');
      return updatedContent;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Content.');
      throw error;
    }
  },

  deactivateContent: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedContent = await agent.Content.deactivateContent(id);
      set((state) => ({
        Content: state.Content.map((Content) =>
          Content.id === id ? { ...Content, isActive: false } : Content
        ),
        loading: false,
      }));
      toast.success('Content deactivated successfully.');
      return updatedContent;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Content.');
      throw error;
    }
  },
}));

export default useContentStore;