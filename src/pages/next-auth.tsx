import FeaturePage from 'feature/next-auth';
import { meta } from 'feature/next-auth/meta';
import { ExamplePage } from 'utils/ExamplePage';

export default function Page() {
  return (
    <>
      <ExamplePage {...meta}>
        <FeaturePage />
      </ExamplePage>
    </>
  );
}
