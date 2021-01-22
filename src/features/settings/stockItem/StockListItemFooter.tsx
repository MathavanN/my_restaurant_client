import React, { FC, Fragment } from "react";
import { Pagination, Table } from "semantic-ui-react";

interface IProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  loadStockItems: () => void;
}
const StockListItemFooter: FC<IProps> = ({
  page,
  totalPages,
  setPage,
  loadStockItems,
}) => {
  return (
    <Fragment>
      {totalPages > 1 && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Pagination
                defaultActivePage={page}
                totalPages={totalPages}
                onPageChange={(e, d) => {
                  setPage(d.activePage as number);
                  loadStockItems();
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Fragment>
  );
};

export default StockListItemFooter;
