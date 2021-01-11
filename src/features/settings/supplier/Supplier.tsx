import React, { Fragment, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import EditSupplier from "./EditSupplier";
import SupplierList from "./SupplierList";

const Supplier = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadSuppliers } = rootStore.settingsStore;
  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);
  const [editForm, setEditForm] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Fragment>
      {editForm ? (
        <EditSupplier
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
          edit={edit}
          create={create}
        />
      ) : (
        <SupplierList
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
        />
      )}
    </Fragment>
  );
};

export default observer(Supplier);
