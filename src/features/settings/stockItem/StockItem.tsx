import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import StockItemList from './StockItemList';

const StockItem = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockTypes } = rootStore.stockTypeStore;
  const { loadUnitOfMeasures } = rootStore.unitOfMeasureStore;
  const { setStockItemPage } = rootStore.stockItemStore;

  useEffect(() => {
    setStockItemPage(1);
    loadUnitOfMeasures();
    loadStockTypes();
  }, [setStockItemPage, loadUnitOfMeasures, loadStockTypes]);

  return (
    <>
      <StockItemList />
    </>
  );
};

export default observer(StockItem);
