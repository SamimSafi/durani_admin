// src/components/ServicesForm.js
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
  FormControlLabel,
  Switch,
} from '@mui/material';
import useServicesStore from '../../context/servicesStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';

const ServicesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createServices, updateServices, getServices } = useServicesStore();
  const isEdit = !!id;
  const [servicesData, setServicesData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      title_pashto: '',
      title_dari: '',
      summary: '',
      summary_pashto: '',
      summary_dari: '',
      detailedDescription: '',
      detailedDescription_pashto: '',
      detailedDescription_dari: '',
      numberOfSatisfiedClient: '',
      successWork: '',
      isActive: true,
      files: [null, null, null], // Array for icon, image1, image2
    },
  });

  // Fetch services data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchServicesData = async () => {
        try {
          const services = await getServices(id);
          if (services) {
            setServicesData(services); // Store the entire service object
            setValue('title', services.title || '');
            setValue('title_pashto', services.title_pashto || '');
            setValue('title_dari', services.title_dari || '');
            setValue('summary', services.summary || '');
            setValue('summary_pashto', services.summary_pashto || '');
            setValue('summary_dari', services.summary_dari || '');
            setValue('detailedDescription', services.detailedDescription || '');
            setValue('detailedDescription_pashto', services.detailedDescription_pashto || '');
            setValue('detailedDescription_dari', services.detailedDescription_dari || '');
            setValue('numberOfSatisfiedClient', services.numberOfSatisfiedClient || '');
            setValue('successWork', services.successWork || '');
            setValue('isActive', !!services.isActive); // Ensure boolean
             // Convert existing images to File objects
          const filesArray = await Promise.all([
            services.icon ? urlToFileObject(services.icon, 'icon') : null,
            services.image1 ? urlToFileObject(services.image1, 'image1') : null, 
            services.image2 ? urlToFileObject(services.image2, 'image2') : null
          ]);

          setValue('files', filesArray);
          } else {
            toast.error('Services record not found.');
            navigate('/services');
          }
        } catch (error) {
          toast.error('Failed to fetch services data.');
          navigate('/services');
        }
      };
      fetchServicesData();
      
    }
  }, [id, isEdit, getServices, navigate, setValue]);
// Helper function to convert image URL to File object

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Validate files for create mode

      if (!isEdit && (!data.files[0] || !data.files[1] || !data.files[2])) {
        toast.error('Please upload all three images (Icon, Image 1, Image 2).');
        return;
      }
      
      // Prepare the payload with files array as-is
    const payload = {
      title: data.title,
      title_pashto: data.title_pashto,
      title_dari: data.title_dari,
      summary: data.summary,
      summary_pashto: data.summary_pashto,
      summary_dari: data.summary_dari,
      detailedDescription: data.detailedDescription,
      detailedDescription_pashto: data.detailedDescription_pashto,
      detailedDescription_dari: data.detailedDescription_dari,
      numberOfSatisfiedClient: data.numberOfSatisfiedClient,
      successWork: data.successWork,
      isActive: data.isActive,
      files: data.files // Keep the original files array structure
    };

      if (isEdit) {
        await updateServices(id, payload);
      } else {
        await createServices(payload);
      }
      toast.success(`Services ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/services');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} services record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Services' : 'Create Services'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Title Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Title (English)"
                  {...register('title', { required: 'Title (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Title (Pashto)"
                  {...register('title_pashto', { required: 'Title (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title_pashto}
                  helperText={errors.title_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Title (Dari)"
                  {...register('title_dari', { required: 'Title (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title_dari}
                  helperText={errors.title_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Summary Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Summary (English)"
                  {...register('summary', { required: 'Summary (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.summary}
                  helperText={errors.summary?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Summary (Pashto)"
                  {...register('summary_pashto', { required: 'Summary (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.summary_pashto}
                  helperText={errors.summary_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Summary (Dari)"
                  {...register('summary_dari', { required: 'Summary (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.summary_dari}
                  helperText={errors.summary_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Detailed Description Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Detailed Description (English)"
                  {...register('detailedDescription', { required: 'Detailed Description (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.detailedDescription}
                  helperText={errors.detailedDescription?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Detailed Description (Pashto)"
                  {...register('detailedDescription_pashto', { required: 'Detailed Description (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.detailedDescription_pashto}
                  helperText={errors.detailedDescription_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Detailed Description (Dari)"
                  {...register('detailedDescription_dari', { required: 'Detailed Description (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.detailedDescription_dari}
                  helperText={errors.detailedDescription_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Additional Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Number of Satisfied Clients"
                  {...register('numberOfSatisfiedClient', { required: 'Number of Satisfied Clients is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.numberOfSatisfiedClient}
                  helperText={errors.numberOfSatisfiedClient?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Success Work"
                  {...register('successWork', { required: 'Success Work is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.successWork}
                  helperText={errors.successWork?.message}
                />
              </Grid>
            </Grid>

            {/* File Uploads */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <FileUpload
                  control={control}
                  name="files[0]"
                  title={isEdit ? 'Update Icon' : 'Upload Icon'}
                  isEdit={isEdit}
                  isSubmitting={isSubmitting}
                  handleFileChange={(e, onChange) => {
                    const file = e.target.files[0] || e.dataTransfer.files[0];
                    if (file) onChange(file);
                  }}
                   existingImage={isEdit ? servicesData?.icon : null} // Pass existing icon path
                />
              </Grid>
              <Grid item xs={4}>
                <FileUpload
                  control={control}
                  name="files[1]"
                  title={isEdit ? 'Update Image 1' : 'Upload Image 1'}
                  isEdit={isEdit}
                  isSubmitting={isSubmitting}
                  handleFileChange={(e, onChange) => {
                    const file = e.target.files[0] || e.dataTransfer.files[0];
                    if (file) onChange(file);
                  }}
                   existingImage={isEdit ? servicesData?.image1 : null} // Pass existing icon path
                />
              </Grid>
              <Grid item xs={4}>
                <FileUpload
                  control={control}
                  name="files[2]"
                  title={isEdit ? 'Update Image 2' : 'Upload Image 2'}
                  isEdit={isEdit}
                  isSubmitting={isSubmitting}
                  handleFileChange={(e, onChange) => {
                    const file = e.target.files[0] || e.dataTransfer.files[0];
                    if (file) onChange(file);
                  }}
                   existingImage={isEdit ? servicesData?.image2 : null} // Pass existing icon path
                />
              </Grid>
            </Grid>

            {/* IsActive */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Services' : 'Create Services'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/services')}
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

export default ServicesForm;