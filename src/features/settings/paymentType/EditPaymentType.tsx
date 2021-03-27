import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { PaymentTypeFormValues } from '../../../app/models/paymentType';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';

interface IProps {
  paymentType: PaymentTypeFormValues;
}
const EditPaymentType: FC<IProps> = ({ paymentType }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const { createPaymentType, updatePaymentType } = rootStore.paymentTypeStore;

  const onSubmit = (data: any) => {
    const formData = new PaymentTypeFormValues({ ...data, id: paymentType.id });
    if (formData.id === 0)
      createPaymentType(formData)
        .then(() => {
          toast.success('Payment type created successfully');
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text='Error:' />);
        });
    else
      updatePaymentType(formData)
        .then(() => {
          toast.success('Payment type updated successfully');
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text='Error:' />);
        });
  };

  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: paymentType,
  });

  useEffect(() => {
    register(
      { name: 'name' },
      {
        required: 'Payment type name is required',
        maxLength: {
          value: 30,
          message: 'Payment type name maximum characters 30',
        },
      }
    );
    register(
      { name: 'creditPeriod' },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 10) >= 0
              ? true
              : 'Credit period must be a positive number',
        },
      }
    );
  }, [register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} error>
        <Header as='h2' color='teal' textAlign='center'>
          <Header.Subheader>
            {paymentType.id === 0
              ? 'Add new Payment Type'
              : 'Modify Payment Type'}
          </Header.Subheader>
        </Header>
        <Form.Input
          name='name'
          fluid
          label='Payment Type Name'
          placeholder='Payment type name'
          autoComplete='off'
          defaultValue={paymentType.name}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.name && (
              <Label basic color='red' pointing>
                {errors.name.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='creditPeriod'
          type='number'
          fluid
          label='Credit Period'
          placeholder='Credit period'
          autoComplete='off'
          defaultValue={paymentType.creditPeriod}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.creditPeriod && (
              <Label basic color='red' pointing>
                {errors.creditPeriod.message}
              </Label>
            )
          }
        />

        <Button type='submit' color='teal' fluid>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default observer(EditPaymentType);
