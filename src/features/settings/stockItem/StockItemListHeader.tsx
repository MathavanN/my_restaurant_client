import { FC } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { StockItemFormValues } from '../../../app/models/stockItem';
import EditStockItem from './EditStockItem';

interface IProps {
  hasModifyAccess: boolean;
  stockItem: StockItemFormValues;
  stockTypeOptions: ISelectInputOptions[];
  unitOfMeasureOptions: ISelectInputOptions[];
  openModal: (content: any) => void;
}
const StockItemListHeader: FC<IProps> = ({
  hasModifyAccess,
  stockItem,
  stockTypeOptions,
  unitOfMeasureOptions,
  openModal,
}) => {
  return (
    <>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>Stock Type</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Unit</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          {hasModifyAccess && (
            <Table.HeaderCell>
              <Button
                animated='vertical'
                color='green'
                onClick={() =>
                  openModal(
                    <EditStockItem
                      stockItem={stockItem}
                      stockTypeOptions={stockTypeOptions}
                      unitOfMeasureOptions={unitOfMeasureOptions}
                    />
                  )
                }
              >
                <Button.Content hidden>Add</Button.Content>
                <Button.Content visible>
                  <Icon name='add circle' />
                </Button.Content>
              </Button>
            </Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
    </>
  );
};

export default StockItemListHeader;
