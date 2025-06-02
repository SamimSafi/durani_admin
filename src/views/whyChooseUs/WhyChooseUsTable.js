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
import useWhyChooseUsStore from '../../context/whyChooseUsStore';

const WhyChooseUsTable = ({
  WhyChooseUs,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const { activateWhyChooseUs, deactivateWhyChooseUs } = useWhyChooseUsStore();

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
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Project ID</TableCell>
            <TableCell>Video Link</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {WhyChooseUs.map((chooseUs) => (
            <TableRow
              key={chooseUs.id}
              selected={selected.includes(chooseUs.id)}
            >
              <TableCell>{chooseUs.title}</TableCell>
              <TableCell>{chooseUs.title_pashto}</TableCell>
              <TableCell>{chooseUs.title_dari}</TableCell>
              <TableCell>{chooseUs.description}</TableCell>
              <TableCell>{chooseUs.description_pashto}</TableCell>
              <TableCell>{chooseUs.description_dari}</TableCell>
              <TableCell>
                {chooseUs.video_link ? (
                  <a
                    href={chooseUs.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'underline' }}
                  >
                    {chooseUs.video_link}
                  </a>
                ) : (
                  'No Video'
                )}
              </TableCell>
              <TableCell>
                {chooseUs.isActive ? (
                  <span
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Active
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Inactive
                  </span>
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/whyChooseUs/edit/${chooseUs.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(chooseUs.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
                {chooseUs.isActive ? (
                  <IconButton
                    onClick={() => deactivateWhyChooseUs(chooseUs.id)}
                    color="warning"
                  >
                    <Cancel />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => activateWhyChooseUs(chooseUs.id)}
                    color="success"
                  >
                    <CheckCircle />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WhyChooseUsTable;