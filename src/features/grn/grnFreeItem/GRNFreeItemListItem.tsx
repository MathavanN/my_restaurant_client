import { useContext, FC } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ISelectInputOptions } from '../../../app/models/common';
import CreateGRNFreeItem from './CreateGRNFreeItem';
import DeleteGRNFreeItem from './DeleteGRNFreeItem';
import { IGoodsReceivedNote } from '../../../app/models/goodsReceivedNote/goodsReceivedNote';
import { GoodsReceivedNoteFreeItemFormValues } from '../../../app/models/goodsReceivedNoteFreeItem/goodsReceivedNoteFreeItemFormValues';

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
  grn: IGoodsReceivedNote;
  stockTypeOptions: ISelectInputOptions[];
}

const GRNFreeItemListItem: FC<IProps> = ({
  displayAction,
  displayAmount,
  grn,
  stockTypeOptions,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { getGRNFreeItems } = rootStore.grnStore;
  const { openModal } = rootStore.modalStore;
  return (
    <>
      <Table.Body>
        {getGRNFreeItems.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.serial}</Table.Cell>
            <Table.Cell>{item.itemName}</Table.Cell>
            <Table.Cell>
              {item.itemUnit}
              {item.unitOfMeasureCode}
            </Table.Cell>
            <Table.Cell>{item.itemUnitPrice}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell>{item.nbt}</Table.Cell>
            <Table.Cell>{item.vat}</Table.Cell>
            <Table.Cell>{item.discount}</Table.Cell>
            {displayAmount && (
              <Table.Cell>
                {(
                  item.itemUnitPrice * item.quantity +
                  item.itemUnitPrice * item.quantity * (item.nbt / 100) +
                  item.itemUnitPrice * item.quantity * (item.vat / 100) -
                  item.itemUnitPrice * item.quantity * (item.discount / 100)
                ).toFixed(2)}
              </Table.Cell>
            )}
            {displayAction && (
              <Table.Cell collapsing textAlign="right">
                <Button
                  animated="vertical"
                  color="orange"
                  onClick={() =>
                    openModal(
                      <CreateGRNFreeItem
                        item={
                          new GoodsReceivedNoteFreeItemFormValues(grn.id, item)
                        }
                        stockTypeOptions={stockTypeOptions}
                      />
                    )
                  }
                >
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
                <Button
                  animated="vertical"
                  color="red"
                  onClick={() => openModal(<DeleteGRNFreeItem item={item} />)}
                >
                  <Button.Content hidden>Delete</Button.Content>
                  <Button.Content visible>
                    <Icon name="delete" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </>
  );
};

export default observer(GRNFreeItemListItem);
