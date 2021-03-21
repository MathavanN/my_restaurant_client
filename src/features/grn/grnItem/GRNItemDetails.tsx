import { FC } from 'react';
import { Header } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { IGoodsReceivedNote } from '../../../app/models/goodsReceivedNote';
import GRNItemList from './GRNItemList';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  grn: IGoodsReceivedNote;
  stockTypeOptions: ISelectInputOptions[];
}

const GRNItemDetails: FC<IProps> = ({
  displayAction,
  displayAmount,
  grn,
  stockTypeOptions,
}) => {
  return (
    <>
      <Header size='medium' textAlign='center'>
        GRN Item Details.
      </Header>
      <GRNItemList
        displayAction={displayAction}
        displayAmount={displayAmount}
        grn={grn}
        stockTypeOptions={stockTypeOptions}
      />
    </>
  );
};

export default GRNItemDetails;
