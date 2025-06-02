import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useJopPostingStore = create((set) => ({
  jobPosting: [],
  loading: false,
  error: null,

  fetchJopPosting: async () => {
    set({ loading: true, error: null });
    try {
      const jobPosting = await agent.JopPosting.fetchJobPostings();
      set({ jobPosting, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch job postings.');
    }
  },

  createJobPosting: async (jobPostingData) => {
    set({ loading: true, error: null });
    try {
      const newJobPosting = await agent.JopPosting.createJobPosting(jobPostingData);
      set((state) => ({
        jobPosting: [...state.jobPosting, newJobPosting],
        loading: false,
      }));
      return newJobPosting;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create job posting.');
      throw error;
    }
  },

  updateJobPosting: async (id, jobPostingData) => {
    set({ loading: true, error: null });
    try {
      const updatedJobPosting = await agent.JopPosting.updateJobPosting(id, jobPostingData);
      set((state) => ({
        jobPosting: state.jobPosting.map((jobPosting) =>
          jobPosting.id === id ? updatedJobPosting : jobPosting
        ),
        loading: false,
      }));
      return updatedJobPosting;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update job posting.');
      throw error;
    }
  },

  deleteJobPosting: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.JopPosting.deleteJobPosting(id);
      set((state) => ({
        jobPosting: state.jobPosting.filter((jobPosting) => jobPosting.id !== id),
        loading: false,
      }));
      toast.success('Job posting deleted successfully.');
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to delete job posting.');
      throw error;
    }
  },

  getJobPosting: async (id) => {
    set({ loading: true, error: null });
    try {
      const jobPosting = await agent.JopPosting.getJobPosting(id);
      set({ loading: false });
      return jobPosting;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch job posting.');
      throw error;
    }
  },

  activateJobPosting: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedJobPosting = await agent.JopPosting.activateJobPosting(id);
      set((state) => ({
        jobPosting: state.jobPosting.map((jobPosting) =>
          jobPosting.id === id ? { ...jobPosting, isActive: true } : jobPosting
        ),
        loading: false,
      }));
      toast.success('Job posting activated successfully.');
      return updatedJobPosting;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate job posting.');
      throw error;
    }
  },

  deactivateJobPosting: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedJobPosting = await agent.JopPosting.deactivateJobPosting(id);
      set((state) => ({
        jobPosting: state.jobPosting.map((jobPosting) =>
          jobPosting.id === id ? { ...jobPosting, isActive: false } : jobPosting
        ),
        loading: false,
      }));
      toast.success('Job posting deactivated successfully.');
      return updatedJobPosting;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate job posting.');
      throw error;
    }
  },
}));

export default useJopPostingStore;