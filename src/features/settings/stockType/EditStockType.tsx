import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { StockTypeFormValues } from '../../../app/models/stockTypeFormValues';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';

interface IProps {
  stockType: StockTypeFormValues;
}
const EditStockType: FC<IProps> = ({ stockType }) => {
  const rootStore = useContext(RootStoreContext);
  const { updateStockType, createStockType } = rootStore.stockTypeStore;

  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: stockType,
  });
  const onSubmit = (data: any) => {
    const formData = new StockTypeFormValues({ ...data, id: stockType.id });
    if (formData.id === 0)
      createStockType(formData)
        .then(() => {
          toast.success('Stock type created successfully');
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
    else
      updateStockType(formData)
        .then(() => {
          toast.success('Stock type updated successfully');
          closeModal();
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
  };
  useEffect(() => {
    register(
      { name: 'type' },
      {
        required: 'Stock type is required',
        maxLength: {
          value: 50,
          message: 'Stock type maximum characters 50',
        },
      }
    );
    register(
      { name: 'description' },
      {
        maxLength: {
          value: 100,
          message: 'Description maximum characters 100',
        },
      }
    );
  }, [register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {stockType.id === 0 ? 'Create Stock Type' : 'Modify Stock Type'}
          </Header.Subheader>
        </Header>
        <Form.Input
          name="type"
          fluid
          label="Stock Type"
          placeholder="Stock type"
          autoComplete="off"
          defaultValue={stockType.type}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.type && (
              <Label basic color="red" pointing>
                {errors.type.message}
              </Label>
            )
          }
        />
        <Form.TextArea
          label="Stock Type Description"
          name="description"
          placeholder="Stock type description..."
          autoComplete="off"
          defaultValue={stockType.description}
          rows={2}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.description && (
              <Label basic color="red" pointing>
                {errors.description.message}
              </Label>
            )
          }
        />
        <Button type="submit" color="teal" fluid>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default observer(EditStockType);
