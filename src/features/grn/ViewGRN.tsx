import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Grid, Message, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import GRNSummary from './GRNSummary';
import GRNItemDetails from './grnItem/GRNItemDetails';
import GRNFreeItemDetails from './grnFreeItem/GRNFreeItemDetails';
import GRNFullSummary from './GRNFullSummary';
import ApprovalGRN from './ApprovalGRN';
import { Status } from '../../app/models/constants';

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
  const { loadStockTypes, loadStockTypeOptions } = rootStore.stockTypeStore;
  const { hasModifyAccess, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  useEffect(() => {
    loadStockTypes();
    if (match.params.id) {
      loadGRN(parseInt(match.params.id, 10));
      loadGRNItems(parseInt(match.params.id, 10));
    }
  }, [loadStockTypes, loadGRN, loadGRNItems, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading GRN details..." />;

  if (!grn) return <Message negative>GRN not found.</Message>;
  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          {grn.approvalStatus === Status.PENDING &&
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
          {grn.approvalStatus === Status.PENDING && hasModifyAccess && (
            <Segment attached textAlign="center">
              <Button
                color="green"
                content="Approve"
                disabled={getGRNItems.length === 0}
                onClick={() =>
                  openModal(
                    <ApprovalGRN
                      orderId={parseInt(match.params.id, 10)}
                      status={Status.APPROVED}
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
                      orderId={parseInt(match.params.id, 10)}
                      status={Status.CANCELLED}
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
                      orderId={parseInt(match.params.id, 10)}
                      status={Status.REJECTED}
                      header="Reject the GRN"
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

export default observer(ViewGRN);
