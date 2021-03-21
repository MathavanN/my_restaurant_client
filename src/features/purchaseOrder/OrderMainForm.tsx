import { FC, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import OrderItemList from './OrderItemList';
import PurchaseOrderListItem from './PurchaseOrderListItem';

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
  const { loadStockTypes, loadStockTypeOptions } = rootStore.stockTypeStore;
  const { loadSupplierOptions, loadAllSuppliers } = rootStore.supplierStore;
  const { loadAllStockItems } = rootStore.stockItemStore;

  useEffect(() => {
    loadStockTypes();
    loadAllSuppliers();
    loadAllStockItems();
    if (match.params.id) {
      loadPurchaseOrder(parseInt(match.params.id));
      loadPurchaseOrderItems(parseInt(match.params.id));
    }
  }, [
    loadPurchaseOrder,
    loadPurchaseOrderItems,
    match.params.id,
    loadStockTypes,
    loadAllSuppliers,
    loadAllStockItems,
  ]);

  return (
    <>
      {match.params.id && purchaseOrder! && (
        <>
          <PurchaseOrderListItem
            orders={new Array(['1', purchaseOrder])}
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
        </>
      )}
    </>
  );
};

export default observer(OrderMainForm);
