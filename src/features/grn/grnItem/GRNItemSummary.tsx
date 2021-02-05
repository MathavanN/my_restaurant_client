import React, { FC, useContext } from "react";
import { Grid, Table, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const GRNItemSummary = () => {
  const rootStore = useContext(RootStoreContext);
  const { getGRNItems } = rootStore.grnStore;
  const orderTotal = getGRNItems.reduce(
    (total, [group, item]) => total + item.itemUnitPrice * item.quantity,
    0
  );
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}></Grid.Column>
        <Grid.Column width={8}>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>GRN Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>{orderTotal}</Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(GRNItemSummary);
