import { useState, useEffect } from 'react';
import {
  Typography,
  styled,
  Modal,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { baseURL } from '../api/baseURL';

// Define styled img component for consistent thumbnail styling
const StyledImage = styled('img')({
  maxWidth: '50px',
  maxHeight: '50px',
  objectFit: 'cover',
  borderRadius: '4px',
  cursor: 'pointer',
});

// Define styled video component for thumbnail
const StyledVideo = styled('video')({
  maxWidth: '50px',
  maxHeight: '50px',
  objectFit: 'cover',
  borderRadius: '4px',
  cursor: 'pointer',
});

// Styled img for the modal (larger image)
const ModalImage = styled('img')({
  maxWidth: '90%',
  maxHeight: '80vh',
  objectFit: 'contain',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
});

// Styled video for the modal (larger video)
const ModalVideo = styled('video')({
  maxWidth: '90%',
  maxHeight: '80vh',
  objectFit: 'contain',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
});

// Styled modal container
const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: theme.spacing(2),
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: '95vw',
  maxHeight: '95vh',
  overflow: 'auto',
}));

// Close button styling
const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[800],
}));

const ImageDisplay = ({
  path, // Media path (e.g., Services.photoPath or video path)
  alt = 'Media', // Alt text for accessibility
  fallbackText = 'No media available', // Text to display if no media
  className, // Optional className for additional styling
  ...mediaProps // Additional props to pass to the img or video element
}) => {
  const [hasError, setHasError] = useState(false);
  const [open, setOpen] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  // Construct full media URL
  const fullPath = path
    ? typeof path === 'string'
      ? `${baseURL}${path.replace(/\\/g, '/')}`
      : URL.createObjectURL(path) // Handle File/Blob objects
    : null;

  // Determine if the media is a video
  useEffect(() => {
    const determineMediaType = async () => {
      if (!path) {
        setIsVideo(false);
        return;
      }

      if (typeof path !== 'string') {
        // Handle File or Blob objects
        setIsVideo(path.type?.startsWith('video/') || false);
        return;
      }

      // Check file extension for string paths
      if (/\.(mp4|webm|ogg|mov|mkv)$/i.test(path)) {
        setIsVideo(true);
        return;
      }

      // If no extension, attempt to fetch headers to determine MIME type
      try {
        const response = await fetch(fullPath, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        setIsVideo(contentType?.startsWith('video/') || false);
      } catch (error) {
        console.error('Error checking media type:', error);
        setIsVideo(false);
      }
    };

    determineMediaType();
  }, [path, fullPath]);

  // Clean up object URLs for File/Blob
  useEffect(() => {
    return () => {
      if (fullPath && fullPath.startsWith('blob:')) {
        URL.revokeObjectURL(fullPath);
      }
    };
  }, [fullPath]);

  const handleError = (e) => {
    console.error(`${isVideo ? 'Video' : 'Image'} load error:`, path);
    setHasError(true);
    e.target.style.display = 'none';
  };

  const handleMediaClick = () => {
    if (fullPath && !hasError) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {fullPath && !hasError ? (
        isVideo ? (
          <StyledVideo
            src={fullPath}
            onError={handleError}
            onClick={handleMediaClick}
            className={className}
            muted // Mute for thumbnail to avoid autoplay issues
            {...mediaProps}
          />
        ) : (
          <StyledImage
            src={fullPath}
            alt={alt}
            onError={handleError}
            onClick={handleMediaClick}
            className={className}
            {...mediaProps}
          />
        )
      ) : (
        <Typography variant="caption">{fallbackText}</Typography>
      )}

      {/* Modal for enlarged media view */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="media-viewer-modal"
        aria-describedby="View enlarged media"
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <ModalContainer>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          {isVideo ? (
            <ModalVideo
              src={fullPath}
              controls
              autoPlay
              onError={handleError}
              {...mediaProps}
            />
          ) : (
            <ModalImage
              src={fullPath}
              alt={alt}
              onError={handleError}
              {...mediaProps}
            />
          )}
        </ModalContainer>
      </Modal>
    </>
  );
};

export default ImageDisplay;