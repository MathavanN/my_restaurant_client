import React, { FC } from "react";
import { Grid, Header, Table } from "semantic-ui-react";
import { IPurchaseOrder } from "../../app/models/purchaseOrder";
import { IPurchaseOrderItem } from "../../app/models/purchaseOrderItem";
interface IProps {
  items: [string, IPurchaseOrderItem][];
  order: IPurchaseOrder;
}
const OrderItemSummary: FC<IProps> = ({ items, order }) => {
  const orderTotal = items.reduce(
    (total, [group, item]) =>
      total +
      (item.itemUnitPrice * item.quantity * (100 - item.discount)) / 100,
    0
  );
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      Order discount: {order.discount}
                      {"%"}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      Description: {order.description}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Sub Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>{orderTotal}</Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
              <Table.Row warning>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Order Discount</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {(orderTotal * order.discount) / 100}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Purchase Order Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {(orderTotal * (100 - order.discount)) / 100}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default OrderItemSummary;
