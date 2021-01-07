import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Header } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserLogin } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      validate={validate}
      onSubmit={(values: IUserLogin) =>
        login(values).catch((error) => ({ [FORM_ERROR]: error }))
      }
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" color="teal" textAlign="center">
            <FontAwesomeIcon icon={faSignInAlt} size="lg" />
            <Header.Subheader>Sign In</Header.Subheader>
          </Header>
          <Field
            name="email"
            component={TextInput as any}
            placeholder="Email"
          />
          <Field
            name="password"
            component={TextInput as any}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text="Invalid username or password"
            />
          )}
          <Button
            loading={submitting}
            positive
            content="Login"
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
