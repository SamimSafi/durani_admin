import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProjectsStore = create((set) => ({
  Projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const Projects = await agent.Projects.fetchProjects();
      set({ Projects, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Projects.');
    }
  },

  // Create a new projects record
createProjects: async (data) => {
    console.log('createProjects called with data:', data);
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
      const response = await agent.Projects.createProjects(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createProjects error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create projects record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing projects record
  updateProjects: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.Projects.updateProjects(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update projects record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteProjects: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Projects.deleteProjects(id);
      set((state) => ({
        Projects: state.Projects.filter((Projects) => Projects.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProjects: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Projects.getProjects(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProjects: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjects = await agent.Projects.activateProjects(id);
      set((state) => ({
        Projects: state.Projects.map((Projects) =>
          Projects.id === id ? { ...Projects, isActive: true } : Projects
        ),
        loading: false,
      }));
      toast.success('Projects activated successfully.');
      return updatedProjects;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Projects.');
      throw error;
    }
  },

  deactivateProjects: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjects = await agent.Projects.deactivateProjects(id);
      set((state) => ({
        Projects: state.Projects.map((Projects) =>
          Projects.id === id ? { ...Projects, isActive: false } : Projects
        ),
        loading: false,
      }));
      toast.success('Projects deactivated successfully.');
      return updatedProjects;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Projects.');
      throw error;
    }
  },
}));

export default useProjectsStore;