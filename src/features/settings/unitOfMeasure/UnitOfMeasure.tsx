import { Fragment, useContext, useEffect } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import UnitOfMeasureList from './UnitOfMeasureList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

const UnitOfMeasure = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUnitOfMeasures, loadingInitial } = rootStore.unitOfMeasureStore;
  useEffect(() => {
    loadUnitOfMeasures();
  }, [loadUnitOfMeasures]);

  if (loadingInitial)
    return <LoadingComponent content='Loading UOM details...' />;

  return (
    <Fragment>
      <UnitOfMeasureList />
    </Fragment>
  );
};

export default observer(UnitOfMeasure);
