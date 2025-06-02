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
import useSlidersStore from '../../context/slidersStore';
import ImageDisplay from '../../components/ImageDisplay';

const SlidersFormTable = ({
  Sliders,
  sortOrder,
  handleSort,
  handleDelete,
  selected,
}) => {
  const navigate = useNavigate();
 const { activateSliders, deactivateSliders } = useSlidersStore();
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
            <TableCell>Subtitle</TableCell>
            <TableCell>Subtitle Pashto</TableCell>
            <TableCell>Subtitle Dari</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Description Pashto</TableCell>
            <TableCell>Description Dari</TableCell>
            <TableCell>small SubTitle</TableCell>
            <TableCell>small SubTitle Pashto</TableCell>
            <TableCell>small SubTitle Dari</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Sliders.map((Sliders) => (
            <TableRow
              key={Sliders.id}
              selected={selected.includes(Sliders.id)}
            >
              <TableCell>{Sliders.title}</TableCell>
              <TableCell>{Sliders.title_pashto}</TableCell>
              <TableCell>{Sliders.title_dari}</TableCell>
              <TableCell>{Sliders.subTitle}</TableCell>
              <TableCell>{Sliders.subTitle_pashto}</TableCell>
              <TableCell>{Sliders.subTitle_dari}</TableCell>
              <TableCell>{Sliders.description}</TableCell>
              <TableCell>{Sliders.description_pashto}</TableCell>
              <TableCell>{Sliders.description_dari}</TableCell>
              <TableCell>{Sliders.smallSubTitle}</TableCell>
              <TableCell>{Sliders.smallSubTitle_pashto}</TableCell>
              <TableCell>{Sliders.smallSubTitle_dari}</TableCell>
              <TableCell> 
                     <ImageDisplay
                                              path={Sliders.photoPath}
                                              alt={Sliders.title}
                                              fallbackText="No Image"
                                              
                                             />
                    </TableCell>
              <TableCell>
                        {Sliders.isActive ? (
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
                  onClick={() => navigate(`/sliders/edit/${Sliders.id}`)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(Sliders.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>

                 {Sliders.isActive ? (
              <IconButton
                onClick={() => deactivateSliders(Sliders.id)}
                color="warning"
              >
                <Cancel />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => activateSliders(Sliders.id)}
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

export default SlidersFormTable;