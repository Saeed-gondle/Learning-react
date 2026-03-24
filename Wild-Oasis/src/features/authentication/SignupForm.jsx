import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } =
    useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();
  async function onSubmit({
    fullName,
    email,
    password,
  }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors.email?.message}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: /\S+@\S+\.\S+/,
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password?.message}
      >
        <Input
          type='password'
          id='password'
          minLength={8}
          {...register('password', {
            required: 'This field is required',
            minLength: 8,
            validate: (value) => {
              if (value.length < 8)
                return 'Password must be at least 8 characters long';
              // const hasUpperCase = /[A-Z]/.test(value);
              // const hasLowerCase = /[a-z]/.test(value);
              // const hasNumber = /\d/.test(value);
              // return (
              //   (hasUpperCase && hasLowerCase && hasNumber) ||
              //   'Password must contain uppercase, lowercase letters and a number'
              // );
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => {
              const { password } = getValues();
              return (
                value === password || 'The passwords do not match'
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
