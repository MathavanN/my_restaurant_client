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
    loadSupplierOptions,
    loadStockTypes,
    loadSuppliers,
    loadStockTypeOptions,
  } = rootStore.settingsStore;

  const { loadStockItems } = rootStore.stockItemStore;

  useEffect(() => {
    loadStockTypes();
    loadSuppliers();
    loadStockItems();
    if (match.params.id) {
      loadPurchaseOrder(parseInt(match.params.id));
      loadPurchaseOrderItems(parseInt(match.params.id));
    }
  }, [
    loadPurchaseOrder,
    loadPurchaseOrderItems,
    match.params.id,
    loadStockTypes,
    loadSuppliers,
    loadStockItems,
  ]);

  return (
    <Fragment>
      {match.params.id && purchaseOrder! && (
        <Fragment>
          <PurchaseOrderListItem
            orders={new Array(["1", purchaseOrder])}
            supplierOptions={loadSupplierOptions}
            displayColumn={false}
            displayEdit={true}
            displayView={false}
          />
          <OrderItemList
            order={purchaseOrder}
            stockTypeOptions={loadStockTypeOptions}
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
