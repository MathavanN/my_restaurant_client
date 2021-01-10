import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLTextAreaElement>,
    FormFieldProps {}

const TextAreaInput: FC<IProps> = ({
  input,
  width,
  rows,
  placeholder,
  label,
  meta: { touched, error },
}) => {
  return (
    <Form.Input error={touched && !!error} label={label} width={width}>
      <textarea {...input} rows={rows} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Input>
  );
};

export default TextAreaInput;
