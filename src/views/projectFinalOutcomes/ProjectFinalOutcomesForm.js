/* eslint-disable react/prop-types */
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
  MenuItem,
} from '@mui/material';
import useProjectFinalOutcomesStore from '../../context/projectFinalOutcomesStore';
import useProjectsStore from '../../context/projectsStore';

const ProjectFinalOutcomesForm = () => {
  const { id, projectId } = useParams();
  const navigate = useNavigate();
  const { createProjectFinalOutcomes, updateProjectFinalOutcomes, getProjectFinalOutcomes } = useProjectFinalOutcomesStore();
  const { Projects, loading, fetchProjects } = useProjectsStore();
  const isEdit = !!id;
const [projectFinalOutcomesData, setProjectFinalOutcomesData] = useState(null);
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
      projectId: isEdit ? '' : projectId || '',
      title: '',
      title_pashto: '',
      title_dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      video_link: '',
      isActive: true,
    },
  });

  // Fetch projectFinalOutcomes data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchProjectFinalOutcomesData = async () => {
        try {
          const projectFinalOutcomes = await getProjectFinalOutcomes(id);
          if (projectFinalOutcomes) {
            setProjectFinalOutcomesData(projectFinalOutcomes);
            setValue('projectId', projectFinalOutcomes.projectId || '');
            setValue('title', projectFinalOutcomes.title || '');
            setValue('title_pashto', projectFinalOutcomes.title_pashto || '');
            setValue('title_dari', projectFinalOutcomes.title_dari || '');
            setValue('description', projectFinalOutcomes.description || '');
            setValue('description_pashto', projectFinalOutcomes.description_pashto || '');
            setValue('description_dari', projectFinalOutcomes.description_dari || '');
            setValue('video_link', projectFinalOutcomes.video_link || '');
            setValue('isActive', !!projectFinalOutcomes.isActive);
          } else {
            toast.error('Project Final Outcome not found.');
            navigate(`/projectFinalOutcomes/${projectId}`);
          }
        } catch (error) {
          toast.error('Failed to fetch Project Final Outcome data.');
          navigate('/projectFinalOutcomes');
        }
      };
      fetchProjectFinalOutcomesData();
    }
  }, [id, isEdit, getProjectFinalOutcomes, navigate, setValue, projectId]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        projectId: Number(data.projectId), // Ensure projectId is a number
        title: data.title,
        title_pashto: data.title_pashto,
        title_dari: data.title_dari,
        description:data.description,
        description_pashto: data.description_pashto,
        description_dari: data.description_dari,
        video_link: data.video_link,
        isActive: data.isActive,
      };

      if (isEdit) {
        await updateProjectFinalOutcomes(id, payload);
      } else {
        await createProjectFinalOutcomes(payload);
      }
      toast.success(`Project Final Outcome ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate(`/projectFinalOutcomes/${data.projectId}`);
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} Project Final Outcome.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Project Final Outcome' : 'Create Project Final Outcome'}
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

            {/* Title Fields */}
            <Grid container spacing={2}>
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

            {/* Description Fields */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Description (English)"
                  {...register('description', { required: 'Description (English) is required' })}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={isSubmitting}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Description (Pashto)"
                  {...register('description_pashto', { required: 'Description (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={isSubmitting}
                  error={!!errors.description_pashto}
                  helperText={errors.description_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Description (Dari)"
                  {...register('description_dari', { required: 'Description (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={isSubmitting}
                  error={!!errors.description_dari}
                  helperText={errors.description_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Video Link Field */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Video Link"
                  {...register('video_link', {
                    required: 'Video Link is required',
                    pattern: {
                      value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                      message: 'Please enter a valid URL',
                    },
                  })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.video_link}
                  helperText={errors.video_link?.message}
                />
              </Grid>
            </Grid>

            {/* Is Active Switch */}
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
            </Grid>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Project Final Outcome'
                  : 'Create Project Final Outcome'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/projectFinalOutcomes/${isEdit ? projectFinalOutcomesData?.projectId : projectId}`)}
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

export default ProjectFinalOutcomesForm;