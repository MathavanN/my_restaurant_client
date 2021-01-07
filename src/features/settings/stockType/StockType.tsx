import React, { Fragment, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import EditStockType from "./EditStockType";
import StockTypeList from "./StockTypeList";

const StockType = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockTypes } = rootStore.settingsStore;
  useEffect(() => {
    loadStockTypes();
  }, [loadStockTypes]);
  const [editForm, setEditForm] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Fragment>
      {editForm ? (
        <EditStockType
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
          edit={edit}
          create={create}
        />
      ) : (
        <StockTypeList
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
        />
      )}
    </Fragment>
  );
};

export default observer(StockType);
