import { FC, useContext } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';
import { IGoodsReceivedNote } from '../../../app/models/goodsReceivedNote/goodsReceivedNote';
import { GoodsReceivedNoteFreeItemFormValues } from '../../../app/models/goodsReceivedNoteFreeItem/goodsReceivedNoteFreeItemFormValues';
import { RootStoreContext } from '../../../app/stores/rootStore';
import CreateGRNFreeItem from './CreateGRNFreeItem';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  grn: IGoodsReceivedNote;
  stockTypeOptions: ISelectInputOptions[];
}

const GRNFreeItemListHeader: FC<IProps> = ({
  displayAction,
  displayAmount,
  grn,
  stockTypeOptions,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <>
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
            <Table.HeaderCell textAlign="center">
              <Button
                animated="vertical"
                color="green"
                onClick={() =>
                  openModal(
                    <CreateGRNFreeItem
                      item={new GoodsReceivedNoteFreeItemFormValues(grn.id)}
                      stockTypeOptions={stockTypeOptions}
                    />
                  )
                }
              >
                <Button.Content hidden>Add</Button.Content>
                <Button.Content visible>
                  <Icon name="add circle" />
                </Button.Content>
              </Button>
            </Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
    </>
  );
};

export default GRNFreeItemListHeader;
