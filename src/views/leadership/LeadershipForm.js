// src/components/LeadershipForm.js
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
import useLeadershipStore from '../../context/leadershipStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';

const LeadershipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createLeadership, updateLeadership, getLeadership } = useLeadershipStore();
  const isEdit = !!id;
const [leadershipData, setLeadershipData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      fullName_pashto: '',
      fullName_dari: '',
      job: '',
      job_pashto: '',
      job_dari: '',
      description: '',
      description_pashto: '',
      description_dari: '',
      isActive: true,
      file: null, // Stores File object
    },
  });

  // Fetch leadership data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchLeadershipData = async () => {
        try {
          const leadership = await getLeadership(id);
          if (leadership) {
            setLeadershipData(leadershipData);
            setValue('fullName', leadership.fullName || '');
            setValue('fullName_pashto', leadership.fullName_pashto || '');
            setValue('fullName_dari', leadership.fullName_dari || '');
            setValue('job', leadership.job || '');
            setValue('job_pashto', leadership.job_pashto || '');
            setValue('job_dari', leadership.job_dari || '');
            setValue('description', leadership.description || '');
            setValue('description_pashto', leadership.description_pashto || '');
            setValue('description_dari', leadership.description_dari || '');
            setValue('isActive', !!leadership.isActive); // Ensure boolean
             const logoFile = await urlToFileObject(leadership.photoPath, 'logo');
                    setValue('file', logoFile); // Set single file object
            // Note: 'file' is not pre-populated; user must re-upload
          } else {
            toast.error('Leadership record not found.');
            navigate('/leadership');
          }
        } catch (error) {
          toast.error('Failed to fetch leadership data.');
          navigate('/leadership');
        }
      };
      fetchLeadershipData();
    }
  }, [id, isEdit, getLeadership, navigate, setValue, leadershipData]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Validate file for create mode
      if (!isEdit && !data.file) {
        toast.error('Please upload an image.');
        return;
      }
      const payload = {
        fullName: data.fullName,
        fullName_pashto: data.fullName_pashto,
        fullName_dari: data.fullName_dari,
        job: data.job,
        job_pashto: data.job_pashto,
        job_dari: data.job_dari,
        description: data.description,
        description_pashto: data.description_pashto,
        description_dari: data.description_dari,
        isActive: data.isActive,
        file: data.file, // File object (binary)
      };
      if (isEdit) {
        await updateLeadership(id, payload);
      } else {
        await createLeadership(payload);
      }
      toast.success(`Leadership ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/leadership');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} leadership record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Leadership' : 'Create Leadership'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Full Name Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Full Name (English)"
                  {...register('fullName', { required: 'Full Name (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Full Name (Pashto)"
                  {...register('fullName_pashto', { required: 'Full Name (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.fullName_pashto}
                  helperText={errors.fullName_pashto?.message}
                />
              </Grid>
                   <Grid item xs={4}>
                <TextField
                  label="Full Name (Dari)"
                  {...register('fullName_dari', { required: 'Full Name (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.fullName_dari}
                  helperText={errors.fullName_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Job Fields */}
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Job (English)"
                  {...register('job', { required: 'Job (English) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.job}
                  helperText={errors.job?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Job (Pashto)"
                  {...register('job_pashto', { required: 'Job (Pashto) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.job_pashto}
                  helperText={errors.job_pashto?.message}
                />
              </Grid>
                <Grid item xs={4}>
                <TextField
                  label="Job (Dari)"
                  {...register('job_dari', { required: 'Job (Dari) is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.job_dari}
                  helperText={errors.job_dari?.message}
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
            <Grid container lg={12} md={12}  sm={12} spacing={2}>
              <Grid item xs={6}>
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
                              name="file"
                              title={isEdit ? 'Update Image' : 'Upload Image'}
                              isEdit={isEdit}
                              isSubmitting={isSubmitting}
                              handleFileChange={(e, onChange) => {
                                const file = e.target.files[0] || e.dataTransfer.files[0];
                                if (file) onChange(file);
                              }}
                               existingImage={isEdit ? leadershipData?.logoPath : null} // Pass existing icon path
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
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Leadership' : 'Create Leadership'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/leadership')}
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

export default LeadershipForm;