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
import usemissionStore from '../../context/missionStore';
import ColorPickerField from '../../components/ColorPickerField';


const MissionForm = () => {
  const { id } = useParams(); // Get Mission ID from URL for editing
  const navigate = useNavigate();
  const { createMission, updateMission, getMission } = usemissionStore();
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
      color: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchMissionData = async () => {
        try {
          const Mission = await getMission(id); // Call /Mission/{id} via agent
          if (Mission) {
            // Populate form fields using setValue
            setValue('title', Mission.title || '');
            setValue('title_pashto', Mission.title_pashto || '');
            setValue('title_dari', Mission.title_dari || '');
            setValue('description', Mission.description || '');
            setValue('description_pashto', Mission.description_pashto || '');
            setValue('description_dari', Mission.description_dari || '');
            setValue('color', Mission.color || '');
            setValue('isActive', Mission.isActive || false);
          } else {
            toast.error('Mission not found.');
            navigate('/mission');
          }
        } catch (error) {
          toast.error('Failed to fetch Mission data.');
          navigate('/mission');
        }
      };

      fetchMissionData();
    }
  }, [id, isEdit, getMission, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateMission(id, data); // Update Mission
      } else {
        await createMission(data); // Create new Mission
      }
      toast.success(`Mission ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/mission');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} Mission.`);
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
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
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
            </Grid>
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              
            <Grid container spacing={3}>
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
            </Grid>
           
            <Grid container spacing={2}>

               <Grid item xs={6}>
              <ColorPickerField
          name="color"
          label="Color"
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />
              </Grid>
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
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Mission' : 'Create Mission'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/mission')}
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

export default MissionForm;