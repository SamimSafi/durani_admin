import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProjectGoalsStore = create((set) => ({
  ProjectGoals: [],
  loading: false,
  error: null,

  fetchProjectGoals: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const ProjectGoals = await agent.ProjectGoals.fetchProjectGoals(projectId);
      set({ ProjectGoals, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch ProjectGoals.');
    }
  },

  // Create a new projectGoals record
createProjectGoals: async (data) => {
    console.log('createProjectGoals called with data:', data);
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
      const response = await agent.ProjectGoals.createProjectGoals(formData);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('createProjectGoals error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create projectGoals record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing projectGoals record
  updateProjectGoals: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.ProjectGoals.updateProjectGoals(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update projectGoals record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteProjectGoals: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.ProjectGoals.deleteProjectGoals(id);
      set((state) => ({
        ProjectGoals: state.ProjectGoals.filter((ProjectGoals) => ProjectGoals.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProjectGoals: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.ProjectGoals.getProjectGoals(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProjectGoals: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectGoals = await agent.ProjectGoals.activateProjectGoals(id);
      set((state) => ({
        ProjectGoals: state.ProjectGoals.map((ProjectGoals) =>
          ProjectGoals.id === id ? { ...ProjectGoals, isActive: true } : ProjectGoals
        ),
        loading: false,
      }));
      toast.success('ProjectGoals activated successfully.');
      return updatedProjectGoals;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate ProjectGoals.');
      throw error;
    }
  },

  deactivateProjectGoals: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectGoals = await agent.ProjectGoals.deactivateProjectGoals(id);
      set((state) => ({
        ProjectGoals: state.ProjectGoals.map((ProjectGoals) =>
          ProjectGoals.id === id ? { ...ProjectGoals, isActive: false } : ProjectGoals
        ),
        loading: false,
      }));
      toast.success('ProjectGoals deactivated successfully.');
      return updatedProjectGoals;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate ProjectGoals.');
      throw error;
    }
  },
}));

export default useProjectGoalsStore;