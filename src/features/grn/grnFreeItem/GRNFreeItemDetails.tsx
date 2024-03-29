import { FC } from 'react';
import { Header } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { IGoodsReceivedNote } from '../../../app/models/goodsReceivedNote/goodsReceivedNote';
import GRNFreeItemList from './GRNFreeItemList';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  grn: IGoodsReceivedNote;
  stockTypeOptions: ISelectInputOptions[];
}

const GRNFreeItemDetails: FC<IProps> = ({
  displayAction,
  displayAmount,
  grn,
  stockTypeOptions,
}) => (
  <>
    <Header size="medium" textAlign="center">
      GRN Free Item Details.
    </Header>
    <GRNFreeItemList
      displayAction={displayAction}
      displayAmount={displayAmount}
      grn={grn}
      stockTypeOptions={stockTypeOptions}
    />
  </>
);

export default GRNFreeItemDetails;
