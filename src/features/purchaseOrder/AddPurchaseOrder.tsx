import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../app/stores/rootStore';
import { CreatePurchaseOrder } from '../../app/models/purchaseOrder/createPurchaseOrder';
import { ISelectInputOptions } from '../../app/models/common';
import ErrorMessage from '../../app/common/alert/ErrorMessage';
import { PurchaseOrderFormValues } from '../../app/models/purchaseOrder/purchaseOrderFormValues';

interface IProps {
  order: PurchaseOrderFormValues;
  supplierOptions: ISelectInputOptions[];
}

const AddPurchaseOrder: FC<IProps> = ({ order, supplierOptions }) => {
  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: order,
  });
  const rootStore = useContext(RootStoreContext);
  const {
    createPurchaseOrder,
    updatePurchaseOrder,
  } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;

  const onSubmit = (data: PurchaseOrderFormValues) => {
    const formData = new CreatePurchaseOrder({ ...data, id: order.id });
    if (formData.id === 0)
      createPurchaseOrder(formData).catch((error) => {
        toast.error(<ErrorMessage error={error} text="Error:" />);
      });
    else
      updatePurchaseOrder(formData)
        .then(() => {
          closeModal();
          toast.success('Purchase order updated successfully');
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
  };
  useEffect(() => {
    register(
      { name: 'supplierId' },
      {
        required: 'Supplier is required',
        validate: {
          validValue: (value) =>
            parseInt(value, 10) > 0 ? true : 'Supplier is required',
        },
      }
    );
    register(
      { name: 'description' },
      {
        maxLength: {
          value: 500,
          message: 'UOM description maximum characters 500',
        },
      }
    );
  }, [register]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {order.id === 0
              ? 'Create new purchase order'
              : 'Modify purchase order'}
          </Header.Subheader>
        </Header>
        <Form.Select
          name="supplierId"
          fluid
          options={supplierOptions}
          label="Supplier"
          placeholder="Select supplier"
          autoComplete="off"
          defaultValue={order.supplierId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.supplierId && (
              <Label basic color="red" pointing>
                {errors.supplierId.message}
              </Label>
            )
          }
        />
        <Form.TextArea
          label="Order Description"
          name="description"
          placeholder="Order description..."
          autoComplete="off"
          defaultValue={order.description}
          rows={4}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.description && (
              <Label basic color="red" pointing>
                {errors.description.message}
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

export default AddPurchaseOrder;
