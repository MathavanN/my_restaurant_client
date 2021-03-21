import { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { IGoodsReceivedNote } from '../../app/models/goodsReceivedNote';
import GRNListItem from './GRNListItem';
import GRNListItemHeader from './GRNListItemHeader';

interface IProps {
  goodsReceivedNotes: [string, IGoodsReceivedNote][];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}

const GRNList: FC<IProps> = ({
  goodsReceivedNotes,
  displayColumn,
  displayEdit,
  displayView,
}) => {
  return (
    <>
      <Table compact celled>
        <GRNListItemHeader displayColumn={displayColumn} />
        <GRNListItem
          goodsReceivedNotes={goodsReceivedNotes}
          displayColumn={displayColumn}
          displayEdit={displayEdit}
          displayView={displayView}
        />
      </Table>
    </>
  );
};

export default GRNList;
