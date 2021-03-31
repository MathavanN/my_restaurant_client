import { useContext, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PaymentTypeListHeader from './PaymentTypeListHeader';
import PaymentTypeListItem from './PaymentTypeListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { PaymentTypeFormValues } from '../../../app/models/paymentType/paymentTypeFormValues';

const PaymentTypeList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPaymentTypes,
    getPaymentTypes,
    loadingInitial,
  } = rootStore.paymentTypeStore;
  const { openModal } = rootStore.modalStore;
  const { hasModifyAccess } = rootStore.userStore;
  useEffect(() => {
    loadPaymentTypes();
  }, [loadPaymentTypes]);

  if (loadingInitial)
    return <LoadingComponent content="Loading payment type details..." />;

  return (
    <>
      <Table compact celled striped color="red">
        <PaymentTypeListHeader
          hasModifyAccess={hasModifyAccess}
          openModal={openModal}
          paymentType={new PaymentTypeFormValues()}
        />
        <PaymentTypeListItem
          hasModifyAccess={hasModifyAccess}
          openModal={openModal}
          paymentTypes={getPaymentTypes}
        />
      </Table>
    </>
  );
};

export default observer(PaymentTypeList);
