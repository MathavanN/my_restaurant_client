import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Table } from "semantic-ui-react";
import { StockItemFormValues } from "../../../app/models/stockItem";
import FilterStockItem from "./FilterStockItem";
import StockItemListHeader from "./StockItemListHeader";
import StockItemListItem from "./StockItemListItem";
import StockListItemFooter from "./StockListItemFooter";

const StockItemList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadStockTypeOptions,
    loadUnitOfMeasureOptions,
  } = rootStore.settingsStore;

  const {
    loadStockItems,
    loadStockItems1,
    getStockItems,
    getStockItemTotalPages,
    page,
    setStockItemPage,
    setPredicate,
  } = rootStore.stockItemStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;

  return (
    <Fragment>
      <FilterStockItem
        stockTypeOptions={loadStockTypeOptions}
        setPredicate={setPredicate}
        loadStockItems={loadStockItems1}
      />
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
          setPage={setStockItemPage}
          loadStockItems={loadStockItems}
        />
      </Table>
    </Fragment>
  );
};

export default observer(StockItemList);
