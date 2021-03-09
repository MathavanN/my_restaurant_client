import { FC, Fragment } from "react";
import { AxiosResponse } from "axios";
import { List, Message } from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
  text: string;
}
const ErrorMessage: FC<IProps> = ({ error, text }) => {
  return (
    <Fragment>
      <Message.Header>
        {text ? (
          <Fragment>
            {text} {error.statusText}
          </Fragment>
        ) : (
          <Fragment>{error.statusText}</Fragment>
        )}
      </Message.Header>
      {Array.isArray(error.data.errorMessage) === true ? (
        <List bulleted>
          {error.data.errorMessage.map((d: any, i: number) => (
            <List.Item key={i}>{d.error}</List.Item>
          ))}
        </List>
      ) : (
        <p>{error.data.errorMessage}</p>
      )}
    </Fragment>
  );
};

export default ErrorMessage;
