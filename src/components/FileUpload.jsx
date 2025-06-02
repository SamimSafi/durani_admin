import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Typography, Paper, IconButton, Grid } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { baseURL } from '../api/baseURL';

const FileUpload = ({
  control,
  name,
  title,
  isEdit,
  isSubmitting,
  handleFileChange,
  existingImage,
  video = false, // Optional prop to enable video uploads
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [existingFile, setExistingFile] = useState(null);

  // Convert existing media URL to File object when component mounts
  useEffect(() => {
    const convertExistingMedia = async () => {
      if (existingImage && !(existingImage instanceof File)) {
        try {
          const response = await fetch(`${baseURL}${existingImage.replace(/\\/g, '/')}`);
          const blob = await response.blob();
          const fileName = existingImage.split('/').pop() || 'existing-media';
          const file = new File([blob], fileName, { type: blob.type });
          setExistingFile(file);
        } catch (error) {
          console.error('Error loading existing media:', error);
        }
      }
    };

    convertExistingMedia();
  }, [existingImage]);

  return (
    <Grid item lg={12} xs={12} sm={12} md={12}>
      <Controller
        name={name}
        control={control}
        rules={{ required: isEdit ? false : `${title} is required` }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          // Determine preview source and media type
          let previewSrc = null;
          let isVideo = false;

          if (value instanceof File) {
            // New file upload
            previewSrc = URL.createObjectURL(value);
            isVideo = value.type.startsWith('video/');
          } else if (existingFile) {
            // Existing file that we converted
            previewSrc = URL.createObjectURL(existingFile);
            isVideo = existingFile.type.startsWith('video/');
          }

          // Clean up blob URLs
          useEffect(() => {
            return () => {
              if (previewSrc && previewSrc.startsWith('blob:')) {
                URL.revokeObjectURL(previewSrc);
              }
            };
          }, [previewSrc]);

          const handleFileUpload = (e) => {
            const file = e.target.files[0] || e.dataTransfer.files[0];
            if (file) {
              // Validate file type if video prop is false
              if (!video && file.type.startsWith('video/')) {
                console.error('Video uploads are not allowed');
                return;
              }
              onChange(file); // This will replace the existing file
              setExistingFile(null); // Clear the existing file reference
              if (handleFileChange) handleFileChange(file);
            }
          };

          const handleRemove = () => {
            onChange(null);
            setExistingFile(null);
          };

          return (
            <Box sx={{ width: '100%' }}>
              <Paper
                elevation={dragOver ? 8 : 2}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: dragOver ? 'action.hover' : 'background.paper',
                  transition: 'all 0.3s ease',
                  border: error ? '1px solid' : '1px dashed',
                  borderColor: error ? 'error.main' : 'grey.400',
                  p: previewSrc ? 0 : 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: { xs: 150, sm: 200 },
                  width: '100%',
                  boxSizing: 'border-box',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFileUpload(e);
                }}
              >
                {previewSrc ? (
                  <Box sx={{ position: 'relative', width: '100%', height: { xs: 150, sm: 200 } }}>
                    {isVideo ? (
                      <video
                        src={previewSrc}
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: 8,
                          objectPosition: 'center',
                        }}
                        onError={(e) => {
                          console.error('Video load error:', previewSrc);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <img
                        src={previewSrc}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: 8,
                          objectPosition: 'center',
                        }}
                        onError={(e) => {
                          console.error('Image load error:', previewSrc);
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'error.main', color: 'white' },
                      }}
                      onClick={handleRemove}
                      disabled={isSubmitting}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      width: '100%',
                    }}
                    component="label"
                  >
                    <CloudUpload
                      sx={{
                        fontSize: { xs: 30, sm: 40 },
                        color: error ? 'error.main' : 'primary.main',
                      }}
                    />
                    <Typography
                      variant="body1"
                      color={error ? 'error.main' : 'text.primary'}
                      sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    >
                      Drag & drop or click to upload
                    </Typography>
                    <input
                      type="file"
                      accept={video ? 'image/*,video/*' : 'image/*'}
                      hidden
                      onChange={handleFileUpload}
                      disabled={isSubmitting}
                    />
                  </Box>
                )}
              </Paper>
              {error && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 1, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                >
                  {error.message}
                </Typography>
              )}
            </Box>
          );
        }}
      />
    </Grid>
  );
};

export default FileUpload;