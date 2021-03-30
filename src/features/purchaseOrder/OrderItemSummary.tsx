import { FC } from 'react';
import { Grid, Header, Table } from 'semantic-ui-react';
import { IPurchaseOrder } from '../../app/models/purchaseOrder/purchaseOrder';
import { IPurchaseOrderItemSerial } from '../../app/models/purchaseOrderItem/purchaseOrderItem';

interface IProps {
  items: IPurchaseOrderItemSerial[];
  order: IPurchaseOrder;
}
const OrderItemSummary: FC<IProps> = ({ items, order }) => {
  const orderTotal = items.reduce(
    (total, item) => total + item.itemUnitPrice * item.quantity,
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
                    <Header.Content>Purchase Order Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>{orderTotal.toFixed(2)}</Header.Content>
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
