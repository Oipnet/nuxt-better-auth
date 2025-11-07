import { useI18n, useLocalePath } from '#imports';
import { signIn } from '~/lib/auth-client';
import { useAuthForm } from '~/composables/useAuthForm';
import { createSignInSchema } from '~/utils/authSchemas';

type SignInHandler = (payload: {
  email: string;
  password: string;
  callbackURL: string;
}) => Promise<unknown>;

type UseSignInFormOptions = {
  signInEmail?: SignInHandler;
  defaultCallbackURL?: string;
};

export const useSignInForm = (options: UseSignInFormOptions = {}) => {
  const { t } = useI18n();
  const localePath = useLocalePath();
  const signInEmail = options.signInEmail ?? signIn.email;
  const callbackURL = options.defaultCallbackURL ?? localePath('dashboard');

  const { handleSubmit, email, password, emailError, passwordError } = useAuthForm({
    schema: createSignInSchema(t),
  });

  const handleSignIn = handleSubmit(async (values) => {
    await signInEmail({
      email: values.email,
      password: values.password,
      callbackURL,
    });
  });

  return {
    email,
    password,
    emailError,
    passwordError,
    handleSignIn,
  };
};
