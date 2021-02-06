import React, { Fragment, FC } from "react";
import { Header } from "semantic-ui-react";
import GRNFreeItemList from "./GRNFreeItemList";

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
}

const GRNFreeItemDetails: FC<IProps> = ({ displayAction, displayAmount }) => {
  return (
    <Fragment>
      <Header size="medium" textAlign="center">
        GRN Free Item Details.
      </Header>
      <GRNFreeItemList
        displayAction={displayAction}
        displayAmount={displayAmount}
      />
    </Fragment>
  );
};

export default GRNFreeItemDetails;
