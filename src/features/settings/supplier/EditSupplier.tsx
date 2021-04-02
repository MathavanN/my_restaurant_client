import { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { Form, Button, Header, Label } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ErrorMessage from '../../../app/common/alert/ErrorMessage';
import { SupplierFormValues } from '../../../app/models/supplier/supplierFormValues';
import { ISupplier } from '../../../app/models/supplier/supplier';
import { ToastIds } from '../../../app/models/constants';

interface IProps {
  supplier: SupplierFormValues;
}

const EditSupplier: FC<IProps> = ({ supplier }) => {
  const rootStore = useContext(RootStoreContext);
  const { updateSupplier, createSupplier } = rootStore.supplierStore;
  const { closeModal } = rootStore.modalStore;

  const { register, errors, handleSubmit, setValue, trigger } = useForm({
    defaultValues: supplier,
  });
  const onSubmit = (data: ISupplier) => {
    const formData = { ...data, id: supplier.id };
    if (formData.id === 0)
      createSupplier(formData)
        .then(() => {
          closeModal();
          toast.success('Supplier created successfully', {
            toastId: ToastIds.SUPPLIER.CREATE_SUCCESS_ID,
          });
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />, {
            toastId: ToastIds.SUPPLIER.CREATE_ERROR_ID,
          });
        });
    else
      updateSupplier(formData)
        .then(() => {
          closeModal();
          toast.success('Supplier updated successfully', {
            toastId: ToastIds.SUPPLIER.UPDATE_SUCCESS_ID,
          });
        })
        .catch((error) => {
          toast.error(<ErrorMessage error={error} text="Error:" />, {
            toastId: ToastIds.SUPPLIER.UPDATE_ERROR_ID,
          });
        });
  };
  useEffect(() => {
    register(
      { name: 'name' },
      {
        required: 'Name is required',
        maxLength: {
          value: 256,
          message: 'Name maximum characters 256',
        },
      }
    );
    register(
      { name: 'address1' },
      {
        required: 'Address is required',
        maxLength: {
          value: 256,
          message: 'Address maximum characters 256',
        },
      }
    );
    register(
      { name: 'address2' },
      {
        maxLength: {
          value: 256,
          message: 'Address maximum characters 256',
        },
      }
    );
    register(
      { name: 'city' },
      {
        required: 'City is required',
        maxLength: {
          value: 100,
          message: 'City maximum characters 100',
        },
      }
    );
    register(
      { name: 'country' },
      {
        required: 'Country is required',
        maxLength: {
          value: 100,
          message: 'Country maximum characters 100',
        },
      }
    );
    register(
      { name: 'telephone1' },
      {
        maxLength: {
          value: 20,
          message: 'Phone number maximum characters 20',
        },
      }
    );
    register(
      { name: 'telephone2' },
      {
        maxLength: {
          value: 20,
          message: 'Phone number maximum characters 20',
        },
      }
    );
    register(
      { name: 'fax' },
      {
        maxLength: {
          value: 20,
          message: 'Fax maximum characters 20',
        },
      }
    );
    register(
      { name: 'email' },
      {
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'Invalid email address',
        },
      }
    );
    register(
      { name: 'contactPerson' },
      {
        maxLength: {
          value: 256,
          message: 'contact person maximum characters 256',
        },
      }
    );
  }, [register]);
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header as="h2" color="teal" textAlign="center">
          <Header.Subheader>
            {supplier.id === 0 ? 'Add New Supplier' : 'Modify Supplier Details'}
          </Header.Subheader>
        </Header>
        <Form.Input
          name="name"
          fluid
          label="Supplier Name"
          placeholder="Supplier name"
          autoComplete="off"
          defaultValue={supplier.name}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.name && (
              <Label basic color="red" pointing>
                {errors.name.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="address1"
          fluid
          label="Supplier Address 1"
          placeholder="Address"
          autoComplete="off"
          defaultValue={supplier.address1}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.address1 && (
              <Label basic color="red" pointing>
                {errors.address1.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="address2"
          fluid
          label="Supplier Address 2"
          placeholder="Address"
          autoComplete="off"
          defaultValue={supplier.address2}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.address2 && (
              <Label basic color="red" pointing>
                {errors.address2.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="city"
          fluid
          label="City"
          placeholder="City"
          autoComplete="off"
          defaultValue={supplier.city}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.city && (
              <Label basic color="red" pointing>
                {errors.city.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="country"
          fluid
          label="Country"
          placeholder="Country"
          autoComplete="off"
          defaultValue={supplier.country}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.country && (
              <Label basic color="red" pointing>
                {errors.country.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="telephone1"
          fluid
          label="Phone Number 1"
          placeholder="Phone number"
          autoComplete="off"
          defaultValue={supplier.telephone1}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.telephone1 && (
              <Label basic color="red" pointing>
                {errors.telephone1.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="telephone2"
          fluid
          label="Phone Number 2"
          placeholder="Phone number"
          autoComplete="off"
          defaultValue={supplier.telephone2}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.telephone2 && (
              <Label basic color="red" pointing>
                {errors.telephone2.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="fax"
          fluid
          label="Fax"
          placeholder="Fax"
          autoComplete="off"
          defaultValue={supplier.fax}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.fax && (
              <Label basic color="red" pointing>
                {errors.fax.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="email"
          type="email"
          fluid
          label="Email"
          placeholder="Email"
          autoComplete="off"
          defaultValue={supplier.email}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.email && (
              <Label basic color="red" pointing>
                {errors.email.message}
              </Label>
            )
          }
        />
        <Form.Input
          name="contactPerson"
          fluid
          label="Contact Person"
          placeholder="Contact person"
          autoComplete="off"
          defaultValue={supplier.contactPerson}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
            await trigger(name);
          }}
          error={
            errors.contactPerson && (
              <Label basic color="red" pointing>
                {errors.contactPerson.message}
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

export default observer(EditSupplier);
