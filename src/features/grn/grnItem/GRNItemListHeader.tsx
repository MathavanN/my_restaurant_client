import React, { FC, Fragment, useContext } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { IGoodsReceivedNote } from '../../../app/models/goodsReceivedNote';
import { GoodsReceivedNoteItemFormValues } from '../../../app/models/goodsReceivedNoteItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import CreateGRNItem from './CreateGRNItem';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  grn: IGoodsReceivedNote;
  stockTypeOptions: ISelectInputOptions[];
}
const GRNItemListHeader: FC<IProps> = ({
  displayAction,
  displayAmount,
  grn,
  stockTypeOptions,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <Fragment>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          <Table.HeaderCell>Item Name</Table.HeaderCell>
          <Table.HeaderCell>Item Unit</Table.HeaderCell>
          <Table.HeaderCell>Unit Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>NBT %</Table.HeaderCell>
          <Table.HeaderCell>VAT %</Table.HeaderCell>
          <Table.HeaderCell>Discount %</Table.HeaderCell>
          {displayAmount && <Table.HeaderCell>Amount</Table.HeaderCell>}
          {displayAction && (
            <Table.HeaderCell textAlign='center'>
              <Button
                animated='vertical'
                color='green'
                onClick={() =>
                  openModal(
                    <CreateGRNItem
                      item={new GoodsReceivedNoteItemFormValues(grn.id)}
                      stockTypeOptions={stockTypeOptions}
                    />
                  )
                }
              >
                <Button.Content hidden>Add</Button.Content>
                <Button.Content visible>
                  <Icon name='add circle' />
                </Button.Content>
              </Button>
            </Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
    </Fragment>
  );
};

export default GRNItemListHeader;
