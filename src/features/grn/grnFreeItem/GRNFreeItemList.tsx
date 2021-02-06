import React, { Fragment, FC } from "react";
import { Table } from "semantic-ui-react";
import GRNFreeItemListHeader from "./GRNFreeItemListHeader";
import GRNFreeItemListItem from "./GRNFreeItemListItem";

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
}

const GRNItemList: FC<IProps> = ({ displayAction, displayAmount }) => {
  return (
    <Fragment>
      <Table compact celled>
        <GRNFreeItemListHeader
          displayAction={displayAction}
          displayAmount={displayAmount}
        />
        <GRNFreeItemListItem
          displayAction={displayAction}
          displayAmount={displayAmount}
        />
      </Table>
    </Fragment>
  );
};

export default GRNItemList;
