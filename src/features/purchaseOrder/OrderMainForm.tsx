import React, { FC, Fragment, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
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
  const {
    loadSuppliers,
    loadStockItems,
    loadStockTypes,
  } = rootStore.settingsStore;

  useEffect(() => {
    loadSuppliers();
    loadStockItems();
    loadStockTypes();
    if (match.params.id) {
      loadPurchaseOrder(parseInt(match.params.id));
      loadPurchaseOrderItems(parseInt(match.params.id));
    }
  }, [
    loadSuppliers,
    loadStockTypes,
    loadStockItems,
    loadPurchaseOrder,
    loadPurchaseOrderItems,
    match.params.id,
    purchaseOrder,
  ]);

  return (
    <Fragment>
      {match.params.id && purchaseOrder! && (
        <Fragment>
          <PurchaseOrderListItem
            orders={new Array(["1", purchaseOrder])}
            displayColumn={false}
            displayEdit={true}
            displayView={false}
          />
          <OrderItemList
            order={purchaseOrder}
            displayAction={true}
            displaySummary={false}
            displayAmount={false}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(OrderMainForm);
