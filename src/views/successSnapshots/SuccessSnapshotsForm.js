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
import usesuccessSnapshotsStore from '../../context/successSnapshotsStore';
import ColorPickerField from '../../components/ColorPickerField';


const SuccessSnapshotsForm = () => {
  const { id } = useParams(); // Get SuccessSnapshots ID from URL for editing
  const navigate = useNavigate();
  const { createSuccessSnapshots, updateSuccessSnapshots, getSuccessSnapshots } = usesuccessSnapshotsStore();
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
      completeProjectcount: '',
      HappyClientCount: '',
      QualifiedEnginnerCount: '',
      YearsExperience: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      color: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchSuccessSnapshotsData = async () => {
        try {
          const SuccessSnapshots = await getSuccessSnapshots(id); // Call /SuccessSnapshots/{id} via agent
          if (SuccessSnapshots) {
            // Populate form fields using setValue
            setValue('title', SuccessSnapshots.title || '');
            setValue('title_pashto', SuccessSnapshots.title_pashto || '');
            setValue('title_dari', SuccessSnapshots.title_dari || '');
            setValue('completeProjectcount', SuccessSnapshots.completeProjectcount || '');
            setValue('HappyClientCount', SuccessSnapshots.HappyClientCount || '');
            setValue('QualifiedEnginnerCount', SuccessSnapshots.QualifiedEnginnerCount || '');
            setValue('YearsExperience', SuccessSnapshots.YearsExperience || '');
            setValue('description', SuccessSnapshots.description || '');
            setValue('description_pashto', SuccessSnapshots.description_pashto || '');
            setValue('description_dari', SuccessSnapshots.description_dari || '');
            setValue('color', SuccessSnapshots.color || '');
            setValue('isActive', SuccessSnapshots.isActive || false);
          } else {
            toast.error('SuccessSnapshots not found.');
            navigate('/successSnapshots');
          }
        } catch (error) {
          toast.error('Failed to fetch SuccessSnapshots data.');
          navigate('/successSnapshots');
        }
      };

      fetchSuccessSnapshotsData();
    }
  }, [id, isEdit, getSuccessSnapshots, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateSuccessSnapshots(id, data); // Update SuccessSnapshots
      } else {
        await createSuccessSnapshots(data); // Create new SuccessSnapshots
      }
      toast.success(`SuccessSnapshots ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/successSnapshots');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} SuccessSnapshots.`);
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
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={3}>
                <TextField
                  label="complete Projectcount"
                  {...register('completeProjectcount', { required: 'complete Projectcount is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.completeProjectcount}
                  helperText={errors.completeProjectcount?.message}
                  type='number'
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Happy Client Count"
                  {...register('HappyClientCount', { required: 'Happy Client Count is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.HappyClientCount}
                  helperText={errors.HappyClientCount?.message}
                  type='number'
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Qualified Engineer Count"
                  {...register('QualifiedEnginnerCount', { required: 'Qualified Engineer Count is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.QualifiedEnginnerCount}
                  helperText={errors.QualifiedEnginnerCount?.message}
                  type='number'
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Years Experience"
                  {...register('YearsExperience', { required: 'Years Experience is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.YearsExperience}
                  helperText={errors.YearsExperience?.message}
                  type='number'
                />
              </Grid>
            </Grid>
              
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
               <Grid item xs={4}>
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
           
            <Grid container lg={12} md={12}  sm={12} spacing={2}>

               <Grid item xs={6}>
                    <ColorPickerField
                          name="color"
                          label="Color"
                          register={register}
                          errors={errors}
                          disabled={isSubmitting}
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
                {isSubmitting ? 'Saving...' : isEdit ? 'Update SuccessSnapshots' : 'Create SuccessSnapshots'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/successSnapshots')}
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

export default SuccessSnapshotsForm;