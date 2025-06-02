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
import useprojectCategoriesStore from '../../context/projectCategoriesStore';


const ProjectCategoriesForm = () => {
  const { id } = useParams(); // Get ProjectCategories ID from URL for editing
  const navigate = useNavigate();
  const { createProjectCategories, updateProjectCategories, getProjectCategories } = useprojectCategoriesStore();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      name_pashto: '',
      name_dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProjectCategoriesData = async () => {
        try {
          const ProjectCategories = await getProjectCategories(id); // Call /ProjectCategories/{id} via agent
          if (ProjectCategories) {
            // Populate form fields using setValue
            setValue('name', ProjectCategories.name || '');
            setValue('name_pashto', ProjectCategories.name_pashto || '');
            setValue('name_dari', ProjectCategories.name_dari || '');
            setValue('description', ProjectCategories.description || '');
            setValue('description_pashto', ProjectCategories.description_pashto || '');
            setValue('description_dari', ProjectCategories.description_dari || '');
          } else {
            toast.error('ProjectCategories not found.');
            navigate('/projectCategories');
          }
        } catch (error) {
          toast.error('Failed to fetch ProjectCategories data.');
          navigate('/projectCategories');
        }
      };

      fetchProjectCategoriesData();
    }
  }, [id, isEdit, getProjectCategories, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateProjectCategories(id, data); // Update ProjectCategories
      } else {
        await createProjectCategories(data); // Create new ProjectCategories
      }
      toast.success(`ProjectCategories ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/projectCategories');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} ProjectCategories.`);
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
              <Grid item xs={4}>
                <TextField
                  label="Title (English)"
                  {...register('name', { required: 'Title (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Title (Pashto)"
                  {...register('name_pashto', { required: 'Title (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_pashto}
                  helperText={errors.name_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Title (Dari)"
                  {...register('name_dari', { required: 'Title (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_dari}
                  helperText={errors.name_dari?.message}
                />
              </Grid>
            </Grid>
              
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Description (English)"
                  {...register('description', { required: 'Title Description (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description (Pashto)"
                  {...register('description_pashto', { required: 'Title Description (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description_pashto}
                  helperText={errors.description_pashto?.message}
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  label="Description (Dari)"
                  {...register('description_dari' , { required: 'Title Description (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                    error={!!errors.description_dari}
                  helperText={errors.description_dari?.message}
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
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update ProjectCategories' : 'Create ProjectCategories'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/projectCategories')}
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

export default ProjectCategoriesForm;