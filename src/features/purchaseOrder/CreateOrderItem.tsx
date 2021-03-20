import { FC, Fragment, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { toast } from "react-toastify";
import {
  CreatePurchaseOrderItem,
  PurchaseOrderItemFormValues,
} from "../../app/models/purchaseOrderItem";
import { ISelectInputOptions } from "../../app/models/common";
import ErrorMessage from "../../app/common/alert/ErrorMessage";

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

  const onSubmit = (data: any) => {
    const formData = new CreatePurchaseOrderItem({
      ...data,
      id: item.id,
      purchaseOrderId: item.purchaseOrderId,
    });
    console.log(formData);
    if (formData.id === 0)
      createPurchaseOrderItem(formData)
        .then(() => {
          toast.success("Item created successfully");
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
    else
      updatePurchaseOrderItem(formData)
        .then(() => {
          toast.success("Item updated successfully");
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
  };
  const itemTypeSelected = watch("itemTypeId");
  useEffect(() => {
    register(
      { name: "itemTypeId" },
      {
        required: "Item type is required",
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Item type is required",
        },
      }
    );
    register(
      { name: "quantity" },
      {
        required: "Quantity is required",
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : "Quantity must be greater than zero",
        },
      }
    );
    register(
      { name: "itemId" },
      {
        required: "Item is required",
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "Item is required",
        },
      }
    );
    register(
      { name: "itemUnitPrice" },
      {
        required: "Item unit price is required",
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 0) > 0
              ? true
              : "Item unit price must be greater than zero",
        },
      }
    );
  }, [register]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {item.id === 0 ? "Add new Item" : "Modify Item"}
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
    </Fragment>
  );
};

export default CreateOrderItem;
