import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import SupplierList from './SupplierList';

const Supplier = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadSuppliers,
    removePredicate,
    setSupplierPage,
  } = rootStore.supplierStore;
  useEffect(() => {
    removePredicate('name');
    removePredicate('city');
    removePredicate('contactPerson');
    setSupplierPage(1);
    loadSuppliers();
  }, [loadSuppliers, removePredicate, setSupplierPage]);

  return (
    <>
      <SupplierList />
    </>
  );
};

export default observer(Supplier);
