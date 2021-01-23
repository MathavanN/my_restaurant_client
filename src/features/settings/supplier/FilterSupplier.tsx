import React, { FC, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Message } from "semantic-ui-react";

interface IProps {
  handleSupplierSearch: () => void;
  setPredicate: (predicate: string, value: string | number) => void;
}

const FilterSupplier: FC<IProps> = ({ handleSupplierSearch, setPredicate }) => {
  const { handleSubmit, setValue, register, trigger } = useForm();
  const onSubmit = (data: any) => {
    console.log({ ...data });
    if (data.name) setPredicate("name", data.name);
    if (data.city) setPredicate("city", data.city);
    if (data.contactPerson) setPredicate("contactPerson", data.contactPerson);

    handleSupplierSearch();
  };
  useEffect(() => {
    register({
      name: "name",
    });
    register({
      name: "city",
    });
    register({
      name: "contactPerson",
    });
  }, [register]);

  return (
    <Fragment>
      <Message>
        <Message.Header>Filter by:</Message.Header>
        <Message.Content>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group widths="equal">
              <Form.Input
                name="name"
                label="Supplier Name"
                placeholder="Supplier name"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                  await trigger(name);
                }}
              />
              <Form.Input
                name="city"
                label="City"
                placeholder="City"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                  await trigger(name);
                }}
              />
              <Form.Input
                name="contactPerson"
                label="Contact Person"
                placeholder="Contact person"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                  await trigger(name);
                }}
              />

              <Button type="submit" color="blue">
                Search
              </Button>
            </Form.Group>
          </Form>
        </Message.Content>
      </Message>
    </Fragment>
  );
};

export default FilterSupplier;
