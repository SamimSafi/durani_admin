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
import useServicesStore from '../../context/servicesStore';
import ImageDisplay from '../../components/ImageDisplay';

const ServicesFormTable = ({
  Services,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateServices, deactivateServices } = useServicesStore();
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
            <TableCell>Title Pashto </TableCell>
            <TableCell>Title Dari</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Summary Pashto</TableCell>
            <TableCell>Summary Dari</TableCell>
            <TableCell>Detailed Description</TableCell>
            <TableCell>Detailed Description Pashto</TableCell>
            <TableCell>Detailed Description Dari</TableCell>
            <TableCell>Satisfied Clients </TableCell>
            <TableCell>Success Work </TableCell>
            <TableCell>Icon </TableCell>
            <TableCell>Image 1 </TableCell>
            <TableCell>Image 2</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Services.map((Services) => (
            <TableRow
              key={Services.id}
              selected={selected.includes(Services.id)}
            >
              <TableCell>{Services.title}</TableCell>
              <TableCell>{Services.title_pashto}</TableCell>
              <TableCell>{Services.title_dari}</TableCell>
              <TableCell>{Services.summary}</TableCell>
              <TableCell>{Services.summary_pashto}</TableCell>
              <TableCell>{Services.summary_dari}</TableCell>
              <TableCell>{Services.detailedDescription}</TableCell>
              <TableCell>{Services.detailedDescription_pashto}</TableCell>
              <TableCell>{Services.detailedDescription_dari}</TableCell>
              <TableCell>{Services.numberOfSatisfiedClient}</TableCell>
              <TableCell>{Services.successWork}</TableCell>
              <TableCell> <ImageDisplay
                              path={Services.icon}
                              alt={Services.title}
                              fallbackText="No image"
                            />
                    </TableCell>
              <TableCell> <ImageDisplay
                              path={Services.image1}
                              alt={Services.title}
                              fallbackText="No image"
                            />
                    </TableCell>
              <TableCell> <ImageDisplay
                              path={Services.image2}
                              alt={Services.title}
                              fallbackText="No image"
                            />
                    </TableCell>
              <TableCell>
                        {Services.isActive ? (
                          <span style={{ backgroundColor: 'green', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                            Active
                          </span>
                        ) : (
                          <span style={{ backgroundColor: 'red', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                            Deactive
                          </span>
                        )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/services/edit/${Services.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Services.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {Services.isActive ? (
              <IconButton
                onClick={() => deactivateServices(Services.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateServices(Services.id)}
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

export default ServicesFormTable;