import React from 'react';
import { Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';
import { Skeleton } from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="loading table">
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox" width="5%">
                <Skeleton variant="rectangular" width={40} height={40} />
              </TableCell>
              <TableCell width="15%">
                <Skeleton variant="text" width="80%" animation="wave" />
              </TableCell>
              <TableCell width="20%">
                <Skeleton variant="text" width="60%" animation="wave" />
              </TableCell>
              <TableCell width="10%">
                <Skeleton variant="rectangular" width={50} height={50} animation="wave" />
              </TableCell>
              <TableCell width="40%">
                <Skeleton variant="text" width="90%" animation="wave" />
              </TableCell>
              <TableCell width="10%">
                <Skeleton variant="text" width="50%" animation="wave" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoadingSkeleton;