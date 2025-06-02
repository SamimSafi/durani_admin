import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  TablePagination,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ProjectCategoriesTable from './ProjectCategoriesTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useDebounce from '../../hooks/useDebounce';
import useProjectCategoriesStore from '../../context/projectCategoriesStore';
import projectCategoriesService from '../../services/projectCategoriesService';

const ProjectCategoriesList = () => {
  const { ProjectCategories, loading, hasMore, deleteProjectCategories, fetchProjectCategories } = useProjectCategoriesStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredProjectCategories, setFilteredProjectCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchProjectCategories({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
  }, [fetchProjectCategories, page, rowsPerPage, debouncedSearch]);

  useEffect(() => {
    let result = ProjectCategories;
    result = projectCategoriesService.sortProjectCategories(result, sortOrder);
    setFilteredProjectCategories(result);
  }, [ProjectCategories, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filteredProjectCategories.map((ProjectCategories) => ProjectCategories.id));
    } else {
      setSelected([]);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };


  const confirmDelete = async () => {
    try {
      await deleteProjectCategories(deleteId);
      fetchProjectCategories({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
    } catch (error) {
      toast.error('Failed to delete Project Category.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ProjectCategories Management
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <TextField
            label="Search ProjectCategories"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ maxWidth: 400 }}
            placeholder="Enter search term"
          />
        </Box> */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/projectCategories/create')}
          >
            Create New Category
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ProjectCategoriesTable
            ProjectCategories={filteredProjectCategories}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredProjectCategories.length} // Disable total count display
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            nextIconButtonProps={{ disabled: !hasMore }}
          />
        </>
      )}
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message={deleteId ? 'Are you sure you want to delete this ProjectCategories?' : 'Are you sure you want to delete the selected ProjectCategoriess?'}
      />
    </Box>
  );
};

export default ProjectCategoriesList;