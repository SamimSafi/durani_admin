import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  InputAdornment,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import useCompanyInfoStore from '../../context/companyInfoStore';

const CompanyInfoForm = () => {
  const { id } = useParams(); // Get CompanyInfo ID from URL for editing
  const navigate = useNavigate();
  const { createCompanyInfo, updateCompanyInfo, getCompanyInfo } =
    useCompanyInfoStore();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      name_pashto: '',
      name_Dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      openingHour: '',
      closingHour: '',
      facebook: '',
      twitter: '',
      instagram: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchCompanyInfoData = async () => {
        try {
          const companyInfo = await getCompanyInfo(id); // Call /project-categories/{id}
          if (companyInfo) {
            // Populate form fields using setValue
            setValue('name', companyInfo.name || '');
            setValue('name_pashto', companyInfo.name_pashto || '');
            setValue('name_Dari', companyInfo.name_Dari || '');
            setValue('description', companyInfo.description || '');
            setValue('description_pashto', companyInfo.description_pashto || '');
            setValue('description_dari', companyInfo.description_dari || '');
            setValue('openingHour', companyInfo.openingHour || '');
            setValue('closingHour', companyInfo.closingHour || '');
            setValue('facebook', companyInfo.facebook || '');
            setValue('twitter', companyInfo.twitter || '');
            setValue('instagram', companyInfo.instagram || '');
          } else {
            toast.error('Company Info not found.');
            navigate('/companyInfo');
          }
        } catch (error) {
          toast.error('Failed to fetch Company data.');
          navigate('/companyInfo');
        }
      };

      fetchCompanyInfoData();
    }
  }, [id, isEdit, getCompanyInfo, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateCompanyInfo(id, data); // Update CompanyInfo
      } else {
        await createCompanyInfo(data); // Create new CompanyInfo
      }
      toast.success(`Company Info ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/companyInfo');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} project.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Category' : 'Create Category'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Title Fields */}
            <Grid container lg={12} sm={12} md={12} spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name (English)"
                  {...register('name', { required: 'Name (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name (Pashto)"
                  {...register('name_pashto', { required: 'Name (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_pashto}
                  helperText={errors.name_pashto?.message}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name (Dari)"
                  {...register('name_Dari', { required: 'Name (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_Dari}
                  helperText={errors.name_Dari?.message}
                />
              </Grid>
            </Grid>

            {/* Description Fields */}
            <Grid container lg={12} sm={12} md={12} spacing={3}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  label="Description (Pashto)"
                  {...register('description_pashto', {
                    required: 'Description (Pashto) is required',
                  })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.description_pashto}
                  helperText={errors.description_pashto?.message}
                />
              </Grid>
              <Grid item xs={12}>
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
            </Grid>

            {/* Hours Fields */}
            <Grid container lg={12} sm={12} md={12} spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Opening Hour"
                  {...register('openingHour', { required: 'Opening hour is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.openingHour}
                  helperText={errors.openingHour?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TimeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Closing Hour"
                  {...register('closingHour', { required: 'Closing hour is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.closingHour}
                  helperText={errors.closingHour?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TimeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Social Media Fields */}
            <Grid container lg={12} sm={12} md={12} spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Facebook URL"
                  {...register('facebook')}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.facebook}
                  helperText={errors.facebook?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Twitter URL"
                  {...register('twitter')}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.twitter}
                  helperText={errors.twitter?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Instagram URL"
                  {...register('instagram')}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.instagram}
                  helperText={errors.instagram?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
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
                  ? 'Update Category'
                  : 'Create Category'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/companyInfo')}
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

export default CompanyInfoForm;