import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Button, Divider, Header, Icon, Table } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FC } from "react";
import CreateOrderItem from "./CreateOrderItem";
import { PurchaseOrderItemFormValues } from "../../app/models/purchaseOrderItem";
import DeleteOrderItem from "./DeleteOrderItem";
import { IPurchaseOrder } from "../../app/models/purchaseOrder";
import OrderItemSummary from "./OrderItemSummary";

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  displaySummary: boolean;
  order: IPurchaseOrder;
}
const OrderItemList: FC<IProps> = ({
  displayAction,
  displayAmount,
  displaySummary,
  order,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { getPurchaseOrderItems } = rootStore.purchaseOrderStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Fragment>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Unit</Table.HeaderCell>
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Discount(%)</Table.HeaderCell>
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
          {getPurchaseOrderItems.map(([group, item]) => (
            <Table.Row key={item.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{item.itemName}</Table.Cell>
              <Table.Cell>
                {item.itemUnit}
                {item.unitOfMeasureCode}
              </Table.Cell>
              <Table.Cell>{item.itemUnitPrice}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.discount}</Table.Cell>
              {displayAmount && (
                <Table.Cell>
                  {item.itemUnitPrice *
                    item.quantity *
                    ((100 - item.discount) / 100)}
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
        <Fragment>
          <Divider />
          <Header size="medium" textAlign="center">
            Purchase Order Item Summary
          </Header>
          <Divider />
          <OrderItemSummary order={order} items={getPurchaseOrderItems} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(OrderItemList);
