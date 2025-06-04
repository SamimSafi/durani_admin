// src/components/ProductForm.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Card,
  Box,
  Typography,
  Stack,
  Grid,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import useProductStore from '../../context/productStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';
import useProductCategoryStore from '../../context/productCategoryStore';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProduct, updateProduct, getProduct } = useProductStore();
  const { ProductCategory, loading, fetchProductCategory } = useProductCategoryStore();
  const isEdit = !!id;
  const [productData, setProductData] = useState(null);

  // Fetch product for dropdown
  useEffect(() => {
    fetchProductCategory();
  }, [fetchProductCategory]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      categoryId: '',
      name: '',
      description: '',
      imageFile: null,
    },
  });

  // Fetch product data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchProductData = async () => {
        try {
          const product = await getProduct(id);
          if (product) {
            setProductData(product);
            setValue('categoryId', product.categoryId || '');
            setValue('name', product.name || '');
            setValue('description', product.description || '');
            const imageFile = await urlToFileObject(product.image, 'imageFile');
            setValue('imageFile', imageFile);
          } else {
            toast.error('Product record not found.');
            navigate(`/product`);
          }
        } catch (error) {
          toast.error('Failed to fetch product data.');
          navigate('/product');
        }
      };
      fetchProductData();
    }
  }, [id, isEdit, getProduct, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit && !data.imageFile) {
        toast.error('Please upload an image.');
        return;
      }

      const payload = {
        categoryId: data.categoryId,
        name: data.name,
        description: data.description,
        imageFile: data.imageFile,
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate(`/product`);
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} product record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Product' : 'Create Product'}
        </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
  <Stack spacing={3}>
    {/* Category ID Dropdown */}
    <Controller
      name="categoryId"
      control={control}
      rules={{ required: 'Category is required' }}
      render={({ field }) => (
        <TextField
          {...field}
          select
          label="Category"
          disabled={isSubmitting || loading}
          error={!!errors.categoryId}
          helperText={errors.categoryId?.message}
          fullWidth
        >
          {loading ? (
            <MenuItem disabled>Loading categories...</MenuItem>
          ) : ProductCategory.length === 0 ? (
            <MenuItem disabled>No categories available</MenuItem>
          ) : (
            ProductCategory.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name} (ID: {project.id})
              </MenuItem>
            ))
          )}
        </TextField>
      )}
    />

    {/* Name Field */}
    <Controller
      name="name"
      control={control}
      rules={{ required: 'Name is required' }}
      render={({ field }) => (
        <TextField
          label="Name"
          {...field}
          fullWidth
          disabled={isSubmitting}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      )}
    />

    {/* Description Field */}
    <Controller
      name="description"
      control={control}
      rules={{ required: 'Description is required' }}
      render={({ field }) => (
        <TextField
          label="Description"
          {...field}
          fullWidth
          multiline
          rows={4}
          disabled={isSubmitting}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      )}
    />

    {/* Image Upload */}
    <FileUpload
      control={control}
      name="imageFile"
      title={isEdit ? 'Update Image' : 'Upload Image'}
      isEdit={isEdit}
      isSubmitting={isSubmitting}
      handleFileChange={(e, onChange) => {
        const file = e.target.files[0] || e.dataTransfer.files[0];
        if (file) onChange(file);
      }}
      existingImage={isEdit ? productData?.imageFile : null}
    />

    {/* Form Actions */}
    <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate(`/product`)}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
    </Box>
  </Stack>
</form>
      </Box>
    </Card>
  );
};

export default ProductForm;