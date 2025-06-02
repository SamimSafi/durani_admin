import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TablePagination,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import ProjectFinalOutcomesTable from './ProjectFinalOutcomesTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useProjectFinalOutcomesStore from '../../context/projectFinalOutcomesStore';
import projectFinalOutcomesService from '../../services/projectFinalOutcomesService';

const ProjectFinalOutcomesList = () => {
  const { ProjectFinalOutcomes, loading, hasMore, deleteProjectFinalOutcomes, fetchProjectFinalOutcomes } = useProjectFinalOutcomesStore();
    const { projectId } = useParams();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredProjectFinalOutcomes, setFilteredProjectFinalOutcomes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProjectFinalOutcomes(projectId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjectFinalOutcomes]);

  useEffect(() => {
    let result = ProjectFinalOutcomes;
    result = projectFinalOutcomesService.sortProjectFinalOutcomes(result, sortOrder);
    setFilteredProjectFinalOutcomes(result);
  }, [ProjectFinalOutcomes, sortOrder]);


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
      setSelected(filteredProjectFinalOutcomes.map((ProjectFinalOutcomes) => ProjectFinalOutcomes.id));
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
      await deleteProjectFinalOutcomes(deleteId);
      fetchProjectFinalOutcomes(projectId);
    } catch (error) {
      toast.error('Failed to delete ProjectFinalOutcomes.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ProjectFinalOutcomes Management
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
            label="Search ProjectFinalOutcomes"
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
            onClick={() => navigate(`/projectFinalOutcomes/create/${projectId}`)}
          >
            Create New ProjectFinalOutcomes
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ProjectFinalOutcomesTable
            ProjectFinalOutcomes={filteredProjectFinalOutcomes}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredProjectFinalOutcomes.length} // Disable total count display
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
        message={deleteId ? 'Are you sure you want to delete this ProjectFinalOutcomes?' : 'Are you sure you want to delete the selected ProjectFinalOutcomess?'}
      />
    </Box>
  );
};

export default ProjectFinalOutcomesList;