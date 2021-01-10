import React, { Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Link, RouteComponentProps } from "react-router-dom";
import { FC } from "react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Message, Grid, Segment, Button } from "semantic-ui-react";
import OrderSummary from "./OrderSummary";

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
    loadingInitial,
    purchaseOrder,
  } = rootStore.purchaseOrderStore;

  useEffect(() => {
    loadPurchaseOrder(parseInt(match.params.id));
  }, [loadPurchaseOrder, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading purchase order details..." />;

  if (!purchaseOrder)
    return <Message negative>Purchase order details not found.</Message>;

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={16}>
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
          <Segment attached>
            <OrderSummary order={purchaseOrder} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ViewPurchaseOrder);
