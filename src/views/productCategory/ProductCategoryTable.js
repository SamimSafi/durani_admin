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
import { DescriptionComponent } from '../utilities/dateUtils';

const ProductCategoryTable = ({
  ProductCategory,
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
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ProductCategory.map((ProductCategory) => (
            <TableRow
              key={ProductCategory.id}
              selected={selected.includes(ProductCategory.id)}
            >
              <TableCell>{ProductCategory.name}</TableCell>
              <TableCell><DescriptionComponent description={ProductCategory.description} maxLength={60} /></TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/productCategory/edit/${ProductCategory.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(ProductCategory.id)}
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

export default ProductCategoryTable;