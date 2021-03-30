import { FC, useContext } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { format, isEqual } from 'date-fns';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IPurchaseOrderSerial } from '../../app/models/purchaseOrder/purchaseOrder';
import { RootStoreContext } from '../../app/stores/rootStore';
import AddPurchaseOrder from './AddPurchaseOrder';
import { PENDING } from '../../app/models/constants';
import { ISelectInputOptions } from '../../app/models/common';
import { PurchaseOrderFormValues } from '../../app/models/purchaseOrder/purchaseOrderFormValues';

interface IProps {
  orders: IPurchaseOrderSerial[];
  supplierOptions: ISelectInputOptions[];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}
const PurchaseOrderListItem: FC<IProps> = ({
  orders,
  supplierOptions,
  displayColumn,
  displayView,
  displayEdit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          {displayColumn && <Table.HeaderCell>No</Table.HeaderCell>}
          <Table.HeaderCell>Order Number</Table.HeaderCell>
          <Table.HeaderCell>Supplier Name</Table.HeaderCell>
          <Table.HeaderCell>Requested By</Table.HeaderCell>
          <Table.HeaderCell>Requested Date</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          {displayColumn && <Table.HeaderCell>Approval By</Table.HeaderCell>}
          {displayColumn && <Table.HeaderCell>Approval Date</Table.HeaderCell>}
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((order) => (
          <Table.Row key={order.id}>
            {displayColumn && <Table.Cell>{order.serial}</Table.Cell>}
            <Table.Cell>{order.orderNumber}</Table.Cell>
            <Table.Cell>{order.supplierName}</Table.Cell>
            <Table.Cell>{order.requestedUserName}</Table.Cell>
            <Table.Cell>
              {format(new Date(order.requestedDate), "yyyy-MM-dd'T'HH:mm")}
            </Table.Cell>
            <Table.Cell negative={order.approvalStatus === PENDING}>
              {order.approvalStatus}
            </Table.Cell>
            {displayColumn && <Table.Cell>{order.approvedUserName}</Table.Cell>}
            {displayColumn && (
              <Table.Cell>
                {!isEqual(
                  new Date(order.approvedDate),
                  new Date('0001-01-01T00:00:00')
                ) && format(new Date(order.approvedDate), "yyyy-MM-dd'T'HH:mm")}
              </Table.Cell>
            )}
            {displayView && (
              <Table.Cell>
                <Button
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/purchase/view/${order.id}`}
                />
              </Table.Cell>
            )}
            {displayEdit && (
              <Table.Cell>
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() =>
                    openModal(
                      <AddPurchaseOrder
                        order={new PurchaseOrderFormValues(order)}
                        supplierOptions={supplierOptions}
                      />
                    )
                  }
                >
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(PurchaseOrderListItem);
