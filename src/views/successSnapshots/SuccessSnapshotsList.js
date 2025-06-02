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
import SuccessSnapshotsTable from './SuccessSnapshotsTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useDebounce from '../../hooks/useDebounce';
import useSuccessSnapshotsStore from '../../context/successSnapshotsStore';
import successSnapshotsService from '../../services/successSnapshotsService';

const SuccessSnapshotsList = () => {
  const { SuccessSnapshots, loading, hasMore, deleteSuccessSnapshots, fetchSuccessSnapshots } = useSuccessSnapshotsStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredSuccessSnapshots, setFilteredSuccessSnapshots] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchSuccessSnapshots({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
  }, [fetchSuccessSnapshots, page, rowsPerPage, debouncedSearch]);

  useEffect(() => {
    let result = SuccessSnapshots;
    result = successSnapshotsService.sortSuccessSnapshots(result, sortOrder);
    setFilteredSuccessSnapshots(result);
  }, [SuccessSnapshots, sortOrder]);

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
      setSelected(filteredSuccessSnapshots.map((SuccessSnapshots) => SuccessSnapshots.id));
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
      await deleteSuccessSnapshots(deleteId);
      fetchSuccessSnapshots({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
    } catch (error) {
      toast.error('Failed to delete SuccessSnapshots.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Success Snapshots Management
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
            label="Search SuccessSnapshots"
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
            onClick={() => navigate('/successSnapshots/create')}
          >
            Create New SuccessSnapshots
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <SuccessSnapshotsTable
            SuccessSnapshots={filteredSuccessSnapshots}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredSuccessSnapshots.length} // Disable total count display
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
        message={deleteId ? 'Are you sure you want to delete this SuccessSnapshots?' : 'Are you sure you want to delete the selected SuccessSnapshotss?'}
      />
    </Box>
  );
};

export default SuccessSnapshotsList;