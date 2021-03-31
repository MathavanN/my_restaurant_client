import { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { IGoodsReceivedNote } from '../../../app/models/goodsReceivedNote/goodsReceivedNote';
import GRNItemListHeader from './GRNItemListHeader';
import GRNItemListItem from './GRNItemListItem';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  grn: IGoodsReceivedNote;
  stockTypeOptions: ISelectInputOptions[];
}

const GRNItemList: FC<IProps> = ({
  displayAction,
  displayAmount,
  grn,
  stockTypeOptions,
}) => (
  <>
    <Table compact celled>
      <GRNItemListHeader
        displayAction={displayAction}
        displayAmount={displayAmount}
        grn={grn}
        stockTypeOptions={stockTypeOptions}
      />
      <GRNItemListItem
        displayAction={displayAction}
        displayAmount={displayAmount}
        grn={grn}
        stockTypeOptions={stockTypeOptions}
      />
    </Table>
  </>
);

export default GRNItemList;
