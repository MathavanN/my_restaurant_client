import React, { FC, Fragment, useContext, useEffect } from "react";
import { Grid, Table } from "semantic-ui-react";
import { IPurchaseOrder } from "../../app/models/purchaseOrder";
import { format, isEqual } from "date-fns";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";

interface IProps {
  order: IPurchaseOrder;
}
const OrderSummary: FC<IProps> = ({ order }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadSupplier, supplier } = rootStore.settingsStore;
  useEffect(() => {
    loadSupplier(order.supplierId);
  }, [loadSupplier, order]);

  const positive = order.approvalStatus === "Completed" && true;
  const negative = order.approvalStatus !== "Completed" && true;
  const isDefaultDate = isEqual(
    new Date(order.approvedDate),
    new Date("0001-01-01T00:00:00")
  );
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
                <Table.Cell>{order.requestedBy}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Request Date</Table.Cell>
                <Table.Cell>{order.requestedDate}</Table.Cell>
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
                <Table.Cell>{order.approvedBy}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approved Date</Table.Cell>
                <Table.Cell>
                  {!isDefaultDate &&
                    format(new Date(order.approvedDate), "yyyy-MM-dd'T'HH:mm")}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Approval Reason</Table.Cell>
                <Table.Cell></Table.Cell>
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
                <Fragment>
                  <Table.Row rowSpan={2}>
                    <Table.Cell>Supplier Address:</Table.Cell>
                    <Table.Cell>
                      {supplier.address1}
                      {supplier.address2! && ", " + supplier.address2}
                      {", " + supplier.city + ", " + supplier.country}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Phone:</Table.Cell>
                    <Table.Cell>
                      {supplier.telephone1}
                      {supplier.telephone2! && ", " + supplier.telephone2}
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
                </Fragment>
              )}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(OrderSummary);
