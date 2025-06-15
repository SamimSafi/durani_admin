// src/components/SloganImageForm.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Card,
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';
import useSloganStore from '../../context/sloganStore';

const SloganImageForm = () => {
  const { id } = useParams(); // Get slogan ID from URL
  const navigate = useNavigate();
  const { getSlogan, updateSloganImage } = useSloganStore();
  const [sloganData, setSloganData] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      file: null, // Stores File object for image
    },
  });

  // Fetch slogan data to pre-populate existing image
  useEffect(() => {
    if (id) {
      const fetchSloganData = async () => {
        try {
          const slogan = await getSlogan(id);
          if (slogan) {
            setSloganData(slogan);
            if (slogan.imagePath) {
              const imageFile = await urlToFileObject(slogan.imagePath, 'image');
              setValue('file', imageFile); // Set existing image as file object
            }
          } else {
            toast.error('Slogan record not found.');
            navigate('/slogan');
          }
        } catch (error) {
          toast.error('Failed to fetch slogan data.');
          navigate('/slogan');
        }
      };
      fetchSloganData();
    } else {
      toast.error('Slogan ID is required.');
      navigate('/slogan');
    }
  }, [id, getSlogan, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (!data.file) {
        toast.error('Please upload a image image.');
        return;
      }
      await updateSloganImage(id, data.file);
      toast.success('Slogan image updated successfully.');
      navigate('/slogan');
    } catch (error) {
      toast.error('Failed to update slogan image.');
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 600 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Update Slogan Logo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* File Upload for Logo */}
            <FileUpload
              control={control}
              name="file"
              title="Upload Slogan Logo"
              isEdit={true}
              isSubmitting={isSubmitting}
              handleFileChange={(e, onChange) => {
                const file = e.target.files[0] || e.dataTransfer.files[0];
                if (file) onChange(file);
              }}
              existingImage={sloganData?.image || null} // Pass existing image path
            />

            {/*      {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Update Logo'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/slogan')}
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

export default SloganImageForm;