import React, { FC, Fragment, useContext } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  displayAmount: boolean;
  displayAction: boolean;
}
const GRNItemListItem: FC<IProps> = ({ displayAction, displayAmount }) => {
  const rootStore = useContext(RootStoreContext);
  const { getGRNItems } = rootStore.grnStore;
  return (
    <Fragment>
      <Table.Body>
        {getGRNItems.map(([group, item]) => (
          <Table.Row key={item.id}>
            <Table.Cell>{group}</Table.Cell>
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
              <Table.Cell>{item.itemUnitPrice * item.quantity}</Table.Cell>
            )}
            {displayAction && (
              <Table.Cell collapsing textAlign="right">
                <Button animated="vertical" color="orange">
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name="edit" />
                  </Button.Content>
                </Button>
                <Button animated="vertical" color="red">
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
    </Fragment>
  );
};

export default observer(GRNItemListItem);
