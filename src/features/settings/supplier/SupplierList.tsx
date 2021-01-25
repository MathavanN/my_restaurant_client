import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Table } from "semantic-ui-react";
import { SupplierFormValues } from "../../../app/models/supplier";
import FilterSupplier from "./FilterSupplier";
import SupplierListHeader from "./SupplierListHeader";
import SupplierListItem from "./SupplierListItem";
import SupplierListItemFooter from "./SupplierListItemFooter";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const SupplierList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    getSuppliers,
    page,
    getSupplierTotalPages,
    setSupplierPage,
    setPredicate,
    loadSuppliers,
    loadingInitial,
  } = rootStore.supplierStore;
  const { openModal, closeModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;

  const handleSupplierSearch = () => {
    setSupplierPage(1);
    loadSuppliers();
  };
  const handleOnPageChange = (page: number) => {
    setSupplierPage(page);
    loadSuppliers();
  };
  if (loadingInitial && page === 1)
    return <LoadingComponent content="Loading suppliers..." />;

  return (
    <Fragment>
      <FilterSupplier
        handleSupplierSearch={handleSupplierSearch}
        setPredicate={setPredicate}
      />
      <Table compact celled>
        <SupplierListHeader
          hasModifyAccess={hasModifyAccess}
          openModal={openModal}
          supplier={new SupplierFormValues()}
        />
        <SupplierListItem
          hasModifyAccess={hasModifyAccess}
          openModal={openModal}
          closeModal={closeModal}
          suppliers={getSuppliers}
        />
        <SupplierListItemFooter
          page={page}
          totalPages={getSupplierTotalPages}
          handleOnPageChange={handleOnPageChange}
        />
      </Table>
    </Fragment>
  );
};

export default observer(SupplierList);
