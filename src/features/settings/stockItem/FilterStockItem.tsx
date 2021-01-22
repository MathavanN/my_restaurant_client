import React, { FC, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Label, Message } from "semantic-ui-react";
import { ISelectInputOptions } from "../../../app/models/common";

interface IProps {
  stockTypeOptions: ISelectInputOptions[];
  setPredicate: (predicate: string, value: string | number | Date) => void;
  loadStockItems: () => void;
}

const FilterStockItem: FC<IProps> = ({
  stockTypeOptions,
  setPredicate,
  loadStockItems,
}) => {
  const { handleSubmit, setValue, register, errors, trigger } = useForm();
  const onSubmit = (data: any) => {
    console.log({ ...data });
    setPredicate("typeId", data.typeId);
    loadStockItems();
  };
  useEffect(() => {
    if (stockTypeOptions.length > 0) {
      setValue("typeId", stockTypeOptions[0].key);
    }
    register({
      name: "typeId",
    });
  }, [register, stockTypeOptions, setValue]);

  return (
    <Fragment>
      {stockTypeOptions.length > 0 && (
        <Message>
          <Message.Header>Filter by:</Message.Header>
          <Message.Content>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group widths="equal">
                <Form.Select
                  name="typeId"
                  compact
                  options={stockTypeOptions}
                  defaultValue={stockTypeOptions[0].key}
                  onChange={async (e, { name, value }) => {
                    setValue(name, value);
                    await trigger(name);
                  }}
                  error={
                    errors.typeId && (
                      <Label basic color="red" pointing>
                        {errors.typeId.message}
                      </Label>
                    )
                  }
                />
                <Button type="submit" color="blue">
                  Search
                </Button>
              </Form.Group>
            </Form>
          </Message.Content>
        </Message>
      )}
    </Fragment>
  );
};

export default FilterStockItem;
