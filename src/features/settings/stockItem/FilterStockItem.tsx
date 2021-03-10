import { FC, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Label, Message } from "semantic-ui-react";
import { ISelectInputOptions } from "../../../app/models/common";

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
  const onSubmit = (data: any) => {
    console.log({ ...data });
    handleStockItemSearch(data.typeId);
  };
  useEffect(() => {
    setValue("typeId", selectedStockType);
    register({ name: "typeId" }, { required: true });
  }, [register, selectedStockType, setValue]);

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
                  defaultValue={selectedStockType}
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
