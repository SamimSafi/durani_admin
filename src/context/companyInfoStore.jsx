import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useCompanyInfoStore = create((set) => ({
  CompanyInfo: [],
  loading: false,
  error: null,

  fetchCompanyInfo: async () => {
    set({ loading: true, error: null });
    try {
      const CompanyInfo = await agent.CompanyInfo.fetchCompanyInfo();
      set({ CompanyInfo, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch CompanyInfo.');
    }
  },

  createCompanyInfo: async (CompanyInfoData) => {
    set({ loading: true, error: null });
    try {
      const newCompanyInfo = await agent.CompanyInfo.createCompanyInfo(CompanyInfoData);
      set((state) => ({
        CompanyInfo: [...state.CompanyInfo, newCompanyInfo],
        loading: false,
      }));
      return newCompanyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create CompanyInfo.');
      throw error;
    }
  },

  updateCompanyInfo: async (id, CompanyInfoData) => {
    set({ loading: true, error: null });
    try {
      const updatedCompanyInfo = await agent.CompanyInfo.updateCompanyInfo(id, CompanyInfoData);
      set((state) => ({
        CompanyInfo: state.CompanyInfo.map((CompanyInfo) =>
          CompanyInfo.id === id ? updatedCompanyInfo : CompanyInfo
        ),
        loading: false,
      }));
      return updatedCompanyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update CompanyInfo.');
      throw error;
    }
  },

  deleteCompanyInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.CompanyInfo.deleteCompanyInfo(id);
      set((state) => ({
        CompanyInfo: state.CompanyInfo.filter((CompanyInfo) => CompanyInfo.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to delete CompanyInfo.');
      throw error;
    }
  },

  getCompanyInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const companyInfo = await agent.CompanyInfo.getCompanyInfo(id);
      set({ loading: false });
      return companyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch CompanyInfo.');
      throw error;
    }
  },

  activateCompanyInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedCompanyInfo = await agent.CompanyInfo.activateCompanyInfo(id);
      set((state) => ({
        CompanyInfo: state.CompanyInfo.map((CompanyInfo) =>
          CompanyInfo.id === id ? { ...CompanyInfo, isActive: true } : CompanyInfo
        ),
        loading: false,
      }));
      toast.success('CompanyInfo activated successfully.');
      return updatedCompanyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate CompanyInfo.');
      throw error;
    }
  },

  deactivateCompanyInfo: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedCompanyInfo = await agent.CompanyInfo.deactivateCompanyInfo(id);
      set((state) => ({
        CompanyInfo: state.CompanyInfo.map((CompanyInfo) =>
          CompanyInfo.id === id ? { ...CompanyInfo, isActive: false } : CompanyInfo
        ),
        loading: false,
      }));
      toast.success('CompanyInfo deactivated successfully.');
      return updatedCompanyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate CompanyInfo.');
      throw error;
    }
  },

  updateCompanyLogo: async (id, logoFile) => {
    set({ loading: true, error: null });
    try {
      const updatedCompanyInfo = await agent.CompanyInfo.updateCompanyLogo(id, logoFile);
      set((state) => ({
        CompanyInfo: state.CompanyInfo.map((CompanyInfo) =>
          CompanyInfo.id === id ? { ...CompanyInfo, logo: updatedCompanyInfo.logo } : CompanyInfo
        ),
        loading: false,
      }));
      toast.success('Company logo updated successfully.');
      return updatedCompanyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update company logo.');
      throw error;
    }
  },

  updateCompanyCoverPhoto: async (id, coverPhotoFile) => {
    set({ loading: true, error: null });
    try {
      const updatedCompanyInfo = await agent.CompanyInfo.updateCompanyCoverPhoto(id, coverPhotoFile);
      set((state) => ({
        CompanyInfo: state.CompanyInfo.map((CompanyInfo) =>
          CompanyInfo.id === id
            ? { ...CompanyInfo, cover: updatedCompanyInfo.coverPhoto }
            : CompanyInfo
        ),
        loading: false,
      }));
      toast.success('Company cover photo updated successfully.');
      return updatedCompanyInfo;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to update company cover photo.');
      throw error;
    }
  },
}));

export default useCompanyInfoStore;