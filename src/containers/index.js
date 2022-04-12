import React, { Suspense } from 'react';
import Loader from 'components/elements/Loader';

const Header = React.lazy(() => import('components/Header'));
const Taskboard = React.lazy(() => import('containers/Taskboard'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Taskboard />
    </Suspense>
  );
};

export default App;
