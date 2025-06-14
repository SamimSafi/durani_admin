// src/components/ContentForm.js
import { useEffect, useState } from 'react';
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import useContentStore from '../../context/contentStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';

const ContentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createContent, updateContent, getContent } = useContentStore();
  const isEdit = !!id;
  const [contentData, setContentData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: '',
      title: '',
      title_pashto: '',
      title_dari: '',
      content: '',
      content_pashto: '',
      content_dari: '',
      fileUrl: '',
      priority: 0,
      imagefile: null,
    },
  });

  // Fetch content data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchContentData = async () => {
        try {
          const content = await getContent(id);
          if (content) {
            setContentData(content);
            setValue('category', content.category || '');
            setValue('title', content.title || '');
            setValue('title_pashto', content.title_pashto || '');
            setValue('title_dari', content.title_dari || '');
            setValue('content', content.content || '');
            setValue('content_pashto', content.content_pashto || '');
            setValue('content_dari', content.content_dari || '');
            setValue('fileUrl', content.fileUrl || '');
            setValue('priority', content.priority || 0);
            if (content.image) {
              const file = await urlToFileObject(content.image, 'imagefile');
              setValue('imagefile', file);
            }
          } else {
            toast.error('Content record not found.');
            navigate('/content');
          }
        } catch (error) {
          toast.error('Failed to fetch content data.');
          navigate('/content');
        }
      };
      fetchContentData();
    }
  }, [id, isEdit, getContent, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Prepare the payload
      const payload = {
        category: data.category,
        title: data.title,
        title_pashto: data.title_pashto,
        title_dari: data.title_dari,
        content: data.content || '', // Send empty string if not provided
        content_pashto: data.content_pashto || '', // Send empty string if not provided
        content_dari: data.content_dari || '', // Send empty string if not provided
        fileUrl: data.fileUrl || '', // Send empty string if not provided
        priority: Number(data.priority), // Ensure number
        imagefile: data.imagefile || null, // Send file or null
      };

      if (isEdit) {
        await updateContent(id, payload);
      } else {
        await createContent(payload);
      }
      toast.success(`Content ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/content');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} content record.`);
    }
  };

  // Category options
  const categoryOptions = [
    { value: 'ANNOUNCEMENTS', label: 'ANNOUNCEMENTS' },
    { value: 'AWARDS', label: 'AWARDS' },
    { value: 'SUSTAINABILITY', label: 'SUSTAINABILITY' },
    { value: 'NEWS', label: 'NEWS' },
    { value: 'ORGANIZATION_CHART', label: 'ORGANIZATION_CHART' },
  ];

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Content' : 'Create Content'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Category */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Category"
                        disabled={isSubmitting}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {categoryOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <Typography color="error" variant="caption">
                      {errors.category.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Title */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Title"
                  {...register('title', {
                    required:
                      contentData?.category === 'NEWS' || !isEdit
                        ? 'Title is required'
                        : false,
                  })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Title Pashto"
                  {...register('title_pashto', {
                    required:
                      contentData?.category === 'NEWS' || !isEdit
                        ? 'Title Pashto is required'
                        : false,
                  })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title_pashto}
                  helperText={errors.title_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Title Dari"
                  {...register('title_dari', {
                    required:
                      contentData?.category === 'NEWS' || !isEdit
                        ? 'Title Dari is required'
                        : false,
                  })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.title_dari}
                  helperText={errors.title_dari?.message}
                />
              </Grid>
            </Grid>

            {/* Content */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Content"
                  {...register('content')}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Content Pashto"
                  {...register('content_pashto')}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.content_pashto}
                  helperText={errors.content_pashto?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Content Dari"
                  {...register('content_dari')}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={!!errors.content_dari}
                  helperText={errors.content_dari?.message}
                />
              </Grid>
            </Grid>

            {/* File URL */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="File URL"
                  {...register('fileUrl')}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.fileUrl}
                  helperText={errors.fileUrl?.message}
                />
              </Grid>
            </Grid>

            {/* Priority */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Priority"
                  type="number"
                  {...register('priority', {
                    required: 'Priority is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Priority must be 0 or greater' },
                  })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.priority}
                  helperText={errors.priority?.message}
                />
              </Grid>
            </Grid>

            {/* Image File Upload */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FileUpload
                  control={control}
                  name="imagefile"
                  title={isEdit ? 'Update Image' : 'Upload Image'}
                  isEdit={isEdit}
                  isSubmitting={isSubmitting}
                  handleFileChange={(e, onChange) => {
                    const file = e.target.files[0] || e.dataTransfer.files[0];
                    if (file) onChange(file);
                  }}
                  existingImage={isEdit ? contentData?.imagefile : null}
                />
              </Grid>
            </Grid>

            {/* Form Actions */}
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
                onClick={() => navigate('/content')}
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

export default ContentForm;