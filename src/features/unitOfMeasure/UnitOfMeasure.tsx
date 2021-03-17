import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnitOfMeasures,
  fetchUnitOfMeasuresAsync,
} from "./unitOfMeasureSlice";
import { IUnitOfMeasure } from "model/UnitOfMeasure.model";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const UnitOfMeasure = () => {
  const dispatch = useDispatch();
  const unitOfMeasures = useSelector(getUnitOfMeasures);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: 170 }}>
                No
              </TableCell>
              <TableCell align="center" style={{ minWidth: 100 }}>
                Code
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Description
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

export default UnitOfMeasure;
