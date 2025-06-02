import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useHistorytore = create((set) => ({
  History: [],
  loading: false,
  error: null,

  fetchHistory: async () => {
    set({ loading: true, error: null });
    try {
      const History = await agent.History.fetchHistorys();
      set({ History, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch History.');
    }
  },

  createHistory: async (HistoryData) => {
    set({ loading: true, error: null });
    try {
      const newHistory = await agent.History.createHistory(HistoryData);
      set((state) => ({
        History: [...state.History, newHistory],
        loading: false,
      }));
      return newHistory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create History.');
      throw error;
    }
  },

  updateHistory: async (id, HistoryData) => {
    set({ loading: true, error: null });
    try {
      const updatedHistory = await agent.History.updateHistory(id, HistoryData);
      set((state) => ({
        History: state.History.map((History) =>
          History.id === id ? updatedHistory : History
        ),
        loading: false,
      }));
      return updatedHistory;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteHistory: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.History.deleteHistory(id);
      set((state) => ({
        History: state.History.filter((History) => History.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getHistory: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.History.getHistory(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

updateHistoryImage: async (id, logoFile) => {
    set({ loading: true, error: null });
    try {
      const updatedHistory = await agent.History.updateHistoryImage(id, logoFile);
      set((state) => ({
        History: state.History.map((History) =>
          History.id === id ? { ...History, imagePath: updatedHistory.imagePath } : History
        ),
        loading: false,
      }));
      return updatedHistory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update History Image.');
      throw error;
    }
  },
  
  activateHistory: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedHistory = await agent.History.activateHistory(id);
      set((state) => ({
        History: state.History.map((History) =>
          History.id === id ? { ...History, isActive: true } : History
        ),
        loading: false,
      }));
      toast.success('History activated successfully.');
      return updatedHistory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate History.');
      throw error;
    }
  },

  deactivateHistory: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedHistory = await agent.History.deactivateHistory(id);
      set((state) => ({
        History: state.History.map((History) =>
          History.id === id ? { ...History, isActive: false } : History
        ),
        loading: false,
      }));
      toast.success('History deactivated successfully.');
      return updatedHistory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate History.');
      throw error;
    }
  },
}));

export default useHistorytore;