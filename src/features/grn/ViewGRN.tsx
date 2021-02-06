import React, { FC, Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Button, Grid, Message, Segment } from "semantic-ui-react";
import { PENDING } from "../../app/models/constants";
import GRNSummary from "./GRNSummary";
import GRNItemDetails from "./grnItem/GRNItemDetails";
import GRNFreeItemDetails from "./grnFreeItem/GRNFreeItemDetails";
import GRNItemSummary from "./grnItem/GRNItemSummary";

interface IDetailsParams {
  id: string;
}

const ViewGRN: FC<RouteComponentProps<IDetailsParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadGRN, grn, loadingInitial, loadGRNItems } = rootStore.grnStore;
  const { loadStockTypes, loadStockTypeOptions } = rootStore.settingsStore;
  const { hasModifyAccess, user } = rootStore.userStore;
  useEffect(() => {
    loadStockTypes();
    if (match.params.id) {
      loadGRN(parseInt(match.params.id));
      loadGRNItems(parseInt(match.params.id));
    }
  }, [loadStockTypes, loadGRN, loadGRNItems, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading GRN details..." />;

  if (!grn) return <Message negative>GRN not found.</Message>;
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={16}>
          {grn.approvalStatus === PENDING &&
            (hasModifyAccess || grn.receivedBy === user?.userId) && (
              <Segment attached="top" textAlign="center">
                <Message info icon>
                  <Message.Content>
                    <Message.Header>GRN Details</Message.Header>
                  </Message.Content>
                  <Button
                    floated="left"
                    as={Link}
                    to={`/grn/manage/${match.params.id}`}
                  >
                    Modify
                  </Button>
                </Message>
              </Segment>
            )}
          <Segment attached>
            <GRNSummary grn={grn} />
          </Segment>
          <Segment attached>
            <GRNItemDetails
              displayAmount={true}
              displayAction={false}
              grn={grn}
              stockTypeOptions={loadStockTypeOptions}
            />
          </Segment>
          <Segment attached>
            <GRNItemSummary />
          </Segment>
          <Segment attached>
            <GRNFreeItemDetails displayAmount={true} displayAction={false} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ViewGRN);
