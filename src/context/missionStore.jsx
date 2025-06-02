import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useMissionStore = create((set) => ({
  Mission: [],
  loading: false,
  error: null,

  fetchMission: async () => {
    set({ loading: true, error: null });
    try {
      const Mission = await agent.Mission.fetchMission();
      set({ Mission, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Mission.');
    }
  },

  // Create a new Mission record
createMission: async (MissionData) => {
    set({ loading: true, error: null });
    try {
      const newMission = await agent.Mission.createMission(MissionData);
      set((state) => ({
        Mission: [...state.Mission, newMission],
        loading: false,
      }));
      return newMission;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create Mission.');
      throw error;
    }
  },

  updateMission: async (id, MissionData) => {
    set({ loading: true, error: null });
    try {
      const updatedMission = await agent.Mission.updateMission(id, MissionData);
      set((state) => ({
        Mission: state.Mission.map((Mission) =>
          Mission.id === id ? updatedMission : Mission
        ),
        loading: false,
      }));
      return updatedMission;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteMission: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Mission.deleteMission(id);
      set((state) => ({
        Mission: state.Mission.filter((Mission) => Mission.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getMission: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Mission.getMission(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateMission: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedMission = await agent.Mission.activateMission(id);
      set((state) => ({
        Mission: state.Mission.map((Mission) =>
          Mission.id === id ? { ...Mission, isActive: true } : Mission
        ),
        loading: false,
      }));
      toast.success('Mission activated successfully.');
      return updatedMission;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Mission.');
      throw error;
    }
  },

  deactivateMission: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedMission = await agent.Mission.deactivateMission(id);
      set((state) => ({
        Mission: state.Mission.map((Mission) =>
          Mission.id === id ? { ...Mission, isActive: false } : Mission
        ),
        loading: false,
      }));
      toast.success('Mission deactivated successfully.');
      return updatedMission;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Mission.');
      throw error;
    }
  },
}));

export default useMissionStore;