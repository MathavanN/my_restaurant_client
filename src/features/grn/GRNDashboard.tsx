import { observer } from 'mobx-react-lite';
import { Fragment, useContext, useEffect } from 'react';
import { Button, Icon, Message } from 'semantic-ui-react';
import { CreateGoodsReceivedNote } from '../../app/models/goodsReceivedNote';
import { RootStoreContext } from '../../app/stores/rootStore';
import AddGRN from './AddGRN';
import GRNDetails from './GRNDetails';

const GRNDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const {
    loadPaymentTypes,
    loadPaymentTypeOptions,
  } = rootStore.paymentTypeStore;
  const { loadAppUsers, loadAppUsersOptions } = rootStore.userStore;
  const { loadGRNs } = rootStore.grnStore;
  const {
    loadPOForGRN,
    loadApprovedPurchaseOrdersOptions,
  } = rootStore.purchaseOrderStore;
  useEffect(() => {
    loadPaymentTypes();
    loadAppUsers();
    loadPOForGRN();
    loadGRNs();
  }, [loadPaymentTypes, loadAppUsers, loadPOForGRN, loadGRNs]);
  return (
    <Fragment>
      <Message positive icon>
        <Icon name='shopping basket' />
        <Message.Content>
          <Message.Header>Create new goods received note</Message.Header>
        </Message.Content>
        <Button
          floated='left'
          onClick={() =>
            openModal(
              <AddGRN
                goodsReceivedNote={new CreateGoodsReceivedNote()}
                purchaseOrderOptions={loadApprovedPurchaseOrdersOptions}
                paymentTypeOptions={loadPaymentTypeOptions}
                userOptions={loadAppUsersOptions}
              />
            )
          }
        >
          Create
        </Button>
      </Message>
      <GRNDetails />
    </Fragment>
  );
};

export default observer(GRNDashboard);
