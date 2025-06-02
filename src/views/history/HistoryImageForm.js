// src/components/HistoryImageForm.js
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
import useHistoryStore from '../../context/historyStore';

const HistoryImageForm = () => {
  const { id } = useParams(); // Get history ID from URL
  const navigate = useNavigate();
  const { getHistory, updateHistoryImage } = useHistoryStore();
  const [historyData, setHistoryData] = useState(null);
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

  // Fetch history data to pre-populate existing image
  useEffect(() => {
    if (id) {
      const fetchHistoryData = async () => {
        try {
          const history = await getHistory(id);
          if (history) {
            setHistoryData(history);
            if (history.imagePath) {
              const imageFile = await urlToFileObject(history.imagePath, 'image');
              setValue('file', imageFile); // Set existing image as file object
            }
          } else {
            toast.error('History record not found.');
            navigate('/history');
          }
        } catch (error) {
          toast.error('Failed to fetch history data.');
          navigate('/history');
        }
      };
      fetchHistoryData();
    } else {
      toast.error('History ID is required.');
      navigate('/history');
    }
  }, [id, getHistory, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (!data.file) {
        toast.error('Please upload a image image.');
        return;
      }
      await updateHistoryImage(id, data.file);
      toast.success('History image updated successfully.');
      navigate('/history');
    } catch (error) {
      toast.error('Failed to update history image.');
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 600 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Update History Logo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* File Upload for Logo */}
            <FileUpload
              control={control}
              name="file"
              title="Upload History Logo"
              isEdit={true}
              isSubmitting={isSubmitting}
              handleFileChange={(e, onChange) => {
                const file = e.target.files[0] || e.dataTransfer.files[0];
                if (file) onChange(file);
              }}
              existingImage={historyData?.image || null} // Pass existing image path
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
                onClick={() => navigate('/history')}
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

export default HistoryImageForm;