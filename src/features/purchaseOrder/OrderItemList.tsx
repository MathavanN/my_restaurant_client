import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, Icon, Table } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import CreateOrderItem from './CreateOrderItem';
import DeleteOrderItem from './DeleteOrderItem';
import { IPurchaseOrder } from '../../app/models/purchaseOrder/purchaseOrder';
import OrderItemSummary from './OrderItemSummary';
import { ISelectInputOptions } from '../../app/models/common';
import { PurchaseOrderItemFormValues } from '../../app/models/purchaseOrderItem/purchaseOrderItemFormValues';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  displaySummary: boolean;
  order: IPurchaseOrder;
  stockTypeOptions: ISelectInputOptions[];
}
const OrderItemList: FC<IProps> = ({
  displayAction,
  displayAmount,
  displaySummary,
  order,
  stockTypeOptions,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { getPurchaseOrderItems } = rootStore.purchaseOrderStore;
  const { openModal } = rootStore.modalStore;
  return (
    <>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Unit</Table.HeaderCell>
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            {displayAmount && <Table.HeaderCell>Amount</Table.HeaderCell>}
            {displayAction && (
              <Table.HeaderCell textAlign="center">
                <Button
                  animated="vertical"
                  color="green"
                  onClick={() =>
                    openModal(
                      <CreateOrderItem
                        item={new PurchaseOrderItemFormValues(order.id)}
                        stockTypeOptions={stockTypeOptions}
                      />
                    )
                  }
                >
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="add circle" />
                  </Button.Content>
                </Button>
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getPurchaseOrderItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.serial}</Table.Cell>
              <Table.Cell>{item.itemName}</Table.Cell>
              <Table.Cell>
                {item.itemUnit}
                {item.unitOfMeasureCode}
              </Table.Cell>
              <Table.Cell>{item.itemUnitPrice.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              {displayAmount && (
                <Table.Cell>
                  {(item.itemUnitPrice * item.quantity).toFixed(2)}
                </Table.Cell>
              )}
              {displayAction && (
                <Table.Cell collapsing textAlign="right">
                  <Button
                    animated="vertical"
                    color="orange"
                    onClick={() =>
                      openModal(
                        <CreateOrderItem
                          item={new PurchaseOrderItemFormValues(order.id, item)}
                          stockTypeOptions={stockTypeOptions}
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
                    onClick={() => openModal(<DeleteOrderItem item={item} />)}
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
      </Table>
      {displaySummary && (
        <>
          <Divider />
          <Header size="medium" textAlign="center">
            Purchase Order Item Summary
          </Header>
          <Divider />
          <OrderItemSummary order={order} items={getPurchaseOrderItems} />
        </>
      )}
    </>
  );
};

export default observer(OrderItemList);
