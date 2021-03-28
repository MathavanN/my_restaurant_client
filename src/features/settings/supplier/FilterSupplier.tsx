import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Message } from 'semantic-ui-react';

interface IProps {
  handleSupplierSearch: () => void;
  setPredicate: (predicate: string, value: string | number) => void;
  removePredicate: (predicate: string) => void;
}

const FilterSupplier: FC<IProps> = ({
  handleSupplierSearch,
  setPredicate,
  removePredicate,
}) => {
  const { handleSubmit, setValue, register, trigger } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (data.name) {
      setPredicate('name', data.name);
    } else {
      removePredicate('name');
    }
    if (data.city) {
      setPredicate('city', data.city);
    } else {
      removePredicate('city');
    }
    if (data.contactPerson) {
      setPredicate('contactPerson', data.contactPerson);
    } else {
      removePredicate('contactPerson');
    }

    handleSupplierSearch();
  };
  useEffect(() => {
    register({
      name: 'name',
    });
    register({
      name: 'city',
    });
    register({
      name: 'contactPerson',
    });
  }, [register]);

  return (
    <>
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
    </>
  );
};

export default FilterSupplier;
