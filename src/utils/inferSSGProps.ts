// https://github.com/vercel/next.js/issues/15913#issuecomment-911684434
type GetSSGResult<TProps> =
  | { props: TProps }
  | { redirect: any }
  | { notFound: boolean };

type GetSSGFn<TProps extends any> = (
  args: any,
) => Promise<GetSSGResult<TProps>>;

export type inferSSGProps<TFn extends GetSSGFn<any>> = TFn extends GetSSGFn<
  infer TProps
>
  ? NonNullable<TProps>
  : never;
