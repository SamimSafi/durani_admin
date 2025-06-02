/* eslint-disable react/prop-types */
import  {  useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  Grid,
  Card,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import useHistorytore from '../../context/historyStore';


const HistoryForm = () => {
  const { id } = useParams(); // Get History ID from URL for editing
  const navigate = useNavigate();
  const { createHistory, updateHistory, getHistory } = useHistorytore();
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
      subTitle: '',
      subTitle_pashto: '',
      subTitle_dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchHistoryData = async () => {
        try {
          const history = await getHistory(id); // Call /history/{id} via agent
          if (history) {
            // Populate form fields using setValue
            setValue('title', history.title || '');
            setValue('title_pashto', history.title_pashto || '');
            setValue('title_dari', history.title_dari || '');
            setValue('subTitle', history.subTitle || '');
            setValue('subTitle_pashto', history.subTitle_pashto || '');
            setValue('subTitle_dari', history.subTitle_dari || '');
            setValue('description', history.description || '');
            setValue('description_pashto', history.description_pashto || '');
            setValue('description_dari', history.description_dari || '');
            setValue('isActive', history.isActive || false);
          } else {
            toast.error('History not found.');
            navigate('/history');
          }
        } catch (error) {
          toast.error('Failed to fetch history data.');
          navigate('/history');
        }
      };

      fetchHistoryData();
    }
  }, [id, isEdit, getHistory, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateHistory(id, data); // Update history
      } else {
        await createHistory(data); // Create new history
      }
      toast.success(`History ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/history');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} history.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Content' : 'Create Content'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Title (English)"
                  {...register('title', { required: 'Title (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Title (Pashto)"
                  {...register('title_pashto', { required: 'Title (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title_pashto}
                  helperText={errors.title_pashto?.message}
                />
              </Grid>
            </Grid>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Title (Dari)"
                  {...register('title_dari', { required: 'Title (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title_dari}
                  helperText={errors.title_dari?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Subtitle (English)"
                  {...register('subTitle' , { required: 'Title Subtitle (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                    error={!!errors.subTitle}
                  helperText={errors.subTitle?.message}
                />
              </Grid>
            </Grid>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Subtitle (Pashto)"
                  {...register('subTitle_pashto', { required: 'Title Subtitle (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                    error={!!errors.subTitle_pashto}
                  helperText={errors.subTitle_pashto?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Subtitle (Dari)"
                  {...register('subTitle_dari', { required: 'Title Subtitle (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                    error={!!errors.subTitle_dari}
                  helperText={errors.subTitle_dari?.message}
                />
              </Grid>
            </Grid>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
            </Grid>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Controller
                      name="isActive"
                      control={control} // From useForm
                      render={({ field }) => (
                        <Switch
                          checked={field.value} // Bind to form state
                          onChange={(e) => field.onChange(e.target.checked)} // Update form state
                          disabled={isSubmitting}
                        />
                      )}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Content' : 'Create Content'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/history')}
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

export default HistoryForm;