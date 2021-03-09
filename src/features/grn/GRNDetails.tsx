import { observer } from "mobx-react-lite";
import { Fragment, useContext } from "react";
import { Header } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import GRNList from "./GRNList";

const GRNDetails = () => {
  const rootStore = useContext(RootStoreContext);
  const { getGRNs, loadingInitial } = rootStore.grnStore;

  if (loadingInitial) return <LoadingComponent content="Loading GRNs..." />;

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
