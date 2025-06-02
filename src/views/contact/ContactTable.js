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
import { Delete } from '@mui/icons-material';
import { formatDateToLocal } from '../utilities/dateUtils';

const ContactTable = ({
  Contact,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
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
                name
              </TableSortLabel>
            </TableCell>
            <TableCell>email</TableCell>
            <TableCell>website</TableCell>
            <TableCell>description</TableCell>
            <TableCell>phone</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Contact.map((Contact) => (
            <TableRow
              key={Contact.id}
              selected={selected.includes(Contact.id)}
            >
              <TableCell>{Contact.name}</TableCell>
              <TableCell>{Contact.email}</TableCell>
              <TableCell>{Contact.website}</TableCell>
              <TableCell>{Contact.description}</TableCell>
              <TableCell>{Contact.phone}</TableCell>
              <TableCell>{formatDateToLocal(Contact.createdOn)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(Contact.id)}
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

export default ContactTable;