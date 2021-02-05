import React, { Fragment } from "react";
import { Table } from "semantic-ui-react";
import GRNItemListHeader from "./GRNItemListHeader";
import GRNItemListItem from "./GRNItemListItem";

const GRNItemList = () => {
  return (
    <Fragment>
      <Table compact celled>
        <GRNItemListHeader displayAction={false} displayAmount={true} />
        <GRNItemListItem displayAction={false} displayAmount={true} />
      </Table>
    </Fragment>
  );
};

export default GRNItemList;
