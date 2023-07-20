import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';

type UseZodForm<TInput extends FieldValues> = UseFormReturn<TInput> & {
  /**
   * A unique ID for this form.
   */
  id: string;
};
export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      raw: true,
    }),
  }) as UseZodForm<TSchema['_input']>;

  form.id = useId();

  return form;
}

type AnyZodForm = UseZodForm<any>;

export function Form<TInput extends FieldValues>(
  props: Omit<React.ComponentProps<'form'>, 'onSubmit' | 'id'> & {
    handleSubmit: SubmitHandler<TInput>;
    form: UseZodForm<TInput>;
  },
) {
  const { handleSubmit, form, ...passThrough }: typeof props = props;
  return (
    <FormProvider {...form}>
      <form
        {...passThrough}
        id={form.id}
        onSubmit={(event) => {
          form.handleSubmit(async (values) => {
            try {
              await handleSubmit(values);
            } catch (cause) {
              form.setError('root.server', {
                message: (cause as Error)?.message ?? 'Unknown error',
                type: 'server',
              });
            }
          })(event);
        }}
      />
    </FormProvider>
  );
}

export function SubmitButton(
  props: Omit<React.ComponentProps<'button'>, 'type' | 'form'> & {
    /**
     * Optionally specify a form to submit instead of the closest form context.
     */
    form?: AnyZodForm;
  },
) {
  const context = useFormContext();

  const form = props.form ?? context;
  if (!form) {
    throw new Error(
      'SubmitButton must be used within a Form or have a form prop',
    );
  }
  const { formState } = form;

  return (
    <button
      {...props}
      form={props.form?.id}
      type="submit"
      disabled={formState.isSubmitting}
    >
      {formState.isSubmitting ? 'Loading' : props.children}
    </button>
  );
}
