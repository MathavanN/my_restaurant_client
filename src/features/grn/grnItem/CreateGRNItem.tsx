import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import {
  CreateGoodsReceivedNoteItem,
  GoodsReceivedNoteItemFormValues,
} from '../../../app/models/goodsReceivedNoteItem';
import { ISelectInputOptions } from '../../../app/models/common';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';

interface IProps {
  item: GoodsReceivedNoteItemFormValues;
  stockTypeOptions: ISelectInputOptions[];
}
const CreateGRNItem: FC<IProps> = ({ item, stockTypeOptions }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modalStore;
  const {
    loadAllStockItems,
    getAllStockItemsForStockType,
  } = rootStore.stockItemStore;
  const { createGRNItem, updateGRNItem } = rootStore.grnStore;

  const { register, errors, handleSubmit, setValue, trigger, watch } = useForm({
    defaultValues: item,
  });

  const onSubmit = (data: any) => {
    const formData = new CreateGoodsReceivedNoteItem({
      ...data,
      id: item.id,
      goodsReceivedNoteId: item.goodsReceivedNoteId,
    });
    if (formData.id === 0)
      createGRNItem(formData)
        .then(() => {
          toast.success('Item created successfully');
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text='Error:' />);
        });
    else
      updateGRNItem(formData)
        .then(() => {
          toast.success('Item updated successfully');
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text='Error:' />);
        });
  };

  const itemTypeSelected = watch('itemTypeId');
  useEffect(() => {
    loadAllStockItems();
    register(
      { name: 'itemTypeId' },
      {
        required: 'Item type is required',
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : 'Item type is required',
        },
      }
    );
    register(
      { name: 'quantity' },
      {
        required: 'Quantity is required',
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : 'Quantity must be greater than zero',
        },
      }
    );
    register(
      { name: 'discount' },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0
              ? true
              : 'Discount must be a positive number',
        },
      }
    );
    register(
      { name: 'vat' },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0 ? true : 'VAT must be a positive number',
        },
      }
    );
    register(
      { name: 'nbt' },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0 ? true : 'NBT must be a positive number',
        },
      }
    );
    register(
      { name: 'itemId' },
      {
        required: 'Item is required',
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : 'Item is required',
        },
      }
    );
    register(
      { name: 'itemUnitPrice' },
      {
        required: 'Item unit price is required',
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : 'Item unit price must be greater than zero',
        },
      }
    );
  }, [loadAllStockItems, register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as='h2' color='teal' textAlign='center'>
          <Header.Subheader>
            {item.id === 0 ? 'Add New GRN Item' : 'Modify GRN Item'}
          </Header.Subheader>
        </Header>
        <Form.Select
          name='itemTypeId'
          fluid
          options={stockTypeOptions}
          label='Item Type'
          placeholder='Select item type'
          defaultValue={item.itemTypeId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemTypeId && (
              <Label basic color='red' pointing>
                {errors.itemTypeId.message}
              </Label>
            )
          }
        />
        {itemTypeSelected > 0 && (
          <Form.Select
            name='itemId'
            fluid
            search
            selection
            options={getAllStockItemsForStockType(itemTypeSelected)}
            label='Item Name'
            placeholder='Select an item'
            defaultValue={item.itemId}
            onChange={async (e, { name, value }) => {
              setValue(name, value);
              await trigger(name);
            }}
            error={
              errors.itemId && (
                <Label basic color='red' pointing>
                  {errors.itemId.message}
                </Label>
              )
            }
          />
        )}

        <Form.Input
          name='itemUnitPrice'
          fluid
          label='Unit Price'
          placeholder='Unit price'
          autoComplete='off'
          defaultValue={item.itemUnitPrice}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.itemUnitPrice && (
              <Label basic color='red' pointing>
                {errors.itemUnitPrice.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='quantity'
          fluid
          label='Quantity'
          placeholder='Quantity'
          autoComplete='off'
          defaultValue={item.quantity}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.quantity && (
              <Label basic color='red' pointing>
                {errors.quantity.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='nbt'
          fluid
          label='NBT %'
          placeholder='NBT'
          autoComplete='off'
          defaultValue={item.nbt}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.nbt && (
              <Label basic color='red' pointing>
                {errors.nbt.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='vat'
          fluid
          label='VAT %'
          placeholder='VAT'
          autoComplete='off'
          defaultValue={item.vat}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.vat && (
              <Label basic color='red' pointing>
                {errors.vat.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='discount'
          fluid
          label='Discount %'
          placeholder='Discount'
          autoComplete='off'
          defaultValue={item.discount}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.discount && (
              <Label basic color='red' pointing>
                {errors.discount.message}
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

export default CreateGRNItem;
