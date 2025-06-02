// src/components/TeamImageForm.js
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
import useTeamStore from '../../context/teamStore';

const TeamImageForm = () => {
  const { id } = useParams(); // Get team ID from URL
  const navigate = useNavigate();
  const { getTeam, updateTeamImage } = useTeamStore();
  const [teamData, setTeamData] = useState(null);
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

  // Fetch team data to pre-populate existing image
  useEffect(() => {
    if (id) {
      const fetchTeamData = async () => {
        try {
          const team = await getTeam(id);
          if (team) {
            setTeamData(team);
            if (team.image) {
              const imageFile = await urlToFileObject(team.image, 'image');
              setValue('file', imageFile); // Set existing image as file object
            }
          } else {
            toast.error('Team record not found.');
            navigate('/team');
          }
        } catch (error) {
          toast.error('Failed to fetch team data.');
          navigate('/team');
        }
      };
      fetchTeamData();
    } else {
      toast.error('Team ID is required.');
      navigate('/team');
    }
  }, [id, getTeam, navigate, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (!data.file) {
        toast.error('Please upload a image image.');
        return;
      }
      await updateTeamImage(id, data.file);
      toast.success('Team image updated successfully.');
      navigate('/team');
    } catch (error) {
      toast.error('Failed to update team image.');
    }
  };

  return (
    <Card sx={{ p: 3, width: '100%', mx: 'auto', maxWidth: 600 }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Update Team Logo
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* File Upload for Logo */}
            <FileUpload
              control={control}
              name="file"
              title="Upload Team Logo"
              isEdit={true}
              isSubmitting={isSubmitting}
              handleFileChange={(e, onChange) => {
                const file = e.target.files[0] || e.dataTransfer.files[0];
                if (file) onChange(file);
              }}
              existingImage={teamData?.image || null} // Pass existing image path
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

export default TeamImageForm;