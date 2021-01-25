import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import PurchaseOrderListItem from "./PurchaseOrderListItem";

const PurchaseOrderList = () => {
  const rootStore = useContext(RootStoreContext);
  const { getPurchaseOrders } = rootStore.purchaseOrderStore;
  const { loadSupplierOptions } = rootStore.supplierStore;

  return (
    <Fragment>
      <Header as="h3" dividing textAlign="center">
        Purchase Orders.
      </Header>
      <PurchaseOrderListItem
        orders={getPurchaseOrders}
        supplierOptions={loadSupplierOptions}
        displayColumn={true}
        displayEdit={false}
        displayView={true}
      />
    </Fragment>
  );
};

export default observer(PurchaseOrderList);
