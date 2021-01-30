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

interface IProps {
  grn: CreateGoodsReceivedNote;
  purchaseOrderOptions: ISelectInputOptions[];
  paymentTypeOptions: ISelectInputOptions[];
  userOptions: ISelectGuidInputOptions[];
}

const AddGRN: FC<IProps> = ({
  grn,
  purchaseOrderOptions,
  paymentTypeOptions,
  userOptions,
}) => {
  const [receivedDate, setReceivedDate] = useState(new Date());
  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: grn,
  });
  const rootStore = useContext(RootStoreContext);
  const onSubmit = (data: any) => {
    const formData = new CreateGoodsReceivedNote({ ...data, id: grn.id });
    console.log(formData);
  };
  const handleReceivedDate = (selectedDate: Date) => {
    setReceivedDate(selectedDate);
    setValue("receivedDate", selectedDate);
    trigger("receivedDate");
  };
  useEffect(() => {
    setReceivedDate(grn.receivedDate);
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
      { name: "receivedUserId" },
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
  }, [register, grn.receivedDate, setReceivedDate]);
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {grn.id === 0
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
          defaultValue={grn.purchaseOrderId}
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
          defaultValue={grn.invoiceNumber}
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
          defaultValue={grn.paymentTypeId}
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
          type="number"
          fluid
          label="NBT (%)"
          placeholder="NBT"
          defaultValue={grn.nbt}
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
          type="number"
          fluid
          label="VAT (%)"
          placeholder="VAT"
          defaultValue={grn.vat}
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
          type="number"
          fluid
          label="Discount (%)"
          placeholder="Discount"
          defaultValue={grn.discount}
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
          name="receivedUserId"
          fluid
          options={userOptions}
          label="Received By"
          placeholder="Select received by"
          defaultValue={grn.receivedUserId}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.receivedUserId && (
              <Label basic color="red" pointing>
                {errors.receivedUserId.message}
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
