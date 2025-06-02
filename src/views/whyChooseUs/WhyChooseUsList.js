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
import WhyChooseUsTable from './WhyChooseUsTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useWhyChooseUsStore from '../../context/whyChooseUsStore';
import whyChooseUsService from '../../services/whyChooseUsService';

const WhyChooseUsList = () => {
  const { WhyChooseUs, loading, hasMore, deleteWhyChooseUs, fetchWhyChooseUs } = useWhyChooseUsStore();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredWhyChooseUs, setFilteredWhyChooseUs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchWhyChooseUs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchWhyChooseUs]);

  useEffect(() => {
    let result = WhyChooseUs;
    result = whyChooseUsService.sortWhyChooseUs(result, sortOrder);
    setFilteredWhyChooseUs(result);
    console.log(result);
    
  }, [WhyChooseUs, sortOrder]);


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
      setSelected(filteredWhyChooseUs.map((WhyChooseUs) => WhyChooseUs.id));
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
      await deleteWhyChooseUs(deleteId);
      fetchWhyChooseUs();
    } catch (error) {
      toast.error('Failed to delete WhyChooseUs.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        WhyChooseUs Management
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
            label="Search WhyChooseUs"
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
            onClick={() => navigate(`/whyChooseUs/create`)}
          >
            Create New WhyChooseUs
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <WhyChooseUsTable
            WhyChooseUs={filteredWhyChooseUs}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredWhyChooseUs.length} // Disable total count display
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
        message={deleteId ? 'Are you sure you want to delete this WhyChooseUs?' : 'Are you sure you want to delete the selected WhyChooseUss?'}
      />
    </Box>
  );
};

export default WhyChooseUsList;