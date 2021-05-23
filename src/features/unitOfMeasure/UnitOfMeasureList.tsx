/* eslint-disable no-console */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { FC, useEffect, useState } from 'react';
import {
  getUnitOfMeasures,
  fetchUnitOfMeasuresAsync,
} from './unitOfMeasureSlice';
import { IUnitOfMeasure } from '../../model/UnitOfMeasure.model';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 700,
  },
  cell: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  button: {
    padding: theme.spacing(0.5, 0.5),
  },
}));

interface IProps {
  handleOpenEdit: () => void;
  handleOpenDelete: () => void;
}

const UnitOfMeasureList: FC<IProps> = ({
  handleOpenEdit,
  handleOpenDelete,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const unitOfMeasures = useSelector(getUnitOfMeasures);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchUnitOfMeasuresAsync());
  }, [dispatch]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.cell}
                align="left"
                style={{ minWidth: 10 }}
              >
                No
              </TableCell>
              <TableCell
                className={classes.cell}
                align="left"
                style={{ minWidth: 50 }}
              >
                Code
              </TableCell>
              <TableCell
                className={classes.cell}
                align="left"
                style={{ minWidth: 100 }}
              >
                Description
              </TableCell>
              <TableCell align="left">
                <IconButton
                  aria-label="add"
                  onClick={handleOpenEdit}
                  className={classes.button}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {unitOfMeasures.map(
              (item: { key: number; value: IUnitOfMeasure }) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item.key}>
                  <TableCell>{item.key}</TableCell>
                  <TableCell>{item.value.code}</TableCell>
                  <TableCell>{item.value.description}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={handleOpenEdit}
                      className={classes.button}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={handleOpenDelete}
                      className={classes.button}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={unitOfMeasures.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UnitOfMeasureList;
