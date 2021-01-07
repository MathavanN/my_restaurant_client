import React, { Fragment, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import EditStockItem from "./EditStockItem";
import StockItemList from "./StockItemList";

const StockItem = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadStockItems } = rootStore.settingsStore;
  useEffect(() => {
    loadStockItems();
  }, [loadStockItems]);
  const [editForm, setEditForm] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Fragment>
      {editForm ? (
        <EditStockItem
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
          edit={edit}
          create={create}
        />
      ) : (
        <StockItemList
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
        />
      )}
    </Fragment>
  );
};

export default observer(StockItem);
