import React, { FC, Fragment, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PurchaseOrderFormValues } from "../../app/models/purchaseOrder";
import { RootStoreContext } from "../../app/stores/rootStore";
import CreatePurchaseOrder from "./AddPurchaseOrder";
import { observer } from "mobx-react-lite";
import OrderItemList from "./OrderItemList";
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
          <OrderItemList order={purchaseOrder} displayAction={true} displayAmount={false} />
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
