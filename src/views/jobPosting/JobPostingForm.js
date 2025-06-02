/* eslint-disable react/prop-types */
import { useEffect } from 'react';
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
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import useJobPostingStore from '../../context/jobPostingStore';

const JobPostingForm = () => {
  const { id } = useParams(); // Get Job Posting ID from URL for editing
  const navigate = useNavigate();
  const { createJobPosting, updateJobPosting, getJobPosting } = useJobPostingStore();
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
      category: '',
      contractType: '',
      location: '',
      location_pashto: '',
      location_dari: '',
      salaryRange: '',
      applicationDeadline: '',
      requirements: '',
      requirements_pashto: '',
      requirements_dari: '',
      responsibilities: '',
      responsibilities_pashto: '',
      responsibilities_dari: '',
      vacancies: 0,
      // isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchJobPostingData = async () => {
        try {
          const jobPosting = await getJobPosting(id);
          if (jobPosting) {
            // Populate form fields using setValue
            setValue('title', jobPosting.title || '');
            setValue('title_pashto', jobPosting.title_pashto || '');
            setValue('title_dari', jobPosting.title_dari || '');
            setValue('description', jobPosting.description || '');
            setValue('description_pashto', jobPosting.description_pashto || '');
            setValue('description_dari', jobPosting.description_dari || '');
            setValue('category', jobPosting.category || 'Engineering');
            setValue('contractType', jobPosting.contractType || 'Contract');
            setValue('location', jobPosting.location || '');
            setValue('location_pashto', jobPosting.location_pashto || '');
            setValue('location_dari', jobPosting.location_dari || '');
            setValue('salaryRange', jobPosting.salaryRange || '');
            setValue('applicationDeadline', jobPosting.applicationDeadline ? jobPosting.applicationDeadline.slice(0, 16) : '');
            setValue('requirements', jobPosting.requirements || '');
            setValue('requirements_pashto', jobPosting.requirements_pashto || '');
            setValue('requirements_dari', jobPosting.requirements_dari || '');
            setValue('responsibilities', jobPosting.responsibilities || '');
            setValue('responsibilities_pashto', jobPosting.responsibilities_pashto || '');
            setValue('responsibilities_dari', jobPosting.responsibilities_dari || '');
            setValue('vacancies', jobPosting.vacancies || 0);
            // setValue('isActive', jobPosting.isActive || false);
          } else {
            toast.error('Job posting not found.');
            navigate('/jobposting');
          }
        } catch (error) {
          toast.error('Failed to fetch job posting data.');
          navigate('/jobposting');
        }
      };

      fetchJobPostingData();
    }
  }, [id, isEdit, getJobPosting, navigate, setValue]);

  const onSubmit = async (data) => {
        const formattedData = {
      ...data,
      applicationDeadline: new Date(data.applicationDeadline).toISOString(),
      vacancies: Number(data.vacancies), // Convert vacancies to number
    };

    try {
      if (isEdit) {
        await updateJobPosting(id, formattedData); // Update Job Posting
      } else {
        await createJobPosting(formattedData); // Create new Job Posting
      }
      toast.success(`Job posting ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/jobposting');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} job posting.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Job Posting' : 'Create Job Posting'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Grid container lg={12} md={12} sm={12} spacing={3}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={6}>
               <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }} // Add validation
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Category"
                        disabled={isSubmitting}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ''}
                      >
                        <MenuItem value="IT">IT</MenuItem>
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Healthcare">Healthcare</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                        <MenuItem value="Design">Design</MenuItem>
                        <MenuItem value="Logistic">Logistic</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.contractType}>
                  <InputLabel>Contract Type</InputLabel>
                  <Controller
                    name="contractType"
                    control={control}
                    rules={{ required: 'Contract Type is required' }} // Add validation
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Contract Type"
                        disabled={isSubmitting}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ''}
                      >
                        <MenuItem value="Contract">Contract</MenuItem>
                        <MenuItem value="Permanant">Permanant</MenuItem>
                        <MenuItem value="Temporary">Temporary</MenuItem>
                        <MenuItem value="Internship">Internship</MenuItem>
                        <MenuItem value="Volunteer">Volunteer</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.contractType && <Typography color="error">{errors.contractType.message}</Typography>}
                </FormControl>


              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Location (English)"
                  {...register('location', { required: 'Location (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Location (Pashto)"
                  {...register('location_pashto', { required: 'Location (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.location_pashto}
                  helperText={errors.location_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Location (Dari)"
                  {...register('location_dari', { required: 'Location (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.location_dari}
                  helperText={errors.location_dari?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Salary Range"
                  {...register('salaryRange', { required: 'Salary Range is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.salaryRange}
                  helperText={errors.salaryRange?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Application Deadline"
                  type="datetime-local"
                  {...register('applicationDeadline', { required: 'Application Deadline is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.applicationDeadline}
                  helperText={errors.applicationDeadline?.message}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 1 }} // Allow seconds
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Requirements (English)"
                  {...register('requirements', { required: 'Requirements (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.requirements}
                  helperText={errors.requirements?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Requirements (Pashto)"
                  {...register('requirements_pashto', { required: 'Requirements (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.requirements_pashto}
                  helperText={errors.requirements_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Requirements (Dari)"
                  {...register('requirements_dari', { required: 'Requirements (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.requirements_dari}
                  helperText={errors.requirements_dari?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Responsibilities (English)"
                  {...register('responsibilities', { required: 'Responsibilities (English) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.responsibilities}
                  helperText={errors.responsibilities?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Responsibilities (Pashto)"
                  {...register('responsibilities_pashto', { required: 'Responsibilities (Pashto) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.responsibilities_pashto}
                  helperText={errors.responsibilities_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Responsibilities (Dari)"
                  {...register('responsibilities_dari', { required: 'Responsibilities (Dari) is required' })}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.responsibilities_dari}
                  helperText={errors.responsibilities_dari?.message}
                />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                    label="Vacancies"
                    type="number"
                    {...register('vacancies', {
                      required: 'Vacancies is required',
                      min: { value: 0, message: 'Vacancies cannot be negative' },
                    })}
                    fullWidth
                    disabled={isSubmitting}
                    error={!!errors.vacancies}
                    helperText={errors.vacancies?.message}
                  />
                </Grid>
              {/* <Grid item xs={6}>
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
              </Grid> */}
            </Grid>
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Job Posting' : 'Create Job Posting'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/jobposting')}
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

export default JobPostingForm;