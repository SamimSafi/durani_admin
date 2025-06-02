import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  TablePagination,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ProjectSlidersTable from './ProjectSlidersTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useDebounce from '../../hooks/useDebounce';
import useProjectSlidersStore from '../../context/projectSlidersStore';
import projectSlidersService from '../../services/projectSlidersService';
import { AddCircleRounded } from '@mui/icons-material';

const ProjectSlidersList = () => {
  const { ProjectSliders, loading, hasMore, deleteProjectSliders, fetchProjectSliders } = useProjectSlidersStore();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredProjectSliders, setFilteredProjectSliders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchProjectSliders(projectId);
  }, [fetchProjectSliders, page, rowsPerPage, debouncedSearch, projectId]);

  useEffect(() => {
    let result = ProjectSliders;
    result = projectSlidersService.sortProjectSliders(result, sortOrder);
    setFilteredProjectSliders(result);
  }, [ProjectSliders, sortOrder]);

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
      setSelected(filteredProjectSliders.map((ProjectSliders) => ProjectSliders.id));
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
      await deleteProjectSliders(deleteId);
      fetchProjectSliders(projectId);
    } catch (error) {
      toast.error('Failed to delete ProjectSliders.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ProjectSliders Management
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
            label="Search ProjectSliders"
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
            onClick={() => navigate(`/projectSliders/create/${projectId}`)}
            startIcon={<AddCircleRounded />}
          >
            Create New ProjectSliders
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ProjectSlidersTable
            ProjectSliders={filteredProjectSliders}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredProjectSliders.length} // Disable total count display
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
        message={deleteId ? 'Are you sure you want to delete this ProjectSliders?' : 'Are you sure you want to delete the selected ProjectSliderss?'}
      />
    </Box>
  );
};

export default ProjectSlidersList;