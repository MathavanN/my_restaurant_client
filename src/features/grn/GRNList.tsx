import React, { FC, Fragment } from "react";
import { Table } from "semantic-ui-react";
import { IGoodsReceivedNote } from "../../app/models/goodsReceivedNote";
import GRNListItem from "./GRNListItem";
import GRNListItemHeader from "./GRNListItemHeader";

interface IProps {
  grns: [string, IGoodsReceivedNote][];
}

const GRNList: FC<IProps> = ({ grns }) => {
  return (
    <Fragment>
      <Table compact celled>
        <GRNListItemHeader />
        <GRNListItem grns={grns} />
      </Table>
    </Fragment>
  );
};

export default GRNList;
