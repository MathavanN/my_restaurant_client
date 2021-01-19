import React, { Fragment, useContext, useEffect } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import UnitOfMeasureList from "./UnitOfMeasureList";

const UnitOfMeasure = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUnitOfMeasures } = rootStore.settingsStore;
  useEffect(() => {
    loadUnitOfMeasures();
  }, [loadUnitOfMeasures]);

  return (
    <Fragment>
      <UnitOfMeasureList />
    </Fragment>
  );
};

export default observer(UnitOfMeasure);
