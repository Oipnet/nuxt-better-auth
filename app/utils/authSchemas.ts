import { z } from 'zod';

type Translate = (key: string) => string;

const createEmailSchema = (t: Translate) =>
  z
    .string({ required_error: t('auth.validation.emailRequired') })
    .nonempty(t('auth.validation.emailRequired'))
    .email(t('auth.validation.emailInvalid'));

const createPasswordSchema = (t: Translate) =>
  z
    .string({ required_error: t('auth.validation.passwordRequired') })
    .nonempty(t('auth.validation.passwordRequired'))
    .min(6, t('auth.validation.passwordMin'));

export const createSignInSchema = (t: Translate) =>
  z.object({
    email: createEmailSchema(t),
    password: createPasswordSchema(t),
  });

export const createSignUpSchema = (t: Translate) =>
  createSignInSchema(t).extend({
    name: z
      .string({ required_error: t('auth.validation.nameRequired') })
      .nonempty(t('auth.validation.nameRequired'))
      .min(2, t('auth.validation.nameMin')),
  });
