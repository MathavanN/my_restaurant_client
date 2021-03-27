import { useForm } from 'react-hook-form';
import { useContext, useEffect, useRef } from 'react';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IRegisterAdminUser } from '../../app/models/user';
import ErrorMessage from '../../app/common/alert/ErrorMessage';

const RegisterAdminUser = () => {
  const rootStore = useContext(RootStoreContext);
  const { registerAdmin } = rootStore.userStore;
  const { closeModal } = rootStore.modalStore;
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    trigger,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data: IRegisterAdminUser) => {
    registerAdmin(data)
      .then((result) => {
        if (result.status === 'Success') {
          toast.success(result.message);
          closeModal();
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        toast.error(<ErrorMessage error={error} text='Error:' />);
      });
  };
  useEffect(() => {
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
        <Header as='h2' color='teal' textAlign='center'>
          <Header.Subheader>Register new admin access user.</Header.Subheader>
        </Header>
        <Form.Input
          name='email'
          type='email'
          fluid
          label='Email'
          autoComplete='off'
          placeholder='Email'
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.email && (
              <Label basic color='red' pointing>
                {errors.email.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='firstName'
          fluid
          label='First Name'
          autoComplete='off'
          placeholder='First name'
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.firstName && (
              <Label basic color='red' pointing>
                {errors.firstName.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='lastName'
          fluid
          label='Last Name'
          autoComplete='off'
          placeholder='Last name'
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.lastName && (
              <Label basic color='red' pointing>
                {errors.lastName.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='password'
          type='password'
          fluid
          label='Password'
          placeholder='Password'
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.password && (
              <Label basic color='red' pointing>
                {errors.password.message}
              </Label>
            )
          }
        />
        <Form.Input
          name='confirmPassword'
          type='password'
          fluid
          label='Repeat password'
          placeholder='Password'
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.confirmPassword && (
              <Label basic color='red' pointing>
                {errors.confirmPassword.message}
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

export default RegisterAdminUser;
