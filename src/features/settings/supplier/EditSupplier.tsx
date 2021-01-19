import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Form, Button, Header, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TextInput from "../../../app/common/form/TextInput";
import { SupplierFormValues } from "../../../app/models/supplier";

interface IProps {
  supplier: SupplierFormValues;
}

const EditSupplier: FC<IProps> = ({ supplier }) => {
  const rootStore = useContext(RootStoreContext);
  const { updateSupplier, createSupplier } = rootStore.settingsStore;
  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit } = useForm({
    defaultValues: supplier,
  });
  const onSubmit = (data: any) => {
    const formData = new SupplierFormValues({ ...data, id: supplier.id });
    if (formData.id === 0) createSupplier(formData).finally(() => closeModal());
    else updateSupplier(formData).finally(() => closeModal());
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {supplier.id === 0 ? "Add New Supplier" : "Modify Supplier Details"}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>Supplier Name</label>
          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            ref={register({
              required: "Name is required",
              maxLength: {
                value: 256,
                message: "Name maximum characters 256",
              },
            })}
          />
          {errors.name && (
            <Label basic color="red" pointing>
              {errors.name.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Supplier Address 1</label>
          <input
            type="text"
            name="address1"
            placeholder="Address"
            ref={register({
              required: "Address is required",
              maxLength: {
                value: 256,
                message: "Address maximum characters 256",
              },
            })}
          />
          {errors.address1 && (
            <Label basic color="red" pointing>
              {errors.address1.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Supplier Address 2</label>
          <input
            type="text"
            name="address2"
            placeholder="Address"
            ref={register({
              maxLength: {
                value: 256,
                message: "Address maximum characters 256",
              },
            })}
          />
          {errors.address2 && (
            <Label basic color="red" pointing>
              {errors.address2.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            ref={register({
              required: "City is required",
              maxLength: {
                value: 100,
                message: "City maximum characters 100",
              },
            })}
          />
          {errors.city && (
            <Label basic color="red" pointing>
              {errors.city.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            ref={register({
              required: "Country is required",
              maxLength: {
                value: 100,
                message: "Country maximum characters 100",
              },
            })}
          />
          {errors.country && (
            <Label basic color="red" pointing>
              {errors.country.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Telephone 1</label>
          <input
            type="text"
            name="telephone1"
            placeholder="Phone Number"
            ref={register({
              maxLength: {
                value: 20,
                message: "Phone number maximum characters 20",
              },
            })}
          />
          {errors.telephone1 && (
            <Label basic color="red" pointing>
              {errors.telephone1.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Telephone 2</label>
          <input
            type="text"
            name="telephone2"
            placeholder="Phone Number"
            ref={register({
              maxLength: {
                value: 20,
                message: "Phone number maximum characters 20",
              },
            })}
          />
          {errors.telephone2 && (
            <Label basic color="red" pointing>
              {errors.telephone2.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Fax</label>
          <input
            type="text"
            name="fax"
            placeholder="Fax"
            ref={register({
              maxLength: {
                value: 20,
                message: "Fax maximum characters 20",
              },
            })}
          />
          {errors.fax && (
            <Label basic color="red" pointing>
              {errors.fax.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            ref={register({
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <Label basic color="red" pointing>
              {errors.email.message}
            </Label>
          )}
        </Form.Field>

        <Form.Field>
          <label>Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            placeholder="Contact Person"
            ref={register({
              maxLength: {
                value: 256,
                message: "Fax maximum characters 256",
              },
            })}
          />
          {errors.contactPerson && (
            <Label basic color="red" pointing>
              {errors.contactPerson.message}
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

export default observer(EditSupplier);
