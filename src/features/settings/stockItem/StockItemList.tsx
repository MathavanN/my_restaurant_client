import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'semantic-ui-react';
import FilterStockItem from './FilterStockItem';
import StockItemListHeader from './StockItemListHeader';
import StockItemListItem from './StockItemListItem';
import StockListItemFooter from './StockListItemFooter';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { StockItemFormValues } from '../../../app/models/stockItem/stockItemFormValues';

const StockItemList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockTypeOptions } = rootStore.stockTypeStore;
  const { loadUnitOfMeasureOptions } = rootStore.unitOfMeasureStore;

  const {
    loadStockItems,
    getStockItems,
    getStockItemTotalPages,
    page,
    setStockItemPage,
    loadingInitial,
  } = rootStore.stockItemStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;
  const [selectedStockType, setSelectedStockType] = useState(0);

  const handleStockItemSearch = (typeId: number) => {
    setStockItemPage(1);
    setSelectedStockType(typeId);
    loadStockItems(typeId);
  };

  const handleOnPageChange = (selectedPage: number) => {
    setStockItemPage(selectedPage);
    loadStockItems(selectedStockType);
  };

  useEffect(() => {
    if (loadStockTypeOptions.length > 0) {
      setSelectedStockType(loadStockTypeOptions[0].key);
      loadStockItems(loadStockTypeOptions[0].key);
    }
  }, [loadStockTypeOptions, loadStockItems]);

  if (loadStockTypeOptions.length === 0)
    return <LoadingComponent content="Cannot find stock type..." />;

  if (loadingInitial && page === 1)
    return <LoadingComponent content="Loading stock items..." />;

  return (
    <>
      <FilterStockItem
        stockTypeOptions={loadStockTypeOptions}
        selectedStockType={selectedStockType}
        handleStockItemSearch={handleStockItemSearch}
      />
      {selectedStockType > 0 && (
        <Table compact celled striped color="red">
          <StockItemListHeader
            hasModifyAccess={hasModifyAccess}
            openModal={openModal}
            stockItem={new StockItemFormValues()}
            stockTypeOptions={loadStockTypeOptions}
            unitOfMeasureOptions={loadUnitOfMeasureOptions}
          />
          <StockItemListItem
            hasModifyAccess={hasModifyAccess}
            openModal={openModal}
            stockItems={getStockItems}
            stockTypeOptions={loadStockTypeOptions}
            unitOfMeasureOptions={loadUnitOfMeasureOptions}
          />
          <StockListItemFooter
            page={page}
            totalPages={getStockItemTotalPages}
            handleOnPageChange={handleOnPageChange}
          />
        </Table>
      )}
    </>
  );
};

export default observer(StockItemList);
