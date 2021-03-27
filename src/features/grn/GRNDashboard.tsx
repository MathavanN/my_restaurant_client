import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Button, Icon, Message } from 'semantic-ui-react';
import { CreateGoodsReceivedNote } from '../../app/models/createGoodsReceivedNote';
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
  const { loadGoodsReceivedNotes } = rootStore.grnStore;
  const {
    loadPOForGRN,
    loadApprovedPurchaseOrdersOptions,
  } = rootStore.purchaseOrderStore;
  useEffect(() => {
    loadPaymentTypes();
    loadAppUsers();
    loadPOForGRN();
    loadGoodsReceivedNotes();
  }, [loadPaymentTypes, loadAppUsers, loadPOForGRN, loadGoodsReceivedNotes]);
  return (
    <>
      <Message positive icon>
        <Icon name="shopping basket" />
        <Message.Content>
          <Message.Header>Create new goods received note</Message.Header>
        </Message.Content>
        <Button
          floated="left"
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
    </>
  );
};

export default observer(GRNDashboard);
