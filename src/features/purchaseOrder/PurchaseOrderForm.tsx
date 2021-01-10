import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import CreatePurchaseOrder from "./CreatePurchaseOrder";

const PurchaseOrderForm: FC<RouteComponentProps> = ({ history, location }) => {
  //return <CreatePurchaseOrder  />;
  return <div>TEst</div>;
};

export default observer(PurchaseOrderForm);
