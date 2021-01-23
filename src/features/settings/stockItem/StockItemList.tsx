import React, { Fragment, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Table } from "semantic-ui-react";
import { StockItemFormValues } from "../../../app/models/stockItem";
import FilterStockItem from "./FilterStockItem";
import StockItemListHeader from "./StockItemListHeader";
import StockItemListItem from "./StockItemListItem";
import StockListItemFooter from "./StockListItemFooter";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const StockItemList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadStockTypeOptions,
    loadUnitOfMeasureOptions,
  } = rootStore.settingsStore;

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

  const handleOnPageChange = (page: number) => {
    setStockItemPage(page);
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
    <Fragment>
      <FilterStockItem
        stockTypeOptions={loadStockTypeOptions}
        handleStockItemSearch={handleStockItemSearch}
      />
      {selectedStockType > 0 && (
        <Table compact celled>
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
            getStockItems={getStockItems}
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
    </Fragment>
  );
};

export default observer(StockItemList);
