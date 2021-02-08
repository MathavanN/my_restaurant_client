import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import {
  ISelectGuidInputOptions,
  ISelectInputOptions,
} from "../../app/models/common";
import { CreateGoodsReceivedNote } from "../../app/models/goodsReceivedNote";
import { RootStoreContext } from "../../app/stores/rootStore";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { toast } from "react-toastify";
import ErrorMessage from "../../app/common/alert/ErrorMessage";

interface IProps {
  goodsReceivedNote: CreateGoodsReceivedNote;
  purchaseOrderOptions: ISelectInputOptions[];
  paymentTypeOptions: ISelectInputOptions[];
  userOptions: ISelectGuidInputOptions[];
}

const AddGRN: FC<IProps> = ({
  goodsReceivedNote,
  purchaseOrderOptions,
  paymentTypeOptions,
  userOptions,
}) => {
  const [receivedDate, setReceivedDate] = useState(new Date());
  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: goodsReceivedNote,
  });

  const rootStore = useContext(RootStoreContext);
  const { createGRN, updateGRN } = rootStore.grnStore;
  const { closeModal } = rootStore.modalStore;
  

  const onSubmit = (data: any) => {
    const formData = new CreateGoodsReceivedNote({
      ...data,
      id: goodsReceivedNote.id,
    });
    if (formData.id === 0)
      createGRN(formData).catch((error) => {
        toast.error(<ErrorMessage error={error} text="Error:" />);
      });
    else
      updateGRN(formData)
        .then(() => {
          toast.success("GRN updated successfully");
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
  };

  const handleReceivedDate = (selectedDate: Date) => {
    setReceivedDate(selectedDate);
    setValue("receivedDate", selectedDate);
    trigger("receivedDate");
  };

  useEffect(() => {
    setReceivedDate(goodsReceivedNote.receivedDate);
    register(
      { name: "purchaseOrderId" },
      {
        required: "Purchase order is required",
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "purchase order is required",
        },
      }
    );
    register(
      { name: "paymentTypeId" },
      {
        required: "Payment type is required",
        validate: {
          validValue: (value) =>
            parseInt(value, 0) > 0 ? true : "payment type is required",
        },
      }
    );
    register(
      { name: "receivedBy" },
      {
        required: "Received by is required",
      }
    );
    register(
      { name: "invoiceNumber" },
      {
        required: "Invoice number is required",
        maxLength: {
          value: 30,
          message: "Invoice number maximum characters 30",
        },
      }
    );
    register(
      { name: "nbt" },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0 ? true : "NBT must be a positive number",
        },
      }
    );
    register(
      { name: "vat" },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0 ? true : "VAT must be a positive number",
        },
      }
    );
    register(
      { name: "discount" },
      {
        validate: {
          validValue: (value) =>
            parseInt(value, 0) >= 0
              ? true
              : "Discount must be a positive number",
        },
      }
    );
    register(
      { name: "receivedDate" },
      {
        required: "Received date is required",
      }
    );
  }, [register, goodsReceivedNote.receivedDate, setReceivedDate]);
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {goodsReceivedNote.id === 0
              ? "Create a new goods received note"
              : "Modify a goods received note"}
          </Header.Subheader>
        </Header>
        <Form.Select
          name="purchaseOrderId"
          fluid
          search
          selection
          options={purchaseOrderOptions}
          label="Purchase Order"
          placeholder="Select a purchase order"
          defaultValue={goodsReceivedNote.purchaseOrderId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.purchaseOrderId && (
              <Label basic color="red" pointing>
                {errors.purchaseOrderId.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="invoiceNumber"
          fluid
          label="Invoice Number"
          placeholder="invoice number"
          defaultValue={goodsReceivedNote.invoiceNumber}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.invoiceNumber && (
              <Label basic color="red" pointing>
                {errors.invoiceNumber.message}
              </Label>
            )
          }
        />
        <Form.Select
          name="paymentTypeId"
          fluid
          options={paymentTypeOptions}
          label="Payment Type"
          placeholder="Select payment type"
          defaultValue={goodsReceivedNote.paymentTypeId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.paymentTypeId && (
              <Label basic color="red" pointing>
                {errors.paymentTypeId.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="nbt"
          fluid
          label="NBT (%)"
          placeholder="NBT"
          defaultValue={goodsReceivedNote.nbt}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.nbt && (
              <Label basic color="red" pointing>
                {errors.nbt.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="vat"
          fluid
          label="VAT (%)"
          placeholder="VAT"
          defaultValue={goodsReceivedNote.vat}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.vat && (
              <Label basic color="red" pointing>
                {errors.vat.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="discount"
          fluid
          label="Discount (%)"
          placeholder="Discount"
          defaultValue={goodsReceivedNote.discount}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.discount && (
              <Label basic color="red" pointing>
                {errors.discount.message}
              </Label>
            )
          }
        />
        <Form.Select
          name="receivedBy"
          fluid
          options={userOptions}
          label="Received By"
          placeholder="Select received by"
          defaultValue={goodsReceivedNote.receivedBy}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.receivedBy && (
              <Label basic color="red" pointing>
                {errors.receivedBy.message}
              </Label>
            )
          }
        />
        <Form.Field>
          <label>Received Date</label>
          <DatePicker
            id="receivedDate"
            name="receivedDate"
            selected={receivedDate}
            onChange={handleReceivedDate}
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            showTimeSelect
            maxDate={new Date()}
            minTime={setHours(setMinutes(new Date(), 0), 0)}
            maxTime={setHours(
              setMinutes(new Date(), new Date().getMinutes()),
              new Date().getHours()
            )}
          />
          {errors.receivedDate && (
            <Label basic color="red" pointing>
              {errors.receivedDate.message}
            </Label>
          )}
        </Form.Field>
        <Button type="submit" color="teal" fluid>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddGRN;
