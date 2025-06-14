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
import ContentTable from './ContentTable';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import useDebounce from '../../hooks/useDebounce';
import useContentStore from '../../context/contentStore';
import contentService from '../../services/contentService';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ContentList = () => {
  const { Content, loading, hasMore, deleteContent, fetchContent } = useContentStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredContent, setFilteredContent] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for category filter
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Category options
  const categoryOptions = [
    { value: '', label: 'All Categories' }, // Added 'All' option
    { value: 'ANNOUNCEMENTS', label: 'ANNOUNCEMENTS' },
    { value: 'AWARDS', label: 'AWARDS' },
    { value: 'SUSTAINABILITY', label: 'SUSTAINABILITY' },
    { value: 'NEWS', label: 'NEWS' },
    { value: 'ORGANIZATION_CHART', label: 'ORGANIZATION_CHART' },
  ];

  useEffect(() => {
    fetchContent({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
  }, [fetchContent, page, rowsPerPage, debouncedSearch]);

  useEffect(() => {
    let result = Content;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((content) => content.category === selectedCategory);
    }

    // Apply search term filter (if needed, assuming Content has a name or title field)
    if (debouncedSearch) {
      result = result.filter((content) =>
        content.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply sorting
    result = contentService.sortContent(result, sortOrder);
    setFilteredContent(result);
  }, [Content, sortOrder, debouncedSearch, selectedCategory]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(0); // Reset to first page on category change
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
      setSelected(filteredContent.map((content) => content.id));
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
      await deleteContent(deleteId);
      fetchContent({ pageSize: rowsPerPage, pageIndex: page, search: debouncedSearch });
    } catch (error) {
      toast.error('Failed to delete Content.');
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Content Management
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          {/* <TextField
            label="Search Content"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ maxWidth: 400 }}
            placeholder="Enter search term"
          /> */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/content/create')}
          >
            Create New Content
          </Button>
        </Box>
      </Box>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ContentTable
            Content={filteredContent}
            sortOrder={sortOrder}
            handleSort={handleSort}
            handleDelete={handleDelete}
            selected={selected}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
          />
          <TablePagination
            component="div"
            count={hasMore ? -1 : filteredContent.length}
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
        message={deleteId ? 'Are you sure you want to delete this Content?' : 'Are you sure you want to delete the selected Contents?'}
      />
    </Box>
  );
};

export default ContentList;