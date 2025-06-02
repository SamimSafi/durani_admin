// src/stores/clientStore.js
import { create } from 'zustand';
import agent from '../api/agent';

const useClientStore = create((set) => ({
  clients: [],
  loading: true,

  fetchClients: async () => {
    try {
      set({ loading: true });
      const data = await agent.Clients.fetchClients();
      set({ clients: data, loading: false });
    } catch (error) {
      set({ loading: false });
      // Error toast handled in agent.js
    }
  },

  createClient: async (clientData) => {
    try {
      const newClient = await agent.Clients.createClient(clientData);
      set((state) => ({ clients: [...state.clients, newClient] }));
    } catch (error) {
      // Success toast handled in agent.js
    }
  },

  updateClient: async (id, updatedData) => {
    try {
      const updatedClient = await agent.Clients.updateClient(id, updatedData);
      set((state) => ({
        clients: state.clients.map((client) =>
          client.id === id ? updatedClient : client
        ),
      }));
    } catch (error) {
      // Success toast handled in agent.js
    }
  },

  deleteClient: async (id) => {
    try {
      await agent.Clients.deleteClient(id);
      set((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
      }));
    } catch (error) {
      // Success toast handled in agent.js
    }
  },

  bulkDeleteClients: async (ids) => {
    try {
      await agent.Clients.bulkDeleteClients(ids);
      set((state) => ({
        clients: state.clients.filter((client) => !ids.includes(client.id)),
      }));
    } catch (error) {
      // Success toast handled in agent.js
    }
  },
}));

export default useClientStore;