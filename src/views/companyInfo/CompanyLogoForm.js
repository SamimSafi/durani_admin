// src/components/CompanyLogoForm.js
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

const CompanyLogoForm = () => {
  const { id } = useParams(); // Get company ID from URL
  const navigate = useNavigate();
  const { getCompanyInfo, updateCompanyLogo } = useCompanyInfoStore();
  const [companyData, setCompanyData] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      file: null, // Stores File object for logo
    },
  });

  // Fetch company data to pre-populate existing logo
  useEffect(() => {
    if (id) {
      const fetchCompanyData = async () => {
        try {
          const company = await getCompanyInfo(id);
          if (company) {
            setCompanyData(company);
            if (company.logo) {
              const logoFile = await urlToFileObject(company.logo, 'logo');
              setValue('file', logoFile); // Set existing logo as file object
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
      navigate('/company-info');
    }
  }, [id, getCompanyInfo, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (!data.file) {
        toast.error('Please upload a logo image.');
        return;
      }
      await updateCompanyLogo(id, data.file);
      toast.success('Company logo updated successfully.');
      navigate('/company-info');
    } catch (error) {
      toast.error('Failed to update company logo.');
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 600 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Update Company Logo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* File Upload for Logo */}
            <FileUpload
              control={control}
              name="file"
              title="Upload Company Logo"
              isEdit={true}
              isSubmitting={isSubmitting}
              handleFileChange={(e, onChange) => {
                const file = e.target.files[0] || e.dataTransfer.files[0];
                if (file) onChange(file);
              }}
              existingImage={companyData?.logo || null} // Pass existing logo path
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
                onClick={() => navigate('/company-info')}
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

export default CompanyLogoForm;