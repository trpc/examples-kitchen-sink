import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';

// validation schema is used by server
export const validationSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(5),
});

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // TODO: is this still true?
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      rawValues: true,
    }),
  });

  return form;
}

export default function Page() {
  const utils = trpc.useContext();
  const query = trpc.reactHookForm.list.useQuery(undefined, {
    suspense: true,
    // not refetching, because we're not actually persisting any posts on the server
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });

  const posts = query.data;

  const mutation = trpc.reactHookForm.add.useMutation({
    onSuccess: async () => {
      await utils.reactHookForm.list.invalidate();
    },
  });

  const methods = useZodForm({
    schema: validationSchema,
    defaultValues: {
      title: '',
      text: '',
    },
  });

  return (
    <>
      <h2 className="text-3xl font-bold">Posts</h2>

      <div className="flex flex-col gap-2">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="prose bg-white shadow overflow-hidden sm:rounded-lg p-4"
            >
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </article>
          ))}
      </div>

      <h2 className="text-2xl font-bold">Add a post</h2>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await mutation.mutateAsync(values);
          methods.reset();
        })}
        className="space-y-2"
      >
        <div>
          <label>
            Title
            <br />
            <input {...methods.register('title')} className="border" />
          </label>

          {methods.formState.errors.title?.message && (
            <p className="text-red-700">
              {methods.formState.errors.title?.message}
            </p>
          )}
        </div>
        <div>
          <label>
            Text
            <br />
            <textarea {...methods.register('text')} className="border" />
          </label>
          {methods.formState.errors.text?.message && (
            <p className="text-red-700">
              {methods.formState.errors.text?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="border bg-primary-500 text-white p-2 font-bold"
        >
          {mutation.isLoading ? 'Loading' : 'Submit'}
        </button>
      </form>
    </>
  );
}
