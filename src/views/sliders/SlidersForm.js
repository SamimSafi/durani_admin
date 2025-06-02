// src/components/SlidersForm.js
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
} from '@mui/material';
import useSlidersStore from '../../context/slidersStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';

const SlidersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createSliders, updateSliders, getSliders } = useSlidersStore();
  const isEdit = !!id;
const [slidersData, setSlidersData] = useState(null);
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
      smallSubTitle: '',
      smallSubTitle_pashto: '',
      smallSubTitle_dari: '',
      isActive: true,
      photo: null, // Stores File object
    },
  });

  // Fetch sliders data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchSlidersData = async () => {
        try {
          const sliders = await getSliders(id);
          if (sliders) {
            setSlidersData(slidersData);
            setValue('title', sliders.title || '');
            setValue('title_pashto', sliders.title_pashto || '');
            setValue('title_dari', sliders.title_dari || '');
            setValue('subTitle', sliders.subTitle || '');
            setValue('subTitle_pashto', sliders.subTitle_pashto || '');
            setValue('subTitle_dari', sliders.subTitle_dari || '');
            setValue('description', sliders.description || '');
            setValue('description_pashto', sliders.description_pashto || '');
            setValue('description_dari', sliders.description_dari || '');
            setValue('smallSubTitle', sliders.smallSubTitle || '');
            setValue('smallSubTitle_pashto', sliders.smallSubTitle_pashto || '');
            setValue('smallSubTitle_dari', sliders.smallSubTitle_dari || '');
            setValue('isActive', !!sliders.isActive); // Ensure boolean
             const logoFile = await urlToFileObject(sliders.photoPath, 'logo');
                    setValue('photo', logoFile); // Set single file object
            // Note: 'file' is not pre-populated; user must re-upload
          } else {
            toast.error('Sliders record not found.');
            navigate('/sliders');
          }
        } catch (error) {
          toast.error('Failed to fetch sliders data.');
          navigate('/sliders');
        }
      };
      fetchSlidersData();
    }
  }, [id, isEdit, getSliders, navigate, setValue, slidersData]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Validate file for create mode
      if (!isEdit && !data.photo) {
        toast.error('Please upload an image.');
        return;
      }
      const payload = {
        title: data.title,
        title_pashto: data.title_pashto,
        title_dari: data.title_dari,
        subTitle: data.subTitle,
        subTitle_pashto: data.subTitle_pashto,
        subTitle_dari: data.subTitle_dari,
        description: data.description,
        description_pashto: data.description_pashto,
        description_dari: data.description_dari,
        smallSubTitle: data.smallSubTitle,
        smallSubTitle_pashto: data.smallSubTitle_pashto,
        smallSubTitle_dari: data.smallSubTitle_dari,
        isActive: data.isActive,
        photo: data.photo, // File object (binary)
      };
      if (isEdit) {
        await updateSliders(id, payload);
      } else {
        await createSliders(payload);
      }
      toast.success(`Sliders ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/sliders');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} sliders record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Sliders' : 'Create Sliders'}
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

            {/* Subtitle Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Subtitle (English)"
                  {...register('subTitle', { required: 'Subtitle (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.subTitle}
                  helperText={errors.subTitle?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Subtitle (Pashto)"
                  {...register('subTitle_pashto', { required: 'Subtitle (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.subTitle_pashto}
                  helperText={errors.subTitle_pashto?.message}
                />
              </Grid>
                <Grid item xs={4}>
                <TextField
                  label="Subtitle (Dari)"
                  {...register('subTitle_dari', { required: 'Subtitle (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.subTitle_dari}
                  helperText={errors.subTitle_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Description Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Description (English)"
                  {...register('description', { required: 'Description (English) is required' })}
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
                  {...register('description_pashto', { required: 'Description (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.description_pashto}
                  helperText={errors.description_pashto?.message}
                />
              </Grid>
            </Grid>

              <Grid item lg={12} md={12}  sm={12} xs={6}>
                <TextField
                  label="Description (Dari)"
                  {...register('description_dari', { required: 'Description (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.description_dari}
                  helperText={errors.description_dari?.message}
                />
              </Grid>

            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Samll subtitle (English)"
                  {...register('smallSubTitle', { required: 'Samll subtitle (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.smallSubTitle}
                  helperText={errors.smallSubTitle?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Samll subtitle (Pashto)"
                  {...register('smallSubTitle_pashto', { required: 'Samll subtitle (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.smallSubTitle_pashto}
                  helperText={errors.smallSubTitle_pashto?.message}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Samll subtitle (Dari)"
                  {...register('smallSubTitle_dari', { required: 'Samll subtitle (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.smallSubTitle_dari}
                  helperText={errors.smallSubTitle_dari?.message}
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
               <FileUpload
                              control={control}
                              name="photo"
                              title={isEdit ? 'Update Image' : 'Upload Image'}
                              isEdit={isEdit}
                              isSubmitting={isSubmitting}
                              handleFileChange={(e, onChange) => {
                                const photo = e.target.files[0] || e.dataTransfer.files[0];
                                if (photo) onChange(photo);
                              }}
                               existingImage={isEdit ? slidersData?.logoPath : null} // Pass existing icon path
                                video={true} // Enable video uploads
                            />
            </Grid>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Sliders' : 'Create Sliders'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/sliders')}
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

export default SlidersForm;