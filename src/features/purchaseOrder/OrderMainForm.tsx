import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Table, Icon } from "semantic-ui-react";
import { PurchaseOrderFormValues } from "../../app/models/purchaseOrder";
import { RootStoreContext } from "../../app/stores/rootStore";
import CreatePurchaseOrder from "./CreatePurchaseOrder";
import { observer } from "mobx-react-lite";
import OrderItemList from "./OrderItemList";
import { format } from "date-fns";
import PurchaseOrderListItem from "./PurchaseOrderListItem";

interface IDetailsParams {
  id: string;
}

const OrderMainForm: FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPurchaseOrder,
    loadPurchaseOrderItems,
    purchaseOrder,
  } = rootStore.purchaseOrderStore;
  const { loadSuppliers, loadStockItems } = rootStore.settingsStore;
  const { openModal, closeModal } = rootStore.modalStore;

  useEffect(() => {
    loadSuppliers();
    loadStockItems();
    if (match.params.id) {
      loadPurchaseOrder(parseInt(match.params.id));
      loadPurchaseOrderItems(parseInt(match.params.id));
    }
  }, [
    loadSuppliers,
    loadStockItems,
    loadPurchaseOrder,
    loadPurchaseOrderItems,
    match.params.id,
    purchaseOrder,
  ]);

  const handleCancel = () => {
    history.push("/purchase");
  };

  return (
    <Fragment>
      {match.params.id && purchaseOrder! ? (
        <Fragment>
          <PurchaseOrderListItem
            orders={new Array(["1", purchaseOrder])}
            displayColumn={false}
            displayEdit={true}
            displayView={false}
          />
          <OrderItemList displayAction={true} displayAmount={false} />
        </Fragment>
      ) : (
        <CreatePurchaseOrder
          handleCancel={handleCancel}
          header="Create new purchase order"
          formData={new PurchaseOrderFormValues()}
        />
      )}
    </Fragment>
  );
};

export default observer(OrderMainForm);
