import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Button, Header, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { format, isEqual } from "date-fns";
import { Link } from "react-router-dom";

const PurchaseOrderList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPurchaseOrders,
    getPurchaseOrders,
  } = rootStore.purchaseOrderStore;

  useEffect(() => {
    loadPurchaseOrders();
  }, [loadPurchaseOrders]);
  return (
    <Fragment>
      <Header as="h3" dividing textAlign="center">
        Purchase Orders.
      </Header>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Order Number</Table.HeaderCell>
            <Table.HeaderCell>Supplier Name</Table.HeaderCell>
            <Table.HeaderCell>Requested By</Table.HeaderCell>
            <Table.HeaderCell>Requested Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Approval By</Table.HeaderCell>
            <Table.HeaderCell>Approval Date</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getPurchaseOrders.map(([group, order]) => (
            <Table.Row key={order.id}>
              <Table.Cell>{group}</Table.Cell>
              <Table.Cell>{order.orderNumber}</Table.Cell>
              <Table.Cell>{order.supplierName}</Table.Cell>
              <Table.Cell>{order.requestedBy}</Table.Cell>
              <Table.Cell>
                {format(new Date(order.requestedDate), "yyyy-MM-dd'T'HH:mm")}
              </Table.Cell>
              <Table.Cell>{order.approvalStatus}</Table.Cell>
              <Table.Cell>{order.approvedBy}</Table.Cell>
              <Table.Cell>
                {!isEqual(
                  new Date(order.approvedDate),
                  new Date("0001-01-01T00:00:00")
                ) && format(new Date(order.approvedDate), "yyyy-MM-dd'T'HH:mm")}
              </Table.Cell>
              <Table.Cell>
                <Button
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/purchase/view/${order.id}`}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default observer(PurchaseOrderList);
