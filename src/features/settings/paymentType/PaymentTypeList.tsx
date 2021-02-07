import React, { Fragment, useContext, useEffect } from "react";
import { Table } from "semantic-ui-react";
import PaymentTypeListHeader from "./PaymentTypeListHeader";
import PaymentTypeListItem from "./PaymentTypeListItem";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { PaymentTypeFormValues } from "../../../app/models/paymentType";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const PaymentTypeList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPaymentTypes,
    getPaymentTypes,
    loadingInitial,
  } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;
  useEffect(() => {
    loadPaymentTypes();
  }, [loadPaymentTypes]);

  if (loadingInitial)
    return <LoadingComponent content="Loading payment type details..." />;

  return (
    <Fragment>
      <Table compact celled>
        <PaymentTypeListHeader
          hasModifyAccess={hasModifyAccess}
          openModal={openModal}
          paymentType={new PaymentTypeFormValues()}
        />
        <PaymentTypeListItem
          hasModifyAccess={hasModifyAccess}
          openModal={openModal}
          paymentTypes={getPaymentTypes}
        />
      </Table>
    </Fragment>
  );
};

export default observer(PaymentTypeList);
