import { FC } from 'react';
import { Pagination, Table } from 'semantic-ui-react';

interface IProps {
  page: number;
  totalPages: number;
  handleOnPageChange: (page: number) => void;
}
const StockListItemFooter: FC<IProps> = ({
  page,
  totalPages,
  handleOnPageChange,
}) => {
  return (
    <>
      {totalPages > 1 && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='6'>
              <Pagination
                defaultActivePage={page}
                totalPages={totalPages}
                onPageChange={(e, d) =>
                  handleOnPageChange(d.activePage as number)
                }
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </>
  );
};

export default StockListItemFooter;
