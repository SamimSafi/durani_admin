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
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import usebioStore from '../../context/bioStore';


const BioForm = () => {
  const { id } = useParams(); // Get Bio ID from URL for editing
  const navigate = useNavigate();
  const { createBio, updateBio, getBio } = usebioStore();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      key: 'Address', // Default as per schema
      value: '',
      language: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchBioData = async () => {
        try {
          const Bio = await getBio(id); // Call /Bio/{id} via agent
          if (Bio) {
            // Populate form fields using setValue
            setValue('key', Bio.key || '');
            setValue('value', Bio.value || '');
            setValue('language', Bio.language || '');
            setValue('isActive', Bio.isActive || false);
          } else {
            toast.error('Bio not found.');
            navigate('/bio');
          }
        } catch (error) {
          toast.error('Failed to fetch Bio data.');
          navigate('/bio');
        }
      };

      fetchBioData();
    }
  }, [id, isEdit, getBio, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateBio(id, data); // Update Bio
      } else {
        await createBio(data); // Create new Bio
      }
      toast.success(`Bio ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/bio');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} Bio.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Bio' : 'Create Bio'}
        </Typography>
       <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Grid container lg={12} md={12}  sm={12} spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.key} disabled={isSubmitting}>
              <InputLabel id="key-label">Key</InputLabel>
              <Controller
                name="key"
                control={control}
                rules={{ required: 'Key is required' }}
                render={({ field }) => (
                  <Select
                    labelId="key-label"
                    label="Key"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value || 'Address'}
                  >
                    <MenuItem value="Location">Location</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Address">Address</MenuItem>
                  </Select>
                )}
              />
              {errors.key && (
                <Typography color="error" variant="caption">
                  {errors.key.message}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Value"
              {...register('value', { required: 'Value is required' })}
              fullWidth
              disabled={isSubmitting}
              error={!!errors.value}
              helperText={errors.value?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Language"
              {...register('language', { required: 'Language is required' })}
              fullWidth
              disabled={isSubmitting}
              error={!!errors.language}
              helperText={errors.language?.message}
            />
          </Grid>
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
        <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Bio' : 'Create Bio'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/bio')}
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

export default BioForm;