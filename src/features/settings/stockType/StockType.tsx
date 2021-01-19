import React, { Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import StockTypeList from "./StockTypeList";

const StockType = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockTypes } = rootStore.settingsStore;
  useEffect(() => {
    loadStockTypes();
  }, [loadStockTypes]);

  return (
    <Fragment>
      <StockTypeList />
    </Fragment>
  );
};

export default observer(StockType);
