import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Message, Grid, Segment, Button } from 'semantic-ui-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import OrderSummary from './OrderSummary';
import OrderItemList from './OrderItemList';
import ApprovalOrder from './ApprovalOrder';
import { Status } from '../../app/models/constants';

interface IDetailsParams {
  id: string;
}
const ViewPurchaseOrder: FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPurchaseOrder,
    loadPurchaseOrderItems,
    loadingInitial,
    purchaseOrder,
    getPurchaseOrderItems,
  } = rootStore.purchaseOrderStore;
  const { loadStockTypes, loadStockTypeOptions } = rootStore.stockTypeStore;
  const { openModal } = rootStore.modalStore;
  const { user, hasModifyAccess } = rootStore.userStore;

  useEffect(() => {
    loadStockTypes();
    loadPurchaseOrder(parseInt(match.params.id, 10));
    loadPurchaseOrderItems(parseInt(match.params.id, 10));
  }, [
    loadPurchaseOrder,
    loadStockTypes,
    loadPurchaseOrderItems,
    match.params.id,
  ]);

  if (loadingInitial)
    return <LoadingComponent content="Loading purchase order details..." />;

  if (!purchaseOrder)
    return <Message negative>Purchase order details not found.</Message>;

  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          {purchaseOrder.approvalStatus === Status.PENDING &&
            (hasModifyAccess ||
              purchaseOrder.requestedUserId === user?.userId) && (
              <Segment attached="top" textAlign="center">
                <Message info icon>
                  <Message.Content>
                    <Message.Header>Order Details</Message.Header>
                  </Message.Content>
                  <Button
                    floated="left"
                    as={Link}
                    to={`/purchase/manage/${match.params.id}`}
                  >
                    Modify
                  </Button>
                </Message>
              </Segment>
            )}

          <Segment attached>
            <OrderSummary order={purchaseOrder} />
          </Segment>
          <Segment attached>
            <OrderItemList
              order={purchaseOrder}
              stockTypeOptions={loadStockTypeOptions}
              displayAction={false}
              displaySummary={true}
              displayAmount={true}
            />
          </Segment>
          {purchaseOrder.approvalStatus === Status.PENDING && hasModifyAccess && (
            <Segment attached textAlign="center">
              <Button
                color="green"
                content="Approve"
                disabled={getPurchaseOrderItems.length === 0}
                onClick={() =>
                  openModal(
                    <ApprovalOrder
                      orderId={parseInt(match.params.id, 10)}
                      status={Status.APPROVED}
                      header="Approve the Purchase Order"
                    />
                  )
                }
              />
              <Button
                color="orange"
                content="Cancel"
                onClick={() =>
                  openModal(
                    <ApprovalOrder
                      orderId={parseInt(match.params.id, 10)}
                      status={Status.CANCELLED}
                      header="Cancel the Purchase Order"
                    />
                  )
                }
              />
              <Button
                color="red"
                content="Reject"
                onClick={() =>
                  openModal(
                    <ApprovalOrder
                      orderId={parseInt(match.params.id, 10)}
                      status={Status.REJECTED}
                      header="Reject the Purchase Order"
                    />
                  )
                }
              />
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default observer(ViewPurchaseOrder);
