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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import useTeamStore from '../../context/teamStore';

const TeamForm = () => {
  const { id } = useParams(); // Get Team ID from URL for editing
  const navigate = useNavigate();
  const { createTeam, updateTeam, getTeam } = useTeamStore();
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
      name_dari: '',
      jobTitle: '',
      jobTitle_pashto: '',
      jobTitle_dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedIn: '',
      priority: 1,
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEdit) {
      const fetchTeamData = async () => {
        try {
          const team = await getTeam(id); // Call /project-categories/{id}
          if (team) {
            // Populate form fields using setValue
            setValue('name', team.name || '');
            setValue('name_pashto', team.name_pashto || '');
            setValue('name_dari', team.name_dari || '');
            setValue('jobTitle', team.jobTitle || '');
            setValue('jobTitle_pashto', team.jobTitle_pashto || '');
            setValue('jobTitle_dari', team.jobTitle_dari || '');
            setValue('description', team.description || '');
            setValue('description_pashto', team.description_pashto || '');
            setValue('description_dari', team.description_dari || '');
            setValue('facebook', team.facebook || '');
            setValue('twitter', team.twitter || '');
            setValue('instagram', team.instagram || '');
            setValue('linkedIn', team.linkedIn || '');
            setValue('priority', team.priority || '');
            setValue('isActive', team.isActive ?? true);
          } else {
            toast.error('Team member not found.');
            navigate('/team');
          }
        } catch (error) {
          toast.error('Failed to fetch team data.');
          navigate('/team');
        }
      };

      fetchTeamData();
    }
  }, [id, isEdit, getTeam, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateTeam(id, data); // Update Team
      } else {
        await createTeam(data); // Create new Team
      }
      toast.success(`Team member ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/team');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} team member.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Team Member' : 'Create Team Member'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Name Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
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
                  {...register('name_dari', { required: 'Name (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.name_dari}
                  helperText={errors.name_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Job Title Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Job Title (English)"
                  {...register('jobTitle', { required: 'Job Title (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle?.message}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Job Title (Pashto)"
                  {...register('jobTitle_pashto', { required: 'Job Title (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.jobTitle_pashto}
                  helperText={errors.jobTitle_pashto?.message}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Job Title (Dari)"
                  {...register('jobTitle_dari', { required: 'Job Title (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.jobTitle_dari}
                  helperText={errors.jobTitle_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Description Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
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

            {/* Social Media Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={3}>
              <Grid item xs={12} sm={3}>
                <TextField
                        label="Facebook URL"
                        {...register('facebook', {
                          validate: (value) =>
                            !value || /^https?:\/\/(www\.)?facebook\.com(\/.*)?$/i.test(value) ||
                            'Must be a valid Facebook URL',
                        })}
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
              <Grid item xs={12} sm={3}>
                      <TextField
                            label="Twitter URL"
                            {...register('twitter', {
                              validate: (value) =>
                                !value || /^https?:\/\/(www\.)?twitter\.com(\/.*)?$/i.test(value) ||
                                'Must be a valid Twitter URL',
                            })}
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
              <Grid item xs={12} sm={3}>
                      <TextField
                          label="Instagram URL"
                          {...register('instagram', {
                            validate: (value) =>
                              !value || /^https?:\/\/(www\.)?instagram\.com(\/.*)?$/i.test(value) ||
                              'Must be a valid Instagram URL',
                          })}
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
              <Grid item xs={12} sm={3}>
                 <TextField
                    label="LinkedIn URL"
                    {...register('linkedIn', {
                      validate: (value) =>
                        !value || /^https?:\/\/(www\.)?linkedin\.com(\/.*)?$/i.test(value) ||
                        'Must be a valid LinkedIn URL',
                    })}
                    fullWidth
                    disabled={isSubmitting}
                    error={!!errors.linkedIn}
                    helperText={errors.linkedIn?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
              </Grid>
            </Grid>
            
             <Grid container lg={12} md={12}  sm={12} spacing={3}>


                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      label="Priority Level"
                      {...register('priority')}
                      fullWidth
                      disabled={isSubmitting}
                      error={!!errors.priority}
                      helperText={errors.priority?.message}
                      type='number'
                    />
                  </Grid>

                     {/* Status Field */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('isActive')}
                      defaultChecked={true}
                      disabled={isSubmitting}
                    />
                  }
                  label="Active"
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
                  ? 'Update Team Member'
                  : 'Create Team Member'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/team')}
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

export default TeamForm;