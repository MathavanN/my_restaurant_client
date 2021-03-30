import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Label, Message } from 'semantic-ui-react';
import { ISelectInputOptions } from '../../../app/models/common';

interface IProps {
  stockTypeOptions: ISelectInputOptions[];
  selectedStockType: number;
  handleStockItemSearch: (typeId: number) => void;
}

const FilterStockItem: FC<IProps> = ({
  stockTypeOptions,
  selectedStockType,
  handleStockItemSearch,
}) => {
  const { handleSubmit, setValue, register, errors, trigger } = useForm();
  const [searchEnable, setSearchEnable] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    handleStockItemSearch(data.typeId);
  };
  useEffect(() => {
    setValue('typeId', selectedStockType);
    register(
      { name: 'typeId' },
      {
        required: 'Stock type is required',
        validate: {
          greaterThanZero: (value) =>
            parseInt(value, 10) > 0
              ? true
              : 'Stock type must be greater than zero',
        },
      }
    );
  }, [register, selectedStockType, setValue]);

  return (
    <>
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
                  defaultValue={selectedStockType}
                  onChange={async (e, { name, value }) => {
                    setSearchEnable(false);
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
                <Button type="submit" color="blue" disabled={searchEnable}>
                  Search
                </Button>
              </Form.Group>
            </Form>
          </Message.Content>
        </Message>
      )}
    </>
  );
};

export default FilterStockItem;
