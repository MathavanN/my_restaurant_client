import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Button, Form, Header, Label } from 'semantic-ui-react';
import { IUserLogin } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import ErrorMessage from '../../app/common/alert/ErrorMessage';
import { ToastIds } from '../../app/models/constants';

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login, getUser, moveToDashboardPage } = rootStore.userStore;

  const { register, errors, handleSubmit, setValue, trigger } = useForm();

  const onSubmit = (data: IUserLogin) => {
    login(data)
      .then((result) => {
        getUser().then((user) => {
          moveToDashboardPage();
        });
      })
      .catch((error) => {
        toast.error(<ErrorMessage error={error} text="Error:" />, {
          toastId: ToastIds.ACCOUNT.LOGIN_ERROR_ID,
        });
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
      { name: 'password' },
      {
        required: 'You must specify a password',
      }
    );
  }, [register]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <FontAwesomeIcon icon={faSignInAlt} size="lg" />
          <Header.Subheader>Sign In</Header.Subheader>
        </Header>
        <Form.Input
          name="email"
          type="email"
          fluid
          label="Email"
          placeholder="Email"
          autoComplete="off"
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
        <Button type="submit" color="teal" fluid>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
