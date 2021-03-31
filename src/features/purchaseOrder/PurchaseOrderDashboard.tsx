import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Message, Icon, Button } from 'semantic-ui-react';
import { PurchaseOrderFormValues } from '../../app/models/purchaseOrder/purchaseOrderFormValues';
import { RootStoreContext } from '../../app/stores/rootStore';
import AddPurchaseOrder from './AddPurchaseOrder';
import PurchaseOrderList from './PurchaseOrderList';

const PurchaseOrderDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { loadAllSuppliers, loadSupplierOptions } = rootStore.supplierStore;
  const { loadAllStockItems } = rootStore.stockItemStore;
  const { loadPurchaseOrders } = rootStore.purchaseOrderStore;
  useEffect(() => {
    loadAllSuppliers();
    loadAllStockItems();
    loadPurchaseOrders();
  }, [loadAllSuppliers, loadAllStockItems, loadPurchaseOrders]);
  return (
    <>
      <Message info icon>
        <Icon name="shopping cart" />
        <Message.Content>
          <Message.Header>Create new purchase order</Message.Header>
        </Message.Content>
        <Button
          floated="left"
          onClick={() =>
            openModal(
              <AddPurchaseOrder
                order={new PurchaseOrderFormValues()}
                supplierOptions={loadSupplierOptions}
              />
            )
          }
        >
          Create
        </Button>
      </Message>
      <PurchaseOrderList />
    </>
  );
};

export default observer(PurchaseOrderDashboard);
