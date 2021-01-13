import React from "react";
import { observer } from "mobx-react-lite";
import OrderItemList from "./OrderItemList";

const OrderItemSummary = () => {
  return <OrderItemList displayAction={false} displayAmount={true} />;
};

export default observer(OrderItemSummary);
