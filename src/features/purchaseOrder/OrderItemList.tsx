import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Button, Icon, Table } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FC } from "react";
import CreateOrderItem from "./CreateOrderItem";
import { PurchaseOrderItemFormValues } from "../../app/models/purchaseOrderItem";

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
}
const OrderItemList: FC<IProps> = ({ displayAction, displayAmount }) => {
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
            {displayAction && <Table.HeaderCell>Action</Table.HeaderCell>}
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
              <Table.Cell>{item.itemUnitPrice.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.discount.toFixed(2)}</Table.Cell>
              {displayAmount && (
                <Table.Cell>
                  {(
                    item.itemUnitPrice *
                    item.quantity *
                    ((100 - item.discount) / 100)
                  ).toFixed(2)}
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
                          item={new PurchaseOrderItemFormValues(item)}
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
                    onClick={() => console.log("hi")}
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
    </Fragment>
  );
};

export default observer(OrderItemList);
