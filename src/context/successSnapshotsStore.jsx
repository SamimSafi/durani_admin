import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useSuccessSnapshotsStore = create((set) => ({
  SuccessSnapshots: [],
  loading: false,
  error: null,

  fetchSuccessSnapshots: async () => {
    set({ loading: true, error: null });
    try {
      const SuccessSnapshots = await agent.SuccessSnapshots.fetchSuccessSnapshots();
      set({ SuccessSnapshots, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch SuccessSnapshots.');
    }
  },

  // Create a new SuccessSnapshots record
createSuccessSnapshots: async (SuccessSnapshotsData) => {
    set({ loading: true, error: null });
    try {
      const newSuccessSnapshots = await agent.SuccessSnapshots.createSuccessSnapshots(SuccessSnapshotsData);
      set((state) => ({
        SuccessSnapshots: [...state.SuccessSnapshots, newSuccessSnapshots],
        loading: false,
      }));
      return newSuccessSnapshots;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create SuccessSnapshots.');
      throw error;
    }
  },

  updateSuccessSnapshots: async (id, SuccessSnapshotsData) => {
    set({ loading: true, error: null });
    try {
      const updatedSuccessSnapshots = await agent.SuccessSnapshots.updateSuccessSnapshots(id, SuccessSnapshotsData);
      set((state) => ({
        SuccessSnapshots: state.SuccessSnapshots.map((SuccessSnapshots) =>
          SuccessSnapshots.id === id ? updatedSuccessSnapshots : SuccessSnapshots
        ),
        loading: false,
      }));
      return updatedSuccessSnapshots;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteSuccessSnapshots: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.SuccessSnapshots.deleteSuccessSnapshots(id);
      set((state) => ({
        SuccessSnapshots: state.SuccessSnapshots.filter((SuccessSnapshots) => SuccessSnapshots.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getSuccessSnapshots: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.SuccessSnapshots.getSuccessSnapshots(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateSuccessSnapshots: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedSuccessSnapshots = await agent.SuccessSnapshots.activateSuccessSnapshots(id);
      set((state) => ({
        SuccessSnapshots: state.SuccessSnapshots.map((SuccessSnapshots) =>
          SuccessSnapshots.id === id ? { ...SuccessSnapshots, isActive: true } : SuccessSnapshots
        ),
        loading: false,
      }));
      toast.success('SuccessSnapshots activated successfully.');
      return updatedSuccessSnapshots;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate SuccessSnapshots.');
      throw error;
    }
  },

  deactivateSuccessSnapshots: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedSuccessSnapshots = await agent.SuccessSnapshots.deactivateSuccessSnapshots(id);
      set((state) => ({
        SuccessSnapshots: state.SuccessSnapshots.map((SuccessSnapshots) =>
          SuccessSnapshots.id === id ? { ...SuccessSnapshots, isActive: false } : SuccessSnapshots
        ),
        loading: false,
      }));
      toast.success('SuccessSnapshots deactivated successfully.');
      return updatedSuccessSnapshots;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate SuccessSnapshots.');
      throw error;
    }
  },
}));

export default useSuccessSnapshotsStore;