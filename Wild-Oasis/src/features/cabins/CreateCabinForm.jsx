import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {}, onSuccess, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  console.log('editId', editId, typeof editId);
  const idEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: idEditSession ? editValues : {},
  });
  const { isCreating, createCabinAsync } = useCreateCabin();
  const { isEditing, updateCabinAsync } = useUpdateCabin();
  async function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    console.log(data);
    try {
      if (idEditSession) {
        await updateCabinAsync({ newCabin: { ...data, image }, id: editId });
      } else {
        console.log('Creating new cabin with data:', data);
        await createCabinAsync({ ...data, image });
        reset();
      }
      onSuccess?.();
      onCloseModal?.();
    } catch (err) {
      console.log(err);
      // errors are handled inside the mutation hooks
    }
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: true,
            min: 1,
            message: 'Atleast 1',
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', { required: true, min: 1 })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: false,
            validate: value =>
              Number(value) <= Number(getValues('regularPrice')) ||
              'Discount cannot be greater than price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: false })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing} type="submit">
          {idEditSession ? 'Update' : 'Create'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
