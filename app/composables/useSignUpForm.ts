import { useI18n, useLocalePath } from '#imports';
import { signUp } from '~/lib/auth-client';
import { useAuthForm } from '~/composables/useAuthForm';
import { createSignUpSchema } from '~/utils/authSchemas';

type SignUpHandler = (payload: {
  name: string;
  email: string;
  password: string;
  callbackURL: string;
}) => Promise<unknown>;

type UseSignUpFormOptions = {
  signUpEmail?: SignUpHandler;
  defaultCallbackURL?: string;
};

export const useSignUpForm = (options: UseSignUpFormOptions = {}) => {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const signUpEmail = options.signUpEmail ?? signUp.email;
  const callbackURL = options.defaultCallbackURL ?? localePath('dashboard');

  const { handleSubmit, email, password, emailError, passwordError, registerField } = useAuthForm({
    schema: createSignUpSchema(t),
    initialValues: { name: '' },
  });

  const { value: name, errorMessage: nameError } = registerField('name');

  const handleSignUp = handleSubmit(async (values) => {
    await signUpEmail({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL,
    });
  });

  return {
    name,
    email,
    password,
    nameError,
    emailError,
    passwordError,
    handleSignUp,
  };
};
