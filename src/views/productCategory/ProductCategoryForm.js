/* eslint-disable react/prop-types */
import  {  useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Grid,
  Card,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useproductCategoryStore from '../../context/productCategoryStore';


const ProductCategoryForm = () => {
  const { id } = useParams(); // Get ProductCategory ID from URL for editing
  const navigate = useNavigate();
  const { createProductCategory, updateProductCategory, getProductCategory } = useproductCategoryStore();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProductCategoryData = async () => {
        try {
          const ProductCategory = await getProductCategory(id); // Call /ProductCategory/{id} via agent
          if (ProductCategory) {
            // Populate form fields using setValue
            setValue('name', ProductCategory.name || '');
            setValue('description', ProductCategory.description || '');
          } else {
            toast.error('ProductCategory not found.');
            navigate('/productCategory');
          }
        } catch (error) {
          toast.error('Failed to fetch ProductCategory data.');
          navigate('/productCategory');
        }
      };

      fetchProductCategoryData();
    }
  }, [id, isEdit, getProductCategory, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProductCategory(id, data); // Update ProductCategory
      } else {
        await createProductCategory(data); // Create new ProductCategory
      }
      toast.success(`ProductCategory ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/productCategory');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} ProductCategory.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Category' : 'Create Category'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  {...register('name', { required: 'Name is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
            </Grid>
              
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  {...register('description', { required: 'Title Description is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
               <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update ProductCategory' : 'Create ProductCategory'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/productCategory')}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                 </Box>
              </Grid>
               
            </Grid>
           
          </Stack>
        </form>
      </Box>
    </Card>
  );
};

export default ProductCategoryForm;