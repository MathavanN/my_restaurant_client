import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../app/stores/rootStore';
import PurchaseOrderListItem from './PurchaseOrderListItem';

const PurchaseOrderList = () => {
  const rootStore = useContext(RootStoreContext);
  const { getPurchaseOrders, loadingInitial } = rootStore.purchaseOrderStore;
  const { loadSupplierOptions } = rootStore.supplierStore;

  if (loadingInitial)
    return <LoadingComponent content='Loading purchase orders...' />;

  return (
    <>
      <Header as='h3' dividing textAlign='center'>
        Purchase Orders.
      </Header>
      <PurchaseOrderListItem
        orders={getPurchaseOrders}
        supplierOptions={loadSupplierOptions}
        displayColumn={true}
        displayEdit={false}
        displayView={true}
      />
    </>
  );
};

export default observer(PurchaseOrderList);
