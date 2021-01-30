import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Button, Icon, Message } from "semantic-ui-react";
import { CreateGoodsReceivedNote } from "../../app/models/goodsReceivedNote";
import { RootStoreContext } from "../../app/stores/rootStore";
import AddGRN from "./AddGRN";

const GRNDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { loadPaymentTypes, loadPaymentTypeOptions } = rootStore.settingsStore;
  const { loadAppUsers, loadAppUsersOptions } = rootStore.userStore;
  const {
    loadPurchaseOrders,
    loadApprovedPurchaseOrdersOptions,
  } = rootStore.purchaseOrderStore;
  useEffect(() => {
    loadPaymentTypes();
    loadAppUsers();
    loadPurchaseOrders();
  }, [loadPaymentTypes, loadAppUsers, loadPurchaseOrders]);
  return (
    <Fragment>
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
                grn={new CreateGoodsReceivedNote()}
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
    </Fragment>
  );
};

export default observer(GRNDashboard);
