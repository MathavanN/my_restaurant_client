import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import UnitOfMeasureList from './UnitOfMeasureList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

const UnitOfMeasure = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUnitOfMeasures, loadingInitial } = rootStore.unitOfMeasureStore;
  useEffect(() => {
    loadUnitOfMeasures();
  }, [loadUnitOfMeasures]);

  if (loadingInitial)
    return <LoadingComponent content="Loading UOM details..." />;

  return (
    <>
      <UnitOfMeasureList />
    </>
  );
};

export default observer(UnitOfMeasure);
