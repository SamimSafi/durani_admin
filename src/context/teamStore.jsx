import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useTeamStore = create((set) => ({
  Team: [],
  loading: false,
  error: null,

  fetchTeam: async () => {
    set({ loading: true, error: null });
    try {
      const Team = await agent.Team.fetchTeam();
      set({ Team, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Team.');
    }
  },

  createTeam: async (TeamData) => {
    set({ loading: true, error: null });
    try {
      const newTeam = await agent.Team.createTeam(TeamData);
      set((state) => ({
        Team: [...state.Team, newTeam],
        loading: false,
      }));
      return newTeam;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create Team.');
      throw error;
    }
  },

  updateTeam: async (id, TeamData) => {
    set({ loading: true, error: null });
    try {
      const updatedTeam = await agent.Team.updateTeam(id, TeamData);
      set((state) => ({
        Team: state.Team.map((Team) =>
          Team.id === id ? updatedTeam : Team
        ),
        loading: false,
      }));
      return updatedTeam;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update Team.');
      throw error;
    }
  },

  deleteTeam: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Team.deleteTeam(id);
      set((state) => ({
        Team: state.Team.filter((Team) => Team.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to delete Team.');
      throw error;
    }
  },

  getTeam: async (id) => {
    set({ loading: true, error: null });
    try {
      const team = await agent.Team.getTeam(id);
      set({ loading: false });
      return team;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Team.');
      throw error;
    }
  },

  activateTeam: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedTeam = await agent.Team.activateTeam(id);
      set((state) => ({
        Team: state.Team.map((Team) =>
          Team.id === id ? { ...Team, isActive: true } : Team
        ),
        loading: false,
      }));
      toast.success('Team activated successfully.');
      return updatedTeam;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Team.');
      throw error;
    }
  },

  deactivateTeam: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedTeam = await agent.Team.deactivateTeam(id);
      set((state) => ({
        Team: state.Team.map((Team) =>
          Team.id === id ? { ...Team, isActive: false } : Team
        ),
        loading: false,
      }));
      toast.success('Team deactivated successfully.');
      return updatedTeam;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Team.');
      throw error;
    }
  },

  updateTeamImage: async (id, logoFile) => {
    set({ loading: true, error: null });
    try {
      const updatedTeam = await agent.Team.updateTeamImage(id, logoFile);
      set((state) => ({
        Team: state.Team.map((Team) =>
          Team.id === id ? { ...Team, logo: updatedTeam.logo } : Team
        ),
        loading: false,
      }));
      return updatedTeam;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update company logo.');
      throw error;
    }
  },
}));

export default useTeamStore;