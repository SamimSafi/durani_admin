import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProjectSlidersStore = create((set) => ({
  ProjectSliders: [],
  loading: false,
  error: null,

  fetchProjectSliders: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const ProjectSliders = await agent.ProjectSliders.fetchProjectSliders(projectId);
      set({ ProjectSliders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch ProjectSliders.');
    }
  },

  // Create a new projectSliders record
createProjectSliders: async (data) => {
    console.log('createProjectSliders called with data:', data);
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
      const response = await agent.ProjectSliders.createProjectSliders(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createProjectSliders error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create projectSliders record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing projectSliders record
  updateProjectSliders: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.ProjectSliders.updateProjectSliders(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update projectSliders record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteProjectSliders: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.ProjectSliders.deleteProjectSliders(id);
      set((state) => ({
        ProjectSliders: state.ProjectSliders.filter((ProjectSliders) => ProjectSliders.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProjectSliders: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.ProjectSliders.getProjectSliders(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProjectSliders: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectSliders = await agent.ProjectSliders.activateProjectSliders(id);
      set((state) => ({
        ProjectSliders: state.ProjectSliders.map((ProjectSliders) =>
          ProjectSliders.id === id ? { ...ProjectSliders, isActive: true } : ProjectSliders
        ),
        loading: false,
      }));
      toast.success('ProjectSliders activated successfully.');
      return updatedProjectSliders;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate ProjectSliders.');
      throw error;
    }
  },

  deactivateProjectSliders: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectSliders = await agent.ProjectSliders.deactivateProjectSliders(id);
      set((state) => ({
        ProjectSliders: state.ProjectSliders.map((ProjectSliders) =>
          ProjectSliders.id === id ? { ...ProjectSliders, isActive: false } : ProjectSliders
        ),
        loading: false,
      }));
      toast.success('ProjectSliders deactivated successfully.');
      return updatedProjectSliders;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate ProjectSliders.');
      throw error;
    }
  },
}));

export default useProjectSlidersStore;