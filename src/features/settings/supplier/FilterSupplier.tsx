import { FC, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Message } from "semantic-ui-react";

interface IProps {
  handleSupplierSearch: () => void;
  setPredicate: (predicate: string, value: string | number) => void;
}

const FilterSupplier: FC<IProps> = ({ handleSupplierSearch, setPredicate }) => {
  const { handleSubmit, setValue, register, trigger } = useForm();
  const onSubmit = (data: any) => {
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
                placeholder="Supplier name"
                autoComplete="off"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                  await trigger(name);
                }}
              />
              <Form.Input
                name="city"
                placeholder="City"
                autoComplete="off"
                onChange={async (e, { name, value }) => {
                  setValue(name, value);
                  await trigger(name);
                }}
              />
              <Form.Input
                name="contactPerson"
                placeholder="Contact person"
                autoComplete="off"
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
