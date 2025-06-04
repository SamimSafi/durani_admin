import { create } from 'zustand';
import { toast } from 'react-toastify';
import agent from '../api/agent';

const useProductStore = create((set) => ({
  Product: [],
  loading: false,
  error: null,

  fetchProduct: async () => {
    set({ loading: true, error: null });
    try {
      const Product = await agent.Product.fetchProduct();
      set({ Product, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to fetch Product.');
    }
  },

  // Create a new product record
createProduct: async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'imageFile' && value) {
          formData.append(key, value); // Append File object
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      console.log('FormData prepared:', formData);
      const response = await agent.Product.createProduct(formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product record';
      toast.error(errorMessage);
      throw error;
    }
  },


  // Update an existing product record
  updateProduct: async (id, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'imageFile' && value) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await agent.Product.updateProduct(id, formData);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product record';
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await agent.Product.deleteProduct(id);
      set((state) => ({
        Product: state.Product.filter((Product) => Product.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getProduct: async (id) => {
  set({ loading: true, error: null });
  try {
    const history = await agent.Product.getProduct(id);
    set({ loading: false });
    return history;
  } catch (error) {
    set({ error: error.message, loading: false });
    toast.error('Failed to fetch history.');
    throw error;
  }
},

  activateProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProduct = await agent.Product.activateProduct(id);
      set((state) => ({
        Product: state.Product.map((Product) =>
          Product.id === id ? { ...Product, isActive: true } : Product
        ),
        loading: false,
      }));
      toast.success('Product activated successfully.');
      return updatedProduct;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to activate Product.');
      throw error;
    }
  },

  deactivateProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const updatedProduct = await agent.Product.deactivateProduct(id);
      set((state) => ({
        Product: state.Product.map((Product) =>
          Product.id === id ? { ...Product, isActive: false } : Product
        ),
        loading: false,
      }));
      toast.success('Product deactivated successfully.');
      return updatedProduct;
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to deactivate Product.');
      throw error;
    }
  },
}));

export default useProductStore;