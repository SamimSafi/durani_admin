/* eslint-disable react/prop-types */
import { useEffect } from 'react';
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
import useWhyChooseUsStore from '../../context/whyChooseUsStore';

const WhyChooseUsForm = () => {
  const { id, projectId } = useParams();
  const navigate = useNavigate();
  const { createWhyChooseUs, updateWhyChooseUs, getWhyChooseUs } = useWhyChooseUsStore();
  const isEdit = !!id;
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
      description: '',
      description_pashto: '',
      description_dari: '',
      video_link: '',
      isActive: true,
    },
  });

  // Fetch whyChooseUs data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchWhyChooseUsData = async () => {
        try {
          const whyChooseUs = await getWhyChooseUs(id);
          if (whyChooseUs) {
            setValue('title', whyChooseUs.title || '');
            setValue('title_pashto', whyChooseUs.title_pashto || '');
            setValue('title_dari', whyChooseUs.title_dari || '');
            setValue('description', whyChooseUs.description || '');
            setValue('description_pashto', whyChooseUs.description_pashto || '');
            setValue('description_dari', whyChooseUs.description_dari || '');
            setValue('video_link', whyChooseUs.video_link || '');
            setValue('isActive', !!whyChooseUs.isActive);
          } else {
            toast.error('why Choose Us not found.');
            navigate(`/whyChooseUs/${projectId}`);
          }
        } catch (error) {
          toast.error('Failed to fetch why Choose Us data.');
          navigate('/whyChooseUs');
        }
      };
      fetchWhyChooseUsData();
    }
  }, [id, isEdit, getWhyChooseUs, navigate, setValue, projectId]);

  const onSubmit = async (data) => {
    try {
      const payload = {
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
        await updateWhyChooseUs(id, payload);
      } else {
        await createWhyChooseUs(payload);
      }
      toast.success(`why Choose Us ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate(`/whyChooseUs`);
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} why Choose Us.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit why Choose Us' : 'Create why Choose Us'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>

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
                  ? 'Update why Choose Us'
                  : 'Create why Choose Us'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/whyChooseUs')}
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

export default WhyChooseUsForm;