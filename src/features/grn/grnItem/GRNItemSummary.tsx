import React, { useContext } from "react";
import { Grid, Table, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const GRNItemSummary = () => {
  const rootStore = useContext(RootStoreContext);
  const { grnItemSummaryRegistry } = rootStore.grnStore;

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
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("total")).toFixed(
                        2
                      )}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Total NBT</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("nbt")).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Total VAT</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("vat")).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Total Discount</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {parseFloat(
                        grnItemSummaryRegistry.get("discount")
                      ).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>GRN Grand Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {(
                        parseFloat(grnItemSummaryRegistry.get("total")) +
                        parseFloat(grnItemSummaryRegistry.get("vat")) +
                        parseFloat(grnItemSummaryRegistry.get("nbt")) -
                        parseFloat(grnItemSummaryRegistry.get("discount"))
                      ).toFixed(2)}
                    </Header.Content>
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
