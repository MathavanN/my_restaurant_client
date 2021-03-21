import { FC, Fragment } from 'react';
import { Table } from 'semantic-ui-react';
import { IGoodsReceivedNote } from '../../app/models/goodsReceivedNote';
import GRNListItem from './GRNListItem';
import GRNListItemHeader from './GRNListItemHeader';

interface IProps {
  grns: [string, IGoodsReceivedNote][];
  displayColumn: boolean;
  displayView: boolean;
  displayEdit: boolean;
}

const GRNList: FC<IProps> = ({
  grns,
  displayColumn,
  displayEdit,
  displayView,
}) => {
  return (
    <Fragment>
      <Table compact celled>
        <GRNListItemHeader displayColumn={displayColumn} />
        <GRNListItem
          grns={grns}
          displayColumn={displayColumn}
          displayEdit={displayEdit}
          displayView={displayView}
        />
      </Table>
    </Fragment>
  );
};

export default GRNList;
