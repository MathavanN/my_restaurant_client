import { FC, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import GRNList from './GRNList';
import GRNItemDetails from './grnItem/GRNItemDetails';
import GRNFreeItemDetails from './grnFreeItem/GRNFreeItemDetails';

interface IDetailsParams {
  id: string;
}

const GRNMainForm: FC<RouteComponentProps<IDetailsParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadGRN, loadGRNItems, loadGRNFreeItems, grn } = rootStore.grnStore;
  const { loadPaymentTypes } = rootStore.paymentTypeStore;
  const { loadStockTypes, loadStockTypeOptions } = rootStore.stockTypeStore;
  const { loadAppUsers } = rootStore.userStore;
  const { loadPurchaseOrders } = rootStore.purchaseOrderStore;

  useEffect(() => {
    loadPaymentTypes();
    loadAppUsers();
    loadPurchaseOrders();
    loadStockTypes();
    if (match.params.id) {
      loadGRN(parseInt(match.params.id, 10));
      loadGRNItems(parseInt(match.params.id, 10));
      loadGRNFreeItems(parseInt(match.params.id, 10));
    }
  }, [
    loadPaymentTypes,
    loadAppUsers,
    loadPurchaseOrders,
    loadStockTypes,
    loadGRN,
    loadGRNItems,
    loadGRNFreeItems,
    match.params.id,
  ]);
  return (
    <>
      {match.params.id && grn! && (
        <>
          <GRNList
            goodsReceivedNotes={new Array({ ...grn, serial: 1 })}
            displayColumn={false}
            displayEdit={true}
            displayView={false}
          />
          <GRNItemDetails
            displayAction={true}
            displayAmount={false}
            grn={grn}
            stockTypeOptions={loadStockTypeOptions}
          />
          <GRNFreeItemDetails
            displayAction={true}
            displayAmount={false}
            grn={grn}
            stockTypeOptions={loadStockTypeOptions}
          />
        </>
      )}
    </>
  );
};

export default observer(GRNMainForm);
