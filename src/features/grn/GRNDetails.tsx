import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Header } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import GRNList from "./GRNList";

const GRNDetails = () => {
  const rootStore = useContext(RootStoreContext);
  const { getGRNs } = rootStore.grnStore;

  return (
    <Fragment>
      <Header as="h3" dividing textAlign="center">
        GRN Details.
      </Header>
      <GRNList
        grns={getGRNs}
        displayColumn={true}
        displayEdit={false}
        displayView={true}
      />
    </Fragment>
  );
};

export default observer(GRNDetails);
