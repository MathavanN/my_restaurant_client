import { FC, useContext, useEffect } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import { format, isEqual } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { IPurchaseOrder } from '../../app/models/purchaseOrder/purchaseOrder';
import { RootStoreContext } from '../../app/stores/rootStore';
import { Status } from '../../app/models/constants';

interface IProps {
  order: IPurchaseOrder;
}
const OrderSummary: FC<IProps> = ({ order }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadSupplier, supplier } = rootStore.supplierStore;
  useEffect(() => {
    loadSupplier(order.supplierId);
  }, [loadSupplier, order]);

  const positive = order.approvalStatus === Status.APPROVED && true;
  const negative = order.approvalStatus !== Status.APPROVED && true;
  const isDefaultDate = (date: Date) =>
    isEqual(new Date(date), new Date('0001-01-01T00:00:00'));

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Order Number</Table.Cell>
                <Table.Cell>{order.orderNumber}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Request By</Table.Cell>
                <Table.Cell>{order.requestedUserName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Request Date</Table.Cell>
                <Table.Cell>
                  {!isDefaultDate(order.requestedDate) &&
                    format(new Date(order.requestedDate), "yyyy-MM-dd'T'HH:mm")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell positive={positive} negative={negative}>
                  Status
                </Table.Cell>
                <Table.Cell positive={positive} negative={negative}>
                  {order.approvalStatus}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approved By</Table.Cell>
                <Table.Cell>{order.approvedUserName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approved Date</Table.Cell>
                <Table.Cell>
                  {!isDefaultDate(order.approvedDate) &&
                    format(new Date(order.approvedDate), "yyyy-MM-dd'T'HH:mm")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approval Reason</Table.Cell>
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Supplier Name:</Table.Cell>
                <Table.Cell>{order.supplierName}</Table.Cell>
              </Table.Row>
              {supplier && (
                <>
                  <Table.Row rowSpan={2}>
                    <Table.Cell>Supplier Address:</Table.Cell>
                    <Table.Cell>
                      {supplier.address1}
                      {supplier.address2! && `, ${supplier.address2}`}
                      {`, ${supplier.city}, ${supplier.country}`}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Phone:</Table.Cell>
                    <Table.Cell>
                      {supplier.telephone1}
                      {supplier.telephone2! && `, ${supplier.telephone2}`}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Fax</Table.Cell>
                    <Table.Cell>{supplier.fax}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Email:</Table.Cell>
                    <Table.Cell>{supplier.email}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Contact Person:</Table.Cell>
                    <Table.Cell>{supplier.contactPerson}</Table.Cell>
                  </Table.Row>
                </>
              )}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(OrderSummary);
