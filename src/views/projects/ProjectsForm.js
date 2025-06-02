// src/components/ProjectsForm.js
import  { useEffect, useState } from 'react';
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
  MenuItem,
} from '@mui/material';
import useProjectsStore from '../../context/projectsStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';
import useProjectCategoriesStore from '../../context/projectCategoriesStore';

const ProjectsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProjects, updateProjects, getProjects } = useProjectsStore();
  const { ProjectCategories, loading, fetchProjectCategories } = useProjectCategoriesStore();
  const isEdit = !!id;
const [projectsData, setProjectsData] = useState(null);
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
      briefSummary: '',
      briefSummary_pashto: '',
      briefSummary_dari: '',
      FullDescription: '',
      FullDescription_pashto: '',
      FullDescription_dari: '',
      Client: '',
      Client_pashto: '',
      Client_dari: '',
      CompleteDate: '',
      Location: '',
      satisfiedClients: '',
      orderServed: '',
      starReceived: '',
      happyCustomers: '',
      isActive: true,
      categoryId : '',
      imagefile: null, // Stores File object
    },
  });

    useEffect(() => {
    fetchProjectCategories();
  }, [fetchProjectCategories]);

  // Fetch projects data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchProjectsData = async () => {
        try {
          const projects = await getProjects(id);
          if (projects) {
            setProjectsData(projectsData);
            setValue('title', projects.title || '');
            setValue('title_pashto', projects.title_pashto || '');
            setValue('title_dari', projects.title_dari || '');
            setValue('briefSummary', projects.briefSummary || '');
            setValue('briefSummary_pashto', projects.briefSummary_pashto || '');
            setValue('briefSummary_dari', projects.briefSummary_dari || '');
            setValue('FullDescription', projects.FullDescription || '');
            setValue('FullDescription_pashto', projects.FullDescription_pashto || '');
            setValue('FullDescription_dari', projects.FullDescription_dari || '');
            setValue('Client', projects.Client || '');
            setValue('Client_pashto', projects.Client_pashto || '');
            setValue('Client_dari', projects.Client_dari || '');
            setValue('CompleteDate', projects.CompleteDate || '');
            setValue('Location', projects.Location || '');
            setValue('satisfiedClients', projects.satisfiedClients || '');
            setValue('orderServed', projects.orderServed || '');
            setValue('starReceived', projects.starReceived || '');
            setValue('happyCustomers', projects.happyCustomers || '');
            setValue('isActive', !!projects.isActive); // Ensure boolean
            setValue('categoryId ', projects.categoryId ); 
             const logoFile = await urlToFileObject(projects.image, 'logo');
                    setValue('imagefile', logoFile); // Set single file object
            // Note: 'file' is not pre-populated; user must re-upload
          } else {
            toast.error('Projects record not found.');
            navigate('/projects');
          }
        } catch (error) {
          toast.error('Failed to fetch projects data.');
          navigate('/projects');
        }
      };
      fetchProjectsData();
    }
  }, [id, isEdit, getProjects, navigate, setValue, projectsData]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Validate file for create mode
      if (!isEdit && !data.imagefile) {
        toast.error('Please upload an image.');
        return;
      }
        const payload = {
                          title: data.title,
                          title_pashto: data.title_pashto,
                          title_dari: data.title_dari,
                          briefSummary: data.briefSummary,
                          briefSummary_pashto: data.briefSummary_pashto,
                          briefSummary_dari: data.briefSummary_dari,
                          FullDescription: data.FullDescription,
                          FullDescription_pashto: data.FullDescription_pashto,
                          FullDescription_dari: data.FullDescription_dari,
                          Client: data.Client,
                          Client_pashto: data.Client_pashto,
                          Client_dari: data.Client_dari,
                          CompleteDate: data.CompleteDate,
                          Location: data.Location,
                          satisfiedClients: data.satisfiedClients,
                          orderServed: data.orderServed,
                          starReceived: data.starReceived,
                          happyCustomers: data.happyCustomers,
                          isActive: data.isActive,
                          categoryId: data.categoryId,
                          imagefile: data.imagefile, // This should be a File object (for multipart/form-data)
                        };

      if (isEdit) {
        await updateProjects(id, payload);
      } else {
        await createProjects(payload);
      }
      toast.success(`Projects ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/projects');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} projects record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Projects' : 'Create Projects'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                       <Controller
              name="categoryId "
              control={control}
              rules={{ required: 'Project is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Project Category"
                  disabled={isSubmitting || loading}
                  error={!!errors.categoryId }
                  helperText={errors.categoryId ?.message}
                  fullWidth
                   onChange={(e) => {
        field.onChange(e); // Update the field value in React Hook Form
        setValue('categoryId', e.target.value); // Programmatically set the value
      }}
                >
                  {loading ? (
                    <MenuItem disabled>Loading Category...</MenuItem>
                  ) : ProjectCategories.length === 0 ? (
                    <MenuItem disabled>No Category available</MenuItem>
                  ) : (
                    ProjectCategories.map((ProjectCategories) => (
                      <MenuItem key={ProjectCategories.id} value={ProjectCategories.id}>
                        {ProjectCategories.name} (ID: {ProjectCategories.id})
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            />

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

                    {/* Brief Summary Fields */}
                    <Grid container lg={12} md={12}  sm={12} spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Brief Summary (English)"
                          {...register('briefSummary', { required: 'Brief Summary (English) is required' })}
                          fullWidth
                          multiline
                          rows={3}
                          disabled={isSubmitting}
                          error={!!errors.briefSummary}
                          helperText={errors.briefSummary?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Brief Summary (Pashto)"
                          {...register('briefSummary_pashto', { required: 'Brief Summary (Pashto) is required' })}
                          fullWidth
                          multiline
                          rows={3}
                          disabled={isSubmitting}
                          error={!!errors.briefSummary_pashto}
                          helperText={errors.briefSummary_pashto?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Brief Summary (Dari)"
                          {...register('briefSummary_dari', { required: 'Brief Summary (Dari) is required' })}
                          fullWidth
                          multiline
                          rows={3}
                          disabled={isSubmitting}
                          error={!!errors.briefSummary_dari}
                          helperText={errors.briefSummary_dari?.message}
                        />
                      </Grid>
                    </Grid>

                    {/* Full Description Fields */}
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Full Description (English)"
                          {...register('FullDescription', { required: 'Full Description (English) is required' })}
                          fullWidth
                          multiline
                          rows={4}
                          disabled={isSubmitting}
                          error={!!errors.FullDescription}
                          helperText={errors.FullDescription?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Full Description (Pashto)"
                          {...register('FullDescription_pashto', { required: 'Full Description (Pashto) is required' })}
                          fullWidth
                          multiline
                          rows={4}
                          disabled={isSubmitting}
                          error={!!errors.FullDescription_pashto}
                          helperText={errors.FullDescription_pashto?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Full Description (Dari)"
                          {...register('FullDescription_dari', { required: 'Full Description (Dari) is required' })}
                          fullWidth
                          multiline
                          rows={4}
                          disabled={isSubmitting}
                          error={!!errors.FullDescription_dari}
                          helperText={errors.FullDescription_dari?.message}
                        />
                      </Grid>
                    </Grid>

                    {/* Client Info Fields */}
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Client (English)"
                          {...register('Client', { required: 'Client (English) is required' })}
                          fullWidth
                          disabled={isSubmitting}
                          error={!!errors.Client}
                          helperText={errors.Client?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Client (Pashto)"
                          {...register('Client_pashto', { required: 'Client (Pashto) is required' })}
                          fullWidth
                          disabled={isSubmitting}
                          error={!!errors.Client_pashto}
                          helperText={errors.Client_pashto?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Client (Dari)"
                          {...register('Client_dari', { required: 'Client (Dari) is required' })}
                          fullWidth
                          disabled={isSubmitting}
                          error={!!errors.Client_dari}
                          helperText={errors.Client_dari?.message}
                        />
                      </Grid>
                    </Grid>

                    {/* Other Fields */}
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Complete Date"
                          type="date"
                          {...register('CompleteDate', { required: 'Complete Date is required' })}
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          disabled={isSubmitting}
                          error={!!errors.CompleteDate}
                          helperText={errors.CompleteDate?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Location"
                          {...register('Location', { required: 'Location is required' })}
                          fullWidth
                          disabled={isSubmitting}
                          error={!!errors.Location}
                          helperText={errors.Location?.message}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Satisfied Clients"
                          type="number"
                          {...register('satisfiedClients')}
                          fullWidth
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Orders Served"
                          type="number"
                          {...register('orderServed')}
                          fullWidth
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Stars Received"
                          type="number"
                          {...register('starReceived')}
                          fullWidth
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Happy Customers"
                          type="number"
                          {...register('happyCustomers')}
                          fullWidth
                          disabled={isSubmitting}
                        />
                      </Grid>
                    </Grid>

                    {/* Is Active Switch and File Upload */}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
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
                      <Grid item xs={6}>
                        <FileUpload
                          control={control}
                          name="imagefile"
                          title={isEdit ? 'Update Image' : 'Upload Image'}
                          isEdit={isEdit}
                          isSubmitting={isSubmitting}
                          handleFileChange={(e, onChange) => {
                            const file = e.target.files[0] || e.dataTransfer.files[0];
                            if (file) onChange(file);
                          }}
                          existingImage={isEdit ? projectsData?.logoPath : null}
                        />
                      </Grid>
                    </Grid>

                    {/* Form Actions */}
                    <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
                      </Button>
                      <Button variant="outlined" onClick={() => navigate('/projects')} disabled={isSubmitting}>
                        Cancel
                      </Button>
                    </Box>
                  </Stack>
                </form>

      </Box>
    </Card>
  );
};

export default ProjectsForm;