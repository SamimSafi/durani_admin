import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TablePagination,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import JobPostingTable from './JobPostingTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useJobPostingStore from '../../context/jobPostingStore';
import jobPostingService from '../../services/jobPostingService';

const JobPostingList = () => {
  const { jobPosting, loading, hasMore, deleteJobPosting, fetchJopPosting } = useJobPostingStore();
  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredJobPosting, setFilteredJobPosting] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchJopPosting({ pageSize: rowsPerPage, pageIndex: page });
  }, [fetchJopPosting, page, rowsPerPage]);

  useEffect(() => {
    let result = jobPosting;
    result = jobPostingService.sortJobPosting(result, sortOrder);
    setFilteredJobPosting(result);
  }, [jobPosting, sortOrder]);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  //   setPage(0); // Reset to first page on search
  // };

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
      setSelected(filteredJobPosting.map((JobPosting) => JobPosting.id));
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
      await deleteJobPosting(deleteId);
      fetchJopPosting({ pageSize: rowsPerPage, pageIndex: page });
    } catch (error) {
      toast.error('Failed to delete JobPosting.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        JobPosting Management
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
            label="Search JobPosting"
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
            onClick={() => navigate('/jobPosting/create')}
          >
            Create New JobPosting
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <JobPostingTable
            jobPosting={filteredJobPosting}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredJobPosting.length} // Disable total count display
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
        message={deleteId ? 'Are you sure you want to delete this JobPosting?' : 'Are you sure you want to delete the selected JobPostings?'}
      />
    </Box>
  );
};

export default JobPostingList;