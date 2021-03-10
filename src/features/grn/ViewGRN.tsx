import { FC, Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Button, Grid, Message, Segment } from "semantic-ui-react";
import {
  APPROVED,
  CANCELLED,
  PENDING,
  REJECTED,
} from "../../app/models/constants";
import GRNSummary from "./GRNSummary";
import GRNItemDetails from "./grnItem/GRNItemDetails";
import GRNFreeItemDetails from "./grnFreeItem/GRNFreeItemDetails";
import GRNFullSummary from "./GRNFullSummary";
import ApprovalGRN from "./ApprovalGRN";

interface IDetailsParams {
  id: string;
}

const ViewGRN: FC<RouteComponentProps<IDetailsParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadGRN,
    grn,
    loadingInitial,
    loadGRNItems,
    getGRNItems,
  } = rootStore.grnStore;
  const { loadStockTypes, loadStockTypeOptions } = rootStore.settingsStore;
  const { hasModifyAccess, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
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
            <GRNFullSummary />
          </Segment>
          <Segment attached>
            <GRNFreeItemDetails
              displayAmount={true}
              displayAction={false}
              grn={grn}
              stockTypeOptions={loadStockTypeOptions}
            />
          </Segment>
          {grn.approvalStatus === PENDING && hasModifyAccess && (
            <Segment attached textAlign="center">
              <Button
                color="green"
                content="Approve"
                disabled={getGRNItems.length === 0 ? true : false}
                onClick={() =>
                  openModal(
                    <ApprovalGRN
                      orderId={parseInt(match.params.id)}
                      status={APPROVED}
                      header="Approve the GRN"
                    />
                  )
                }
              />
              <Button
                color="orange"
                content="Cancel"
                onClick={() =>
                  openModal(
                    <ApprovalGRN
                      orderId={parseInt(match.params.id)}
                      status={CANCELLED}
                      header="Cancel the GRN"
                    />
                  )
                }
              />
              <Button
                color="red"
                content="Reject"
                onClick={() =>
                  openModal(
                    <ApprovalGRN
                      orderId={parseInt(match.params.id)}
                      status={REJECTED}
                      header="Reject the GRN"
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

export default observer(ViewGRN);
