import React, { Fragment, useContext, useEffect } from "react";
import { Table } from "semantic-ui-react";
import PaymentTypeListHeader from "./PaymentTypeListHeader";
import PaymentTypeListItem from "./PaymentTypeListItem";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { PaymentTypeFormValues } from "../../../app/models/paymentType";

const PaymentTypeList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadPaymentTypes, getPaymentTypes } = rootStore.settingsStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;
  useEffect(() => {
    loadPaymentTypes();
  }, [loadPaymentTypes]);
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
