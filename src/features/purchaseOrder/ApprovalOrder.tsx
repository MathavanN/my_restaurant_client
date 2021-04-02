import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { ApprovalPurchaseOrder } from '../../app/models/purchaseOrder/approvalPurchaseOrder';
import { RootStoreContext } from '../../app/stores/rootStore';
import history from '../../history';

interface IProps {
  header: string;
  orderId: number;
  status: string;
}

const ApprovalOrder: FC<IProps> = ({ header, orderId, status }) => {
  const { register, errors, handleSubmit, setValue, trigger } = useForm();
  const rootStore = useContext(RootStoreContext);
  const { approvalPurchaseOrder } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;
  const onSubmit = (data: ApprovalPurchaseOrder) => {
    const approval = { ...data, id: orderId, approvalStatus: status };
    approvalPurchaseOrder(approval).finally(() => {
      closeModal();
      history.push('/purchase');
    });
  };
  useEffect(() => {
    register(
      { name: 'approvalReason' },
      {
        required: 'Reason is required',
        maxLength: {
          value: 500,
          message: 'Reason maximum characters 500',
        },
      }
    );
  }, [register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>{header}</Header.Subheader>
        </Header>
        <Form.TextArea
          label="Reason"
          name="approvalReason"
          placeholder="Reason..."
          rows={4}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.approvalReason && (
              <Label basic color="red" pointing>
                {errors.approvalReason.message}
              </Label>
            )
          }
        />
        <Button type="submit" color="teal" fluid>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default observer(ApprovalOrder);
