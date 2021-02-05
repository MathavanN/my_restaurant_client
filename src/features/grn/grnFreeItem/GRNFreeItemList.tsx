import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";
import GRNFreeItemListHeader from "./GRNFreeItemListHeader";
import GRNFreeItemListItem from "./GRNFreeItemListItem";

const GRNItemList = () => {
  return (
    <Fragment>
      <Table compact celled>
        <GRNFreeItemListHeader />
        <GRNFreeItemListItem />
      </Table>
    </Fragment>
  );
};

export default GRNItemList;
