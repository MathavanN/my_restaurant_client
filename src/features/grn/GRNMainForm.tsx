import React, { FC, Fragment, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import GRNList from "./GRNList";

interface IDetailsParams {
  id: string;
}

const GRNMainForm: FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadGRN, loadGRNItems, loadGRNFreeItems, grn } = rootStore.grnStore;
  const { loadPaymentTypes } = rootStore.settingsStore;
  const { loadAppUsers } = rootStore.userStore;
  const { loadPurchaseOrders } = rootStore.purchaseOrderStore;
  useEffect(() => {
    loadPaymentTypes();
    loadAppUsers();
    loadPurchaseOrders();
    if (match.params.id) {
      loadGRN(parseInt(match.params.id));
      loadGRNItems(parseInt(match.params.id));
      loadGRNFreeItems(parseInt(match.params.id));
    }
  }, [
    loadPaymentTypes,
    loadAppUsers,
    loadPurchaseOrders,
    loadGRN,
    loadGRNItems,
    loadGRNFreeItems,
    match.params.id,
  ]);
  return (
    <Fragment>
      {match.params.id && grn! && (
        <Fragment>
          <GRNList
            grns={new Array(["1", grn])}
            displayColumn={false}
            displayEdit={true}
            displayView={false}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default GRNMainForm;
