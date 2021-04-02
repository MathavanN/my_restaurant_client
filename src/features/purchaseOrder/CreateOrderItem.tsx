import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../app/stores/rootStore';
import { ISelectInputOptions } from '../../app/models/common';
import ErrorMessage from '../../app/common/alert/ErrorMessage';
import { PurchaseOrderItemFormValues } from '../../app/models/purchaseOrderItem/purchaseOrderItemFormValues';
import { CreatePurchaseOrderItem } from '../../app/models/purchaseOrderItem/createPurchaseOrderItem';
import { ToastIds } from '../../app/models/constants';

interface IProps {
  item: PurchaseOrderItemFormValues;
  stockTypeOptions: ISelectInputOptions[];
}
const CreateOrderItem: FC<IProps> = ({ item, stockTypeOptions }) => {
  const { register, errors, handleSubmit, setValue, trigger, watch } = useForm({
    defaultValues: item,
  });
  const rootStore = useContext(RootStoreContext);
  const {
    createPurchaseOrderItem,
    updatePurchaseOrderItem,
  } = rootStore.purchaseOrderStore;
  const { closeModal } = rootStore.modalStore;
  const { getAllStockItemsForStockType } = rootStore.stockItemStore;

  const onSubmit = (data: PurchaseOrderItemFormValues) => {
    const formData = new CreatePurchaseOrderItem({
      ...data,
      id: item.id,
      purchaseOrderId: item.purchaseOrderId,
    });
    if (formData.id === 0)
      createPurchaseOrderItem(formData)
        .then(() => {
          closeModal();
          toast.success('Item created successfully', {
            toastId: ToastIds.ORDER_ITEM.CREATE_SUCCESS_ID,
          });
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />, {
            toastId: ToastIds.ORDER_ITEM.CREATE_ERROR_ID,
          });
        });
    else
      updatePurchaseOrderItem(formData)
        .then(() => {
          closeModal();
          toast.success('Item updated successfully', {
            toastId: ToastIds.ORDER_ITEM.UPDATE_SUCCESS_ID,
          });
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />, {
            toastId: ToastIds.ORDER_ITEM.UPDATE_ERROR_ID,
          });
        });
  };
  const itemTypeSelected = watch('itemTypeId');
  useEffect(() => {
    register(
      { name: 'itemTypeId' },
      {
        required: 'Item type is required',
        validate: {
          validValue: (value) =>
            parseInt(value, 10) > 0 ? true : 'Item type is required',
        },
      }
    );
    register(
      { name: 'quantity' },
      {
        required: 'Quantity is required',
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 10) > 0
              ? true
              : 'Quantity must be greater than zero',
        },
      }
    );
    register(
      { name: 'itemId' },
      {
        required: 'Item is required',
        validate: {
          validValue: (value) =>
            parseInt(value, 10) > 0 ? true : 'Item is required',
        },
      }
    );
    register(
      { name: 'itemUnitPrice' },
      {
        required: 'Item unit price is required',
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 10) > 0
              ? true
              : 'Item unit price must be greater than zero',
        },
      }
    );
  }, [register]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {item.id === 0 ? 'Add new Item' : 'Modify Item'}
          </Header.Subheader>
        </Header>
        <Form.Select
          name="itemTypeId"
          fluid
          options={stockTypeOptions}
          label="Item Type"
          placeholder="Select item type"
          defaultValue={item.itemTypeId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemTypeId && (
              <Label basic color="red" pointing>
                {errors.itemTypeId.message}
              </Label>
            )
          }
        />
        {itemTypeSelected > 0 && (
          <Form.Select
            name="itemId"
            fluid
            search
            selection
            options={getAllStockItemsForStockType(itemTypeSelected)}
            label="Item Name"
            placeholder="Select an item"
            defaultValue={item.itemId}
            onChange={async (e, { name, value }) => {
              setValue(name, value);
              await trigger(name);
            }}
            error={
              errors.itemId && (
                <Label basic color="red" pointing>
                  {errors.itemId.message}
                </Label>
              )
            }
          />
        )}

        <Form.Input
          name="itemUnitPrice"
          fluid
          label="Unit Price"
          autoComplete="off"
          placeholder="Unit price"
          defaultValue={item.itemUnitPrice}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemUnitPrice && (
              <Label basic color="red" pointing>
                {errors.itemUnitPrice.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="quantity"
          fluid
          label="Quantity"
          autoComplete="off"
          placeholder="Quantity"
          defaultValue={item.quantity}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.quantity && (
              <Label basic color="red" pointing>
                {errors.quantity.message}
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

export default CreateOrderItem;
