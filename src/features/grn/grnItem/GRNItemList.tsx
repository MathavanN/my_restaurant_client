import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";
import GRNItemListHeader from "./GRNItemListHeader";
import GRNItemListItem from "./GRNItemListItem";

const GRNItemList = () => {
  return (
    <Fragment>
      <Table compact celled>
        <GRNItemListHeader />
        <GRNItemListItem />
      </Table>
    </Fragment>
  );
};

export default GRNItemList;
