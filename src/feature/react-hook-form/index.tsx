import { trpc } from 'utils/trpc';
import { z } from 'zod';

import { Form, SubmitButton, useZodForm } from './Form';

// validation schema is used by tRPC mutation and client
export const validationSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(5),
});

function AddPostForm() {
  const utils = trpc.useContext().reactHookFormRouter;

  const mutation = trpc.reactHookFormRouter.add.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const form = useZodForm({
    schema: validationSchema,
    defaultValues: {
      title: '',
      text: '',
    },
  });

  return (
    <>
      <Form
        form={form}
        handleSubmit={async (values) => {
          await mutation.mutateAsync(values);
          form.reset();
        }}
        className="space-y-2"
      >
        <div>
          <label>
            Title
            <br />
            <input {...form.register('title')} className="border" />
          </label>

          {form.formState.errors.title?.message && (
            <p className="text-red-700">
              {form.formState.errors.title?.message}
            </p>
          )}
        </div>
        <div>
          <label>
            Text
            <br />
            <textarea {...form.register('text')} className="border" />
          </label>
          {form.formState.errors.text?.message && (
            <p className="text-red-700">
              {form.formState.errors.text?.message}
            </p>
          )}
        </div>
      </Form>
      <SubmitButton
        form={form} // If you place the submit button outside of the form, you need to specify the form to submit
        className="border bg-primary-500 text-white p-2 font-bold"
      >
        Add post
      </SubmitButton>
    </>
  );
}
export default function Page() {
  const [posts] = trpc.reactHookFormRouter.list.useSuspenseQuery();

  return (
    <>
      <h2 className="text-3xl font-bold">Posts</h2>

      <div className="flex flex-col gap-2 py-2">
        {posts &&
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg p-4"
            >
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="my-2">{post.text}</p>
            </article>
          ))}
      </div>

      <h2 className="text-2xl font-bold">Add a post</h2>

      <AddPostForm />
    </>
  );
}
