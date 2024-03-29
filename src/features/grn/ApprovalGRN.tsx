import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import history from '../../history';
import { ApprovalGoodsReceivedNote } from '../../app/models/goodsReceivedNote/approvalGoodsReceivedNote';

interface IProps {
  header: string;
  orderId: number;
  status: string;
}

const ApprovalGRN: FC<IProps> = ({ header, orderId, status }) => {
  const { register, errors, handleSubmit, setValue, trigger } = useForm();
  const rootStore = useContext(RootStoreContext);
  const { approvalGRN } = rootStore.grnStore;
  const { closeModal } = rootStore.modalStore;
  const onSubmit = (data: ApprovalGoodsReceivedNote) => {
    const approval = { ...data, id: orderId, approvalStatus: status };
    approvalGRN(approval).finally(() => {
      closeModal();
      history.push('/grn');
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

export default observer(ApprovalGRN);
