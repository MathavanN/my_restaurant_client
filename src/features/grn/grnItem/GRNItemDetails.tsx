import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import GRNItemList from "./GRNItemList";

const GRNItemDetails = () => {
  return (
    <Fragment>
      <Header size="medium" textAlign="center">
        GRN Item Details.
      </Header>
      <GRNItemList />
    </Fragment>
  );
};

export default GRNItemDetails;
