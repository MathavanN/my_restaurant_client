import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import GRNFreeItemList from "./GRNFreeItemList";

const GRNFreeItemDetails = () => {
  return (
    <Fragment>
      <Header size="medium" textAlign="center">
        GRN Free Item Details.
      </Header>
      <GRNFreeItemList />
    </Fragment>
  );
};

export default GRNFreeItemDetails;
