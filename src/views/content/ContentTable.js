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
import { DescriptionComponent } from '../utilities/dateUtils';

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
    ANNOUNCEMENTS: 'ANNOUNCEMENTS',
    AWARDS: 'AWARDS',
    SUSTAINABILITY: 'SUSTAINABILITY',
    NEWS: 'NEWS',
    ORGANIZATION_CHART: 'ORGANIZATION_CHART',
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
            <TableCell>Title Pashto</TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Content Pashto</TableCell>
            <TableCell>Content Dari</TableCell>
            <TableCell>Category</TableCell>
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
              <TableCell>{content.title_pashto || '-'}</TableCell>
              <TableCell>{content.title_dari || '-'}</TableCell>
              <TableCell><DescriptionComponent description={content.content} maxLength={60} /> </TableCell>
              <TableCell><DescriptionComponent description={content.content_pashto} maxLength={60} /></TableCell>
              <TableCell><DescriptionComponent description={content.content_dari} maxLength={60} /></TableCell>
              <TableCell>{categoryLabels[content.category] || content.category || '-'}</TableCell>
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