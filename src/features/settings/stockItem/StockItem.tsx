import React, { Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import StockItemList from "./StockItemList";

const StockItem = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadStockItems,
    loadStockTypes,
    loadUnitOfMeasures,
  } = rootStore.settingsStore;
  useEffect(() => {
    loadStockItems();
    loadUnitOfMeasures();
    loadStockTypes();
  }, [loadStockItems, loadUnitOfMeasures, loadStockTypes]);

  return (
    <Fragment>
      <StockItemList />
    </Fragment>
  );
};

export default observer(StockItem);
