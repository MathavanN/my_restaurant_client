import { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { IGoodsReceivedNoteSerial } from '../../app/models/goodsReceivedNote';
import GRNListItem from './GRNListItem';
import GRNListItemHeader from './GRNListItemHeader';

interface IProps {
  goodsReceivedNotes: IGoodsReceivedNoteSerial[];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}

const GRNList: FC<IProps> = ({
  goodsReceivedNotes,
  displayColumn,
  displayEdit,
  displayView,
}) => (
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

export default GRNList;
