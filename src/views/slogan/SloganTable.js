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
import { Delete, Edit, Image  } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ImageDisplay from '../../components/ImageDisplay';

const SloganTable = ({
  Slogan,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
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
                Page Name
              </TableSortLabel>
            </TableCell>
            <TableCell>content</TableCell>
            <TableCell>content dari</TableCell>
            <TableCell>content pashto</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Slogan.map((Slogan) => (
            <TableRow
              key={Slogan.id}
              selected={selected.includes(Slogan.id)}
            >
              <TableCell>{Slogan.pageName}</TableCell>
              <TableCell>{Slogan.content}</TableCell>
              <TableCell>{Slogan.content_dari}</TableCell>
              <TableCell>{Slogan.content_pashto}</TableCell>
              <TableCell> 
                        <ImageDisplay
                          path={Slogan.image}
                          alt={Slogan.title}
                          fallbackText="No Image"
                        />
                </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/slogan/edit/${Slogan.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Slogan.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
                 <IconButton
                    onClick={() => navigate(`/slogan/${Slogan.id}/image`)}
                    color="secondary"
                  >
                    <Image />
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SloganTable;