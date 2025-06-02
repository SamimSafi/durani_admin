import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProductCategoryStore = create((set) => ({
  ProductCategory: [],
  loading: false,
  error: null,

  fetchProductCategory: async () => {
    set({ loading: true, error: null });
    try {
      const ProductCategory = await agent.ProductCategory.fetchProductCategory();
      set({ ProductCategory, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch ProductCategory.');
    }
  },

  // Create a new ProductCategory record
createProductCategory: async (ProductCategoryData) => {
    set({ loading: true, error: null });
    try {
      const newProductCategory = await agent.ProductCategory.createProductCategory(ProductCategoryData);
      set((state) => ({
        ProductCategory: [...state.ProductCategory, newProductCategory],
        loading: false,
      }));
      return newProductCategory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to create ProductCategory.');
      throw error;
    }
  },

  updateProductCategory: async (id, ProductCategoryData) => {
    set({ loading: true, error: null });
    try {
      const updatedProductCategory = await agent.ProductCategory.updateProductCategory(id, ProductCategoryData);
      set((state) => ({
        ProductCategory: state.ProductCategory.map((ProductCategory) =>
          ProductCategory.id === id ? updatedProductCategory : ProductCategory
        ),
        loading: false,
      }));
      return updatedProductCategory;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteProductCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.ProductCategory.deleteProductCategory(id);
      set((state) => ({
        ProductCategory: state.ProductCategory.filter((ProductCategory) => ProductCategory.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProductCategory: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.ProductCategory.getProductCategory(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProductCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProductCategory = await agent.ProductCategory.activateProductCategory(id);
      set((state) => ({
        ProductCategory: state.ProductCategory.map((ProductCategory) =>
          ProductCategory.id === id ? { ...ProductCategory, isActive: true } : ProductCategory
        ),
        loading: false,
      }));
      toast.success('ProductCategory activated successfully.');
      return updatedProductCategory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate ProductCategory.');
      throw error;
    }
  },

  deactivateProductCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProductCategory = await agent.ProductCategory.deactivateProductCategory(id);
      set((state) => ({
        ProductCategory: state.ProductCategory.map((ProductCategory) =>
          ProductCategory.id === id ? { ...ProductCategory, isActive: false } : ProductCategory
        ),
        loading: false,
      }));
      toast.success('ProductCategory deactivated successfully.');
      return updatedProductCategory;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate ProductCategory.');
      throw error;
    }
  },
}));

export default useProductCategoryStore;