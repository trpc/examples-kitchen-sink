import FeaturePage from 'feature/infinite-query';
import { meta } from 'feature/infinite-query/meta';
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
