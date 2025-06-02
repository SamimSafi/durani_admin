import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useContactStore = create((set) => ({
  Contact: [],
  loading: false,
  error: null,

  fetchContact: async () => {
    set({ loading: true, error: null });
    try {
      const Contact = await agent.Contact.fetchContact();
      set({ Contact, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Contact.');
    }
  },

  deleteContact: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Contact.deleteContact(id);
      set((state) => ({
        Contact: state.Contact.filter((Contact) => Contact.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

}));

export default useContactStore;