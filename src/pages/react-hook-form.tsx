import FeaturePage from 'feature/react-hook-form';
import { meta } from 'feature/react-hook-form/meta';
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
