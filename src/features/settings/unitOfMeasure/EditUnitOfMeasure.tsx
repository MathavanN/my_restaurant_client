import { FC, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';
import { UnitOfMeasureFormValues } from '../../../app/models/unitOfMeasure/unitOfMeasureFormValues';
import { IUnitOfMeasure } from '../../../app/models/unitOfMeasure/unitOfMeasure';

interface IProps {
  uom: UnitOfMeasureFormValues;
}

const EditUnitOfMeasure: FC<IProps> = ({ uom }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    updateUnitOfMeasure,
    createUnitOfMeasure,
  } = rootStore.unitOfMeasureStore;
  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: uom,
  });
  const onSubmit = (data: IUnitOfMeasure) => {
    const formData = { ...data, id: uom.id };
    if (formData.id === 0)
      createUnitOfMeasure(formData)
        .then(() => {
          closeModal();
          toast.success('Unit of measure created successfully');
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
    else
      updateUnitOfMeasure(formData)
        .then(() => {
          closeModal();
          toast.success('Unit of measure updated successfully');
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />);
        });
  };

  useEffect(() => {
    register(
      { name: 'code' },
      {
        required: 'UOM code is required',
        maxLength: {
          value: 20,
          message: 'UOM code maximum characters 20',
        },
      }
    );
    register(
      { name: 'description' },
      {
        maxLength: {
          value: 50,
          message: 'UOM description maximum characters 50',
        },
      }
    );
  }, [register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {uom.id === 0 ? 'Create Unit Of Measure' : 'Modify Unit Of Measure'}
          </Header.Subheader>
        </Header>
        <Form.Input
          name="code"
          fluid
          label="UOM Code"
          placeholder="UOM Code"
          autoComplete="off"
          defaultValue={uom.code}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.code && (
              <Label basic color="red" pointing>
                {errors.code.message}
              </Label>
            )
          }
        />
        <Form.TextArea
          label="UOM Description"
          name="description"
          placeholder="UOM description..."
          autoComplete="off"
          defaultValue={uom.description}
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

export default observer(EditUnitOfMeasure);
