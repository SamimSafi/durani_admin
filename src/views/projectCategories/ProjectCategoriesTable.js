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
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProjectCategoriesTable = ({
  ProjectCategories,
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
                name
              </TableSortLabel>
            </TableCell>
            <TableCell>name Pashto</TableCell>
            <TableCell>name Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ProjectCategories.map((ProjectCategories) => (
            <TableRow
              key={ProjectCategories.id}
              selected={selected.includes(ProjectCategories.id)}
            >
              <TableCell>{ProjectCategories.name}</TableCell>
              <TableCell>{ProjectCategories.name_pashto}</TableCell>
              <TableCell>{ProjectCategories.name_dari}</TableCell>
              <TableCell>{ProjectCategories.description}</TableCell>
              <TableCell>{ProjectCategories.description_pashto}</TableCell>
              <TableCell>{ProjectCategories.description_dari}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/projectCategories/edit/${ProjectCategories.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(ProjectCategories.id)}
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

export default ProjectCategoriesTable;