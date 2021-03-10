import { useContext } from "react";
import { Grid, Table, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";

const GRNFullSummary = () => {
  const rootStore = useContext(RootStoreContext);
  const { grnItemSummaryRegistry } = rootStore.grnStore;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Table celled color="orange">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Item Summary</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>Item Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
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
                  <Header as="h5">
                    <Header.Content>Total Item NBT</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("nbt")).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>Total Item VAT</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("vat")).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>Total Item Discount</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
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
                  <Header as="h5">
                    <Header.Content>Item Grand Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(
                        grnItemSummaryRegistry.get("grandTotal")
                      ).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column width={8}>
          <Table celled color="red">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">GRN Summary</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>GRN Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(
                        grnItemSummaryRegistry.get("grandTotal")
                      ).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>Total GRN NBT</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("grnNBT")).toFixed(
                        2
                      )}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>Total GRN VAT</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(grnItemSummaryRegistry.get("grnVAT")).toFixed(
                        2
                      )}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>Total GRN Discount</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(
                        grnItemSummaryRegistry.get("grnDiscount")
                      ).toFixed(2)}
                    </Header.Content>
                  </Header>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>GRN Grand Total</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as="h5">
                    <Header.Content>
                      {parseFloat(
                        grnItemSummaryRegistry.get("grnGrandTotal")
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

export default observer(GRNFullSummary);
