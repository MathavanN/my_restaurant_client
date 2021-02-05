import React, { Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Link, RouteComponentProps } from "react-router-dom";
import { FC } from "react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Message, Grid, Segment, Button } from "semantic-ui-react";
import OrderSummary from "./OrderSummary";
import OrderItemList from "./OrderItemList";
import { ApprovalOrder } from "./ApprovalOrder";
import {
  APPROVED,
  CANCELLED,
  PENDING,
  REJECTED,
} from "../../app/models/constants";

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
  const { loadStockTypes, loadStockTypeOptions } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const { user, hasModifyAccess } = rootStore.userStore;

  useEffect(() => {
    loadStockTypes();
    loadPurchaseOrder(parseInt(match.params.id));
    loadPurchaseOrderItems(parseInt(match.params.id));
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
    <Fragment>
      <Grid>
        <Grid.Column width={16}>
          {purchaseOrder.approvalStatus === PENDING &&
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
          {purchaseOrder.approvalStatus === PENDING &&
            hasModifyAccess && (
              <Segment attached textAlign="center">
                <Button
                  color="green"
                  content="Approve"
                  disabled={getPurchaseOrderItems.length === 0 ? true : false}
                  onClick={() =>
                    openModal(
                      <ApprovalOrder
                        orderId={parseInt(match.params.id)}
                        status={APPROVED}
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
                        orderId={parseInt(match.params.id)}
                        status={CANCELLED}
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
                        orderId={parseInt(match.params.id)}
                        status={REJECTED}
                        header="Reject the Purchase Order"
                      />
                    )
                  }
                />
              </Segment>
            )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ViewPurchaseOrder);
