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
import { Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useJobPostingStore from '../../context/jobPostingStore';

const JobPostingTable = ({
  jobPosting,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
  const { activateJobPosting, deactivateJobPosting } = useJobPostingStore();

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
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>Title Pashto</TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Contract Type</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Location Pashto</TableCell>
            <TableCell>Location Dari</TableCell>
            <TableCell>Salary Range</TableCell>
            <TableCell>Application Deadline</TableCell>
            <TableCell>Requirements</TableCell>
            <TableCell>Requirements Pashto</TableCell>
            <TableCell>Requirements Dari</TableCell>
            <TableCell>Responsibilities</TableCell>
            <TableCell>Responsibilities Pashto</TableCell>
            <TableCell>Responsibilities Dari</TableCell>
            <TableCell>Vacancies</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobPosting.map((jobPosting) => (
            <TableRow
              key={jobPosting.id}
              selected={selected.includes(jobPosting.id)}
            >
              <TableCell>{jobPosting.title}</TableCell>
              <TableCell>{jobPosting.title_pashto}</TableCell>
              <TableCell>{jobPosting.title_dari}</TableCell>
              <TableCell>{jobPosting.description}</TableCell>
              <TableCell>{jobPosting.description_pashto}</TableCell>
              <TableCell>{jobPosting.description_dari}</TableCell>
              <TableCell>{jobPosting.category}</TableCell>
              <TableCell>{jobPosting.contractType}</TableCell>
              <TableCell>{jobPosting.location}</TableCell>
              <TableCell>{jobPosting.location_pashto}</TableCell>
              <TableCell>{jobPosting.location_dari}</TableCell>
              <TableCell>{jobPosting.salaryRange}</TableCell>
              <TableCell>
                {new Date(jobPosting.applicationDeadline).toLocaleString()}
              </TableCell>
              <TableCell>{jobPosting.requirements}</TableCell>
              <TableCell>{jobPosting.requirements_pashto}</TableCell>
              <TableCell>{jobPosting.requirements_dari}</TableCell>
              <TableCell>{jobPosting.responsibilities}</TableCell>
              <TableCell>{jobPosting.responsibilities_pashto}</TableCell>
              <TableCell>{jobPosting.responsibilities_dari}</TableCell>
              <TableCell>{jobPosting.vacancies}</TableCell>
              <TableCell>
                {jobPosting.isActive ? (
                  <span
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Active
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Inactive
                  </span>
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/jobposting/edit/${jobPosting.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(jobPosting.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
                {jobPosting.isActive ? (
                  <IconButton
                    onClick={() => deactivateJobPosting(jobPosting.id)}
                    color="warning"
                  >
                    <Cancel />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => activateJobPosting(jobPosting.id)}
                    color="success"
                  >
                    <CheckCircle />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobPostingTable;