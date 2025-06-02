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
import ImageDisplay from '../../components/ImageDisplay';
import { useEffect } from 'react';
import useProductCategoryStore from '../../context/productCategoryStore';

const ProductFormTable = ({
  Product,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const { ProductCategory, fetchProductCategory } = useProductCategoryStore();

  // Fetch projects to get category titles
  useEffect(() => {
    fetchProductCategory();
  }, [fetchProductCategory]);

  // Helper function to get category title by ID
  const getCategoryTitle = (categoryId) => {
    const category = ProductCategory.find((p) => p.id === categoryId);
    return category ? category.name : 'Unknown Category';
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
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Product.map((product) => (
            <TableRow
              key={product.id}
              selected={selected.includes(product.id)}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{getCategoryTitle(product.categoryId)}</TableCell>
              <TableCell>
                <ImageDisplay
                  path={product.image}
                  alt={product.name}
                  fallbackText="No Image"
                />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/product/edit/${product.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(product.id)}
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

export default ProductFormTable;