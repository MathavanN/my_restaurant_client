import React, { useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { Paper, Box, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockItemsAsync, getStockItems } from "./stockItemSlice";
import { IStockItem } from "model/stockItem.model";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const StockItem = () => {
  const dispatch = useDispatch();
  const stockItems = useSelector(getStockItems);
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
    dispatch(fetchStockItemsAsync());
  }, [dispatch]);

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No</StyledTableCell>
                <StyledTableCell align="left">Stock Type</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Unit</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">
                  <Button>Add</Button>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockItems.map((item: { key: number; value: IStockItem }) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={item.key}
                >
                  <StyledTableCell>{item.key}</StyledTableCell>
                  <StyledTableCell>{item.value.stockType}</StyledTableCell>
                  <StyledTableCell>{item.value.name}</StyledTableCell>
                  <StyledTableCell>{item.value.itemUnit}</StyledTableCell>
                  <StyledTableCell>{item.value.description}</StyledTableCell>
                  <StyledTableCell>Edit/Delete</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={stockItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default StockItem;
