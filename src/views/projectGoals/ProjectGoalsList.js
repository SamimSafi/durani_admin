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
import ProjectGoalsTable from './ProjectGoalsTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useProjectGoalsStore from '../../context/projectGoalsStore';
import projectGoalsService from '../../services/projectGoalsService';

const ProjectGoalsList = () => {
  const { ProjectGoals, loading, hasMore, deleteProjectGoals, fetchProjectGoals } = useProjectGoalsStore();
    const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredProjectGoals, setFilteredProjectGoals] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProjectGoals(projectId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjectGoals]);

  useEffect(() => {
    let result = ProjectGoals;
    result = projectGoalsService.sortProjectGoals(result, sortOrder);
    setFilteredProjectGoals(result);
  }, [ProjectGoals, sortOrder]);

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
      setSelected(filteredProjectGoals.map((ProjectGoals) => ProjectGoals.id));
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
      await deleteProjectGoals(deleteId);
      fetchProjectGoals(projectId);
    } catch (error) {
      toast.error('Failed to delete ProjectGoals.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ProjectGoals Management
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
            label="Search ProjectGoals"
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
            onClick={() => navigate(`/projectGoals/create/${projectId}`)}
          >
            Create New ProjectGoals
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ProjectGoalsTable
            ProjectGoals={filteredProjectGoals}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredProjectGoals.length} // Disable total count display
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
        message={deleteId ? 'Are you sure you want to delete this ProjectGoals?' : 'Are you sure you want to delete the selected ProjectGoalss?'}
      />
    </Box>
  );
};

export default ProjectGoalsList;