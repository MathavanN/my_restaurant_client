import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import StockTypeList from './StockTypeList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

const StockType = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockTypes, loadingInitial } = rootStore.stockTypeStore;
  useEffect(() => {
    loadStockTypes();
  }, [loadStockTypes]);

  if (loadingInitial)
    return <LoadingComponent content='Loading stock type details...' />;

  return (
    <>
      <StockTypeList />
    </>
  );
};

export default observer(StockType);
