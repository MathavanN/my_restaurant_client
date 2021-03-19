import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getStockItems,
  getStockItemCount,
  getStockItemLoading,
  fetchStockItemsAsync,
} from "./stockItemSlice";
import { IStockItem } from "model/stockItem.model";
import Loading from "components/Loading";
import FilterStockItem from "./FilterStockItem";
import { getStockTypeOptions } from "features/stockType/stockTypeSlice";

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
      padding: "10px",
    },
    body: {
      fontSize: 13,
      padding: "10px",
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

const StockItemList = () => {
  const dispatch = useDispatch();
  const stockItems = useSelector(getStockItems);
  const stockItemsCount = useSelector(getStockItemCount);
  const stockItemLoading = useSelector(getStockItemLoading);
  const stockTypeOptions = useSelector(getStockTypeOptions);
  console.log(stockTypeOptions);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stockType, setStockType] = useState(
    stockTypeOptions.length > 0 ? stockTypeOptions[0].value : 0
  );

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
    if (stockType > 0) {
      dispatch(fetchStockItemsAsync(stockType, rowsPerPage, page));
    }
  }, [dispatch, rowsPerPage, page, stockType]);

  if (stockType === 0)
    return <Loading show={true} content="Stock types are not available..." />;

  if (stockItemLoading)
    return <Loading show={true} content="Loading stock items..." />;

  return (
    <>
      <FilterStockItem
        stockTypeOptions={stockTypeOptions}
        stockType={stockType}
      />
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
                  key={rowsPerPage * page + item.key}
                >
                  <StyledTableCell>
                    {rowsPerPage * page + item.key}
                  </StyledTableCell>
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
          count={stockItemsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default StockItemList;
