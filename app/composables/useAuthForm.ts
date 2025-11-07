import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { z } from 'zod';

type AuthBaseValues = {
  email: string;
  password: string;
};

type UseAuthFormOptions<TSchema extends z.AnyZodObject> = {
  schema: TSchema;
  initialValues?: Partial<z.infer<TSchema>>;
};

export const useAuthForm = <TSchema extends z.AnyZodObject>({
  schema,
  initialValues,
}: UseAuthFormOptions<TSchema>) => {
  type FormValues = z.infer<TSchema> & AuthBaseValues;

  const { handleSubmit } = useForm<FormValues>({
    validationSchema: toTypedSchema(schema),
  });

  const { value: email, errorMessage: emailError } = useField<
    FormValues['email']
  >('email', undefined, {
    validateOnValueUpdate: true,
  });

  const { value: password, errorMessage: passwordError } = useField<
    FormValues['password']
  >('password', undefined, {
    validateOnValueUpdate: true,
  });

  const registerField = <TKey extends Extract<keyof FormValues, string>>(
    key: TKey
  ) => useField<FormValues[TKey]>(key);

  return {
    handleSubmit,
    email,
    password,
    emailError,
    passwordError,
    registerField,
  };
};
