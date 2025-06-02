// src/components/ProjectSlidersForm.js
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
import useProjectSlidersStore from '../../context/projectSlidersStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';
import useProjectsStore from '../../context/projectsStore';

const ProjectSlidersForm = () => {
  const { id,projectId } = useParams();
  const navigate = useNavigate();
  const { createProjectSliders, updateProjectSliders, getProjectSliders } = useProjectSlidersStore();
  const { Projects, loading, fetchProjects } = useProjectsStore();
  const isEdit = !!id;
  const [projectSlidersData, setProjectSlidersData] = useState(null);
  
  // Fetch projects for dropdown
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      projectId: '' || projectId,
      title: '',
      title_pashto: '',
      title_dari: '',
      briefSummary: '',
      briefSummary_pashto: '',
      briefSummary_dari: '',
      isActive: true,
      imagefile: null,
    },
  });

  // Fetch projectSliders data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchProjectSlidersData = async () => {
        try {
          const projectSliders = await getProjectSliders(id);
          if (projectSliders) {
            setProjectSlidersData(projectSliders);
            setValue('projectId', projectSliders.projectId || '');
            setValue('title', projectSliders.title || '');
            setValue('title_pashto', projectSliders.title_pashto || '');
            setValue('title_dari', projectSliders.title_dari || '');
            setValue('briefSummary', projectSliders.briefSummary || '');
            setValue('briefSummary_pashto', projectSliders.briefSummary_pashto || '');
            setValue('briefSummary_dari', projectSliders.briefSummary_dari || '');
            setValue('isActive', !!projectSliders.isActive);
            const logoFile = await urlToFileObject(projectSliders.image, 'logo');
            setValue('imagefile', logoFile);
          } else {
            toast.error('ProjectSliders record not found.');
            navigate(`/projectSliders/${projectSliders.projectId}`);
          }
        } catch (error) {
          toast.error('Failed to fetch projectSliders data.');
          navigate('/projectSliders');
        }
      };
      fetchProjectSlidersData();
    }
  }, [id, isEdit, getProjectSliders, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit && !data.imagefile) {
        toast.error('Please upload an image.');
        return;
      }

      const payload = {
        projectId: data.projectId,
        title: data.title,
        title_pashto: data.title_pashto,
        title_dari: data.title_dari,
        briefSummary: data.briefSummary,
        briefSummary_pashto: data.briefSummary_pashto,
        briefSummary_dari: data.briefSummary_dari,
        isActive: data.isActive,
        imagefile: data.imagefile,
      };

      if (isEdit) {
        await updateProjectSliders(id, payload);
      } else {
        await createProjectSliders(payload);
      }
      toast.success(`ProjectSliders ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate(`/projectSliders/${payload.projectId}`);
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} projectSliders record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Project Goals' : 'Create Project Goals'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Project ID Dropdown */}
            <Controller
              name="projectId"
              control={control}
              rules={{ required: 'Project is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Project"
                  disabled={isSubmitting || loading}
                  error={!!errors.projectId}
                  helperText={errors.projectId?.message}
                  fullWidth
                >
                  {loading ? (
                    <MenuItem disabled>Loading projects...</MenuItem>
                  ) : Projects.length === 0 ? (
                    <MenuItem disabled>No projects available</MenuItem>
                  ) : (
                    Projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.title} (ID: {project.id})
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            />

            {/* Rest of the form fields remain the same */}
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

            {/* Is Active Switch and File Upload */}
            <Grid container lg={12} md={12}  sm={12} spacing={2} alignItems="center">
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
                  existingImage={isEdit ? projectSlidersData?.image : null}
                />
              </Grid>
            </Grid>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Project Goal' : 'Create Project Goal'}
              </Button>
              <Button variant="outlined" onClick={() => navigate(`/projectSliders/${isEdit ? projectSlidersData.projectId:projectId}`)} disabled={isSubmitting}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Card>
  );
};
export default ProjectSlidersForm;