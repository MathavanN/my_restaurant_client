import React, { FC } from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
  text: string;
}
const ErrorMessage: FC<IProps> = ({ error, text }) => {
  return (
    <Message negative>
      <Message.Header>{text}</Message.Header>
      <p>{error.data.errorMessage}</p>
    </Message>
  );
};

export default ErrorMessage;
