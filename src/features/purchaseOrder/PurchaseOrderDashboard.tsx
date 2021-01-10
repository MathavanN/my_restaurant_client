import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Message, Icon, Button } from "semantic-ui-react";
import PurchaseOrderList from "./PurchaseOrderList";

const PurchaseOrderDashboard = () => {
  return (
    <Fragment>
      <Message info icon>
        <Icon name="shopping cart" />
        <Message.Content>
          <Message.Header>Create new purchase order</Message.Header>
        </Message.Content>
        <Button floated="left" as={Link} to="/purchase/create">
          Create
        </Button>
      </Message>
      <PurchaseOrderList />
    </Fragment>
  );
};

export default observer(PurchaseOrderDashboard);
