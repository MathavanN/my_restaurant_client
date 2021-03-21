import { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import SupplierList from './SupplierList';

const Supplier = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadSuppliers } = rootStore.supplierStore;
  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  return (
    <Fragment>
      <SupplierList />
    </Fragment>
  );
};

export default observer(Supplier);
