// src/components/PartnershipForm.js
import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Card,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import usePartnershipStore from '../../context/partnershipStore';
import FileUpload from '../../components/FileUpload';
import { urlToFileObject } from '../../utils/fileUtils';

const PartnershipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createPartnership, updatePartnership, getPartnership } = usePartnershipStore();
  const isEdit = !!id;
  const [partnershipData, setPartnershipData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      link: '',
      file: null, // Stores File object
    },
  });

  // Fetch partnership data for editing
  useEffect(() => {
    if (isEdit) {
      const fetchPartnershipData = async () => {
        try {
          const partnership = await getPartnership(id);
          if (partnership) {
            setPartnershipData(partnership);
            setValue('link', partnership.link || '');

              const logoFile = await urlToFileObject(partnership.logoPath, 'logo');
        setValue('file', logoFile); // Set single file object
            // Note: 'file' is not pre-populated; user must re-upload
          } else {
            toast.error('Partnership record not found.');
            navigate('/partnership');
          }
        } catch (error) {
          toast.error('Failed to fetch partnership data.');
          navigate('/partnership');
        }
      };
      fetchPartnershipData();
    }
  }, [id, isEdit, getPartnership, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Validate file for create mode
      if (!isEdit && !data.file) {
        toast.error('Please upload an image.');
        return;
      }
      const payload = {
        link: data.link,
        file: data.file, // File object (binary)
      };
      if (isEdit) {
        await updatePartnership(id, payload);
      } else {
        await createPartnership(payload);
      }
      toast.success(`Partnership ${isEdit ? 'updated' : 'created'} successfully.`);
      navigate('/partnership');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} partnership record.`);
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 1200 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Partnership' : 'Create Partnership'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Full Name Fields */}
                <TextField
                  label="Link"
                  {...register('link', { required: 'Link is required' })}
                  fullWidth
                  disabled={isSubmitting}
                  error={!!errors.link}
                  helperText={errors.link?.message}
                />

            {/* File Upload and IsActive */}
         <FileUpload
                  control={control}
                  name="file"
                  title={isEdit ? 'Update Logo' : 'Upload Logo'}
                  isEdit={isEdit}
                  isSubmitting={isSubmitting}
                  handleFileChange={(e, onChange) => {
                    const file = e.target.files[0] || e.dataTransfer.files[0];
                    if (file) onChange(file);
                  }}
                   existingImage={isEdit ? partnershipData?.logoPath : null} // Pass existing icon path
                />

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Partnership' : 'Create Partnership'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/partnership')}
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

export default PartnershipForm;