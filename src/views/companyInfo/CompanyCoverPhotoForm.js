// src/components/CompanyCoverPhotoForm.js
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
import useCompanyInfoStore from '../../context/companyInfoStore';

const CompanyCoverPhotoForm = () => {
  const { id } = useParams(); // Get company ID from URL
  const navigate = useNavigate();
  const { getCompanyInfo, updateCompanyCoverPhoto } = useCompanyInfoStore();
  const [companyData, setCompanyData] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {  isSubmitting },
  } = useForm({
    defaultValues: {
      file: null, // Stores File object for cover photo
    },
  });

  // Fetch company data to pre-populate existing cover photo
  useEffect(() => {
    if (id) {
      const fetchCompanyData = async () => {
        try {
          const company = await getCompanyInfo(id);
          if (company) {
            setCompanyData(company);
            if (company.coverPhoto) {
              const coverPhotoFile = await urlToFileObject(company.coverPhoto, 'cover-photo');
              setValue('file', coverPhotoFile); // Set existing cover photo as file object
            }
          } else {
            toast.error('Company record not found.');
            navigate('/companyInfo');
          }
        } catch (error) {
          toast.error('Failed to fetch company data.');
          navigate('/companyInfo');
        }
      };
      fetchCompanyData();
    } else {
      toast.error('Company ID is required.');
      navigate('/companyInfo');
    }
  }, [id, getCompanyInfo, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (!data.file) {
        toast.error('Please upload a cover photo.');
        return;
      }
      await updateCompanyCoverPhoto(id, data.file);
      toast.success('Company cover photo updated successfully.');
      navigate('/companyInfo');
    } catch (error) {
      toast.error('Failed to update company cover photo.');
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 600 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Update Company Cover Photo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* File Upload for Cover Photo */}
            <FileUpload
              control={control}
              name="file"
              title="Upload Company Cover Photo"
              isEdit={true}
              isSubmitting={isSubmitting}
              handleFileChange={(e, onChange) => {
                const file = e.target.files[0] || e.dataTransfer.files[0];
                if (file) onChange(file);
              }}
              existingImage={companyData?.coverPhoto || null} // Pass existing cover photo path
            />

            {/* Form Actions */}
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Update Cover Photo'}
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

export default CompanyCoverPhotoForm;