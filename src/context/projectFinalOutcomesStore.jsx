import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProjectFinalOutcomesStore = create((set) => ({
  ProjectFinalOutcomes: [],
  loading: false,
  error: null,

  fetchProjectFinalOutcomes: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const ProjectFinalOutcomes = await agent.ProjectFinalOutcomes.fetchProjectFinalOutcomes(projectId);
      set({ ProjectFinalOutcomes, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch ProjectFinalOutcomes.');
    }
  },

  // Create a new ProjectFinalOutcomes record
createProjectFinalOutcomes: async (ProjectFinalOutcomesData) => {
    set({ loading: true, error: null });
    try {
      const newProjectFinalOutcomes = await agent.ProjectFinalOutcomes.createProjectFinalOutcomes(ProjectFinalOutcomesData);
      set((state) => ({
        ProjectFinalOutcomes: [...state.ProjectFinalOutcomes, newProjectFinalOutcomes],
        loading: false,
      }));
      return newProjectFinalOutcomes;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create ProjectFinalOutcomes.');
      throw error;
    }
  },

  updateProjectFinalOutcomes: async (id, ProjectFinalOutcomesData) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectFinalOutcomes = await agent.ProjectFinalOutcomes.updateProjectFinalOutcomes(id, ProjectFinalOutcomesData);
      set((state) => ({
        ProjectFinalOutcomes: state.ProjectFinalOutcomes.map((ProjectFinalOutcomes) =>
          ProjectFinalOutcomes.id === id ? updatedProjectFinalOutcomes : ProjectFinalOutcomes
        ),
        loading: false,
      }));
      return updatedProjectFinalOutcomes;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteProjectFinalOutcomes: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.ProjectFinalOutcomes.deleteProjectFinalOutcomes(id);
      set((state) => ({
        ProjectFinalOutcomes: state.ProjectFinalOutcomes.filter((ProjectFinalOutcomes) => ProjectFinalOutcomes.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProjectFinalOutcomes: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.ProjectFinalOutcomes.getProjectFinalOutcomes(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProjectFinalOutcomes: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectFinalOutcomes = await agent.ProjectFinalOutcomes.activateProjectFinalOutcomes(id);
      set((state) => ({
        ProjectFinalOutcomes: state.ProjectFinalOutcomes.map((ProjectFinalOutcomes) =>
          ProjectFinalOutcomes.id === id ? { ...ProjectFinalOutcomes, isActive: true } : ProjectFinalOutcomes
        ),
        loading: false,
      }));
      toast.success('ProjectFinalOutcomes activated successfully.');
      return updatedProjectFinalOutcomes;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate ProjectFinalOutcomes.');
      throw error;
    }
  },

  deactivateProjectFinalOutcomes: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectFinalOutcomes = await agent.ProjectFinalOutcomes.deactivateProjectFinalOutcomes(id);
      set((state) => ({
        ProjectFinalOutcomes: state.ProjectFinalOutcomes.map((ProjectFinalOutcomes) =>
          ProjectFinalOutcomes.id === id ? { ...ProjectFinalOutcomes, isActive: false } : ProjectFinalOutcomes
        ),
        loading: false,
      }));
      toast.success('ProjectFinalOutcomes deactivated successfully.');
      return updatedProjectFinalOutcomes;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate ProjectFinalOutcomes.');
      throw error;
    }
  },
}));

export default useProjectFinalOutcomesStore;