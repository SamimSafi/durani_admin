/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableSortLabel,
} from '@mui/material';
import { Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from '../../components/ImageDisplay';

const ContentFormTable = ({
  Content,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();

  // Category labels for display
  const categoryLabels = {
    CEO_MESSAGE: 'CEO Message',
    VICE_PRESIDENT_MESSAGE: 'Vice President Message',
    VISION: 'Vision',
    MISSION: 'Mission',
    MARKET_PRESENCE: 'Market Presence',
    STRATEGY: 'Strategy',
    SUSTAINABILITY: 'Sustainability',
    NEWS: 'News',
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active
                direction={sortOrder}
                onClick={handleSort}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>File URL</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Content.map((content) => (
            <TableRow
              key={content.id}
              selected={selected.includes(content.id)}
            >
              <TableCell>{content.title || '-'}</TableCell>
              <TableCell>{categoryLabels[content.category] || content.category || '-'}</TableCell>
              <TableCell>{content.content || '-'}</TableCell>
              <TableCell>{content.fileUrl || '-'}</TableCell>
              <TableCell>{content.priority || 0}</TableCell>
              <TableCell>
                <ImageDisplay
                  path={content.image}
                  alt={content.title || 'Content Image'}
                  fallbackText="No image"
                />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/content/edit/${content.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(content.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContentFormTable;