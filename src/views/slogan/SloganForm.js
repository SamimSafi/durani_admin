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
  MenuItem,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import usesloganStore from '../../context/sloganStore';


const SloganForm = () => {
  const { id } = useParams(); // Get Slogan ID from URL for editing
  const navigate = useNavigate();
  const { createSlogan, updateSlogan, getSlogan } = usesloganStore();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      pageName: '',
      content: '',
      content_dari: '',
      content_pashto: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchSloganData = async () => {
        try {
          const Slogan = await getSlogan(id); // Call /Slogan/{id} via agent
          if (Slogan) {
            // Populate form fields using setValue
            setValue('pageName', Slogan.pageName || '');
            setValue('content', Slogan.content || '');
            setValue('content_dari', Slogan.content_dari || '');
            setValue('content_pashto', Slogan.content_pashto || '');
          } else {
            toast.error('Slogan not found.');
            navigate('/slogan');
          }
        } catch (error) {
          toast.error('Failed to fetch Slogan data.');
          navigate('/slogan');
        }
      };

      fetchSloganData();
    }
  }, [id, isEdit, getSlogan, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateSlogan(id, data); // Update Slogan
      } else {
        await createSlogan(data); // Create new Slogan
      }
      toast.success(`Slogan ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/slogan');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} Slogan.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Slogan' : 'Create Slogan'}
        </Typography>
     <form onSubmit={handleSubmit(onSubmit)}>
  <Stack spacing={3}>
    <Grid container lg={12} md={12} sm={12} spacing={3}>
      <Grid item xs={12}>
        <Controller
          name="pageName"
          control={control}
          rules={{ required: 'Page Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Page Name"
              fullWidth
              disabled={isSubmitting}
              error={!!errors.pageName}
              helperText={errors.pageName?.message}
            >
              {/* Enum options for dropdown */}
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="About_us">About Us</MenuItem>
              <MenuItem value="Services">Services</MenuItem>
              <MenuItem value="Projects">Projects</MenuItem>
              <MenuItem value="Products">Products</MenuItem>
            </TextField>
          )}
        />
      </Grid>
    </Grid>

    <Grid container lg={12} md={12} sm={12} spacing={3}>
      <Grid item xs={12}>
        <Controller
          name="content"
          control={control}
          rules={{ required: 'Content is required' }}
          render={({ field }) => (
            <TextField
              label="Content"
              {...field}
              fullWidth
              multiline
              rows={4}
              disabled={isSubmitting}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="content_dari"
          control={control}
          rules={{ required: 'Content Dari is required' }}
          render={({ field }) => (
            <TextField
              label="Content Dari"
              {...field}
              fullWidth
              multiline
              rows={4}
              disabled={isSubmitting}
              error={!!errors.content_dari}
              helperText={errors.content_dari?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="content_pashto"
          control={control}
          rules={{ required: 'Content Pashto is required' }}
          render={({ field }) => (
            <TextField
              label="Content Pashto"
              {...field}
              fullWidth
              multiline
              rows={4}
              disabled={isSubmitting}
              error={!!errors.content_pashto}
              helperText={errors.content_pashto?.message}
            />
          )}
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
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Slogan' : 'Create Slogan'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/slogan')}
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

export default SloganForm;