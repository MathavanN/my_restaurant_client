import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Button, Header, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { format, isEqual } from "date-fns";
import { Link } from "react-router-dom";
import PurchaseOrderListItem from "./PurchaseOrderListItem";

const PurchaseOrderList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPurchaseOrders,
    getPurchaseOrders,
  } = rootStore.purchaseOrderStore;

  useEffect(() => {
    loadPurchaseOrders();
  }, [loadPurchaseOrders]);
  return (
    <Fragment>
      <Header as="h3" dividing textAlign="center">
        Purchase Orders.
      </Header>
      <PurchaseOrderListItem
        orders={getPurchaseOrders}
        displayColumn={true}
        displayEdit={false}
        displayView={true}
      />
    </Fragment>
  );
};

export default observer(PurchaseOrderList);
