/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useRef } from 'react';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { ToastIds, Roles } from '../../app/models/constants';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IRegisterNonAdminUser } from '../../app/models/user';
import ErrorMessage from '../../app/common/alert/ErrorMessage';

const RegisterNonAdminUser = () => {
  const rootStore = useContext(RootStoreContext);
  const { registerNonAdmin } = rootStore.userStore;
  const { closeModal } = rootStore.modalStore;
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
  password.current = watch('password', '');

  const onSubmit = (data: IRegisterNonAdminUser) => {
    registerNonAdmin(data)
      .then((result) => {
        if (result.status === 'Success') {
          closeModal();
          toast.success(result.message, {
            toastId: ToastIds.ACCOUNT.CREATE_NORMAL_USER_SUCCESS_ID,
          });
        } else {
          toast.error(result.message, {
            toastId: ToastIds.ACCOUNT.CREATE_NORMAL_USER_FAILED_ID,
          });
        }
      })
      .catch((error) => {
        toast.error(<ErrorMessage error={error} text="Error:" />, {
          toastId: ToastIds.ACCOUNT.CREATE_NORMAL_USER_ERROR_ID,
        });
      });
  };
  const atLeastOne = () =>
    getValues('roles').length ? true : 'Select required access roles.';

  useEffect(() => {
    register({ name: 'roles' }, { required: true });
    register(
      { name: 'email' },
      {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'Invalid email address',
        },
      }
    );
    register(
      { name: 'firstName' },
      {
        required: 'First name is required',
      }
    );
    register(
      { name: 'lastName' },
      {
        required: 'Last name is required',
      }
    );
    register(
      { name: 'password' },
      {
        required: 'You must specify a password',
        minLength: {
          value: 8,
          message: 'Password must have at least 8 characters',
        },
      }
    );
    register(
      { name: 'confirmPassword' },
      {
        validate: (value) =>
          value === password.current || 'The passwords do not match',
      }
    );
  }, [register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>Register new user.</Header.Subheader>
        </Header>
        <Form.Input
          name="email"
          type="email"
          fluid
          label="Email"
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
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
              key={Roles.REPORT}
              type="checkbox"
              value={Roles.REPORT}
              ref={register({
                validate: atLeastOne,
              })}
            />
            <label htmlFor={Roles.REPORT}>{Roles.REPORT}</label>
          </div>
          <div>
            <input
              name="roles"
              key={Roles.NORMAL}
              type="checkbox"
              value={Roles.NORMAL}
              ref={register({ validate: atLeastOne })}
            />
            <label htmlFor={Roles.NORMAL}>{Roles.NORMAL}</label>
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
    </>
  );
};

export default RegisterNonAdminUser;
