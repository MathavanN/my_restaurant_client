import React, { Fragment, useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import UnitOfMeasureList from "./UnitOfMeasureList";
import EditUnitOfMeasure from "./EditUnitOfMeasure";

const UnitOfMeasure = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUnitOfMeasures } = rootStore.settingsStore;
  useEffect(() => {
    loadUnitOfMeasures();
  }, [loadUnitOfMeasures]);
  const [editForm, setEditForm] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Fragment>
      {editForm ? (
        <EditUnitOfMeasure
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
          edit={edit}
          create={create}
        />
      ) : (
        <UnitOfMeasureList
          setEditForm={setEditForm}
          setCreate={setCreate}
          setEdit={setEdit}
        />
      )}
    </Fragment>
  );
};

export default observer(UnitOfMeasure);
