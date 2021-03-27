import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../app/stores/rootStore';
import GRNList from './GRNList';

const GRNDetails = () => {
  const rootStore = useContext(RootStoreContext);
  const { getGoodsReceivedNotes, loadingInitial } = rootStore.grnStore;

  if (loadingInitial)
    return <LoadingComponent content="Loading Goods received notes..." />;

  return (
    <>
      <Header as="h3" dividing textAlign="center">
        GRN Details.
      </Header>
      <GRNList
        goodsReceivedNotes={getGoodsReceivedNotes}
        displayColumn={true}
        displayEdit={false}
        displayView={true}
      />
    </>
  );
};

export default observer(GRNDetails);
