import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLSelectElement>,
    FormFieldProps {}

const SelectInput: FC<IProps> = ({
  input,
  width,
  options,
  label,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Input error={touched && !!error} label={label} width={width}>
      <Select
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Input>
  );
};

export default SelectInput;
