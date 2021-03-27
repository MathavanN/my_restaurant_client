import { FC } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { IStockItem } from '../../../app/models/stockItem';
import { StockItemFormValues } from '../../../app/models/stockItemFormValues';
import DeleteStockItem from './DeleteStockItem';
import EditStockItem from './EditStockItem';

interface IProps {
  hasModifyAccess: boolean;
  stockTypeOptions: ISelectInputOptions[];
  unitOfMeasureOptions: ISelectInputOptions[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (content: any) => void;
  stockItems: [string, IStockItem][];
}

const StockItemListItem: FC<IProps> = ({
  hasModifyAccess,
  stockTypeOptions,
  unitOfMeasureOptions,
  stockItems,
  openModal,
}) => (
  <>
    <Table.Body>
      {stockItems.map(([group, stockItem]) => (
        <Table.Row key={stockItem.id}>
          <Table.Cell>{group}</Table.Cell>
          <Table.Cell>{stockItem.stockType}</Table.Cell>
          <Table.Cell>{stockItem.name}</Table.Cell>
          <Table.Cell>
            {stockItem.itemUnit}
            {stockItem.unitOfMeasureCode}
          </Table.Cell>
          <Table.Cell>{stockItem.description}</Table.Cell>
          {hasModifyAccess && (
            <Table.Cell collapsing textAlign="right">
              <Button
                animated="vertical"
                color="orange"
                onClick={() =>
                  openModal(
                    <EditStockItem
                      stockItem={new StockItemFormValues(stockItem)}
                      stockTypeOptions={stockTypeOptions}
                      unitOfMeasureOptions={unitOfMeasureOptions}
                    />
                  )
                }
              >
                <Button.Content hidden>Edit</Button.Content>
                <Button.Content visible>
                  <Icon name="edit" />
                </Button.Content>
              </Button>
              <Button
                animated="vertical"
                color="red"
                onClick={() =>
                  openModal(<DeleteStockItem stockItem={stockItem} />)
                }
              >
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                  <Icon name="delete" />
                </Button.Content>
              </Button>
            </Table.Cell>
          )}
        </Table.Row>
      ))}
    </Table.Body>
  </>
);

export default StockItemListItem;
