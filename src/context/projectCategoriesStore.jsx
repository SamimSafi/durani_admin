import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProjectCategoriesStore = create((set) => ({
  ProjectCategories: [],
  loading: false,
  error: null,

  fetchProjectCategories: async () => {
    set({ loading: true, error: null });
    try {
      const ProjectCategories = await agent.ProjectCategories.fetchProjectCategories();
      set({ ProjectCategories, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch ProjectCategories.');
    }
  },

  // Create a new ProjectCategories record
createProjectCategories: async (ProjectCategoriesData) => {
    set({ loading: true, error: null });
    try {
      const newProjectCategories = await agent.ProjectCategories.createProjectCategories(ProjectCategoriesData);
      set((state) => ({
        ProjectCategories: [...state.ProjectCategories, newProjectCategories],
        loading: false,
      }));
      return newProjectCategories;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create ProjectCategories.');
      throw error;
    }
  },

  updateProjectCategories: async (id, ProjectCategoriesData) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectCategories = await agent.ProjectCategories.updateProjectCategories(id, ProjectCategoriesData);
      set((state) => ({
        ProjectCategories: state.ProjectCategories.map((ProjectCategories) =>
          ProjectCategories.id === id ? updatedProjectCategories : ProjectCategories
        ),
        loading: false,
      }));
      return updatedProjectCategories;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteProjectCategories: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.ProjectCategories.deleteProjectCategories(id);
      set((state) => ({
        ProjectCategories: state.ProjectCategories.filter((ProjectCategories) => ProjectCategories.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProjectCategories: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.ProjectCategories.getProjectCategories(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProjectCategories: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectCategories = await agent.ProjectCategories.activateProjectCategories(id);
      set((state) => ({
        ProjectCategories: state.ProjectCategories.map((ProjectCategories) =>
          ProjectCategories.id === id ? { ...ProjectCategories, isActive: true } : ProjectCategories
        ),
        loading: false,
      }));
      toast.success('ProjectCategories activated successfully.');
      return updatedProjectCategories;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate ProjectCategories.');
      throw error;
    }
  },

  deactivateProjectCategories: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProjectCategories = await agent.ProjectCategories.deactivateProjectCategories(id);
      set((state) => ({
        ProjectCategories: state.ProjectCategories.map((ProjectCategories) =>
          ProjectCategories.id === id ? { ...ProjectCategories, isActive: false } : ProjectCategories
        ),
        loading: false,
      }));
      toast.success('ProjectCategories deactivated successfully.');
      return updatedProjectCategories;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate ProjectCategories.');
      throw error;
    }
  },
}));

export default useProjectCategoriesStore;