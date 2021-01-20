import { useForm } from "react-hook-form";
import React, { Fragment, useEffect, useRef } from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import { NORMAL, REPORT } from "../../app/models/constants";

const RegisterNonAdminUser = () => {
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    watch,
    setValue,
    trigger,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data));
  };
  const atLeastOne = () =>
    getValues("roles").length ? true : "Select required access roles.";

  useEffect(() => {
    register(
      { name: "email" },
      {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: "Invalid email address",
        },
      }
    );
    register(
      { name: "firstName" },
      {
        required: "First name is required",
      }
    );
    register(
      { name: "lastName" },
      {
        required: "Last name is required",
      }
    );
    register(
      { name: "password" },
      {
        required: "You must specify a password",
        minLength: {
          value: 8,
          message: "Password must have at least 8 characters",
        },
      }
    );
    register(
      { name: "confirmPassword" },
      {
        validate: (value) =>
          value === password.current || "The passwords do not match",
      }
    );
  }, [register]);
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>Register new user.</Header.Subheader>
        </Header>
        <Form.Input
          name="email"
          type="email"
          fluid
          label="Email"
          placeholder="Email"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.email && (
              <Label basic color="red" pointing>
                {errors.email.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="firstName"
          fluid
          label="First Name"
          placeholder="First name"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.firstName && (
              <Label basic color="red" pointing>
                {errors.firstName.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="lastName"
          fluid
          label="Last Name"
          placeholder="Last name"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.lastName && (
              <Label basic color="red" pointing>
                {errors.lastName.message}
              </Label>
            )
          }
        />
        <Form.Group grouped>
          <label>Access Roles</label>
          <div>
            <input
              name="roles"
              key={REPORT}
              type="checkbox"
              value={REPORT}
              ref={register({
                validate: atLeastOne,
              })}
            />
            <label htmlFor={REPORT}>{REPORT}</label>
          </div>
          <div>
            <input
              name="roles"
              key={NORMAL}
              type="checkbox"
              value={NORMAL}
              ref={register({ validate: atLeastOne })}
            />
            <label htmlFor={NORMAL}>{NORMAL}</label>
          </div>
          {errors.roles && (
            <Label basic color="red" pointing>
              {errors.roles.message}
            </Label>
          )}
        </Form.Group>
        <Form.Input
          name="password"
          type="password"
          fluid
          label="Password"
          placeholder="Password"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.password && (
              <Label basic color="red" pointing>
                {errors.password.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="confirmPassword"
          type="password"
          fluid
          label="Repeat password"
          placeholder="Password"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.confirmPassword && (
              <Label basic color="red" pointing>
                {errors.confirmPassword.message}
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

export default RegisterNonAdminUser;