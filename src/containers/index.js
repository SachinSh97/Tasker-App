import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { containers } from 'routes';
import Loader from 'components/elements/Loader';

//containers
const Taskboard = React.lazy(() => import('containers/Taskboard'));
const Authentication = React.lazy(() => import('containers/Authentication'));

const App = ({ match }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={() => (
            <Redirect to={`${match.path}/${containers.register}`} />
          )}
        />
        <Route
          path={`${match.path}/${containers.register}`}
          component={Authentication}
        />
        <Route
          path={`${match.path}/${containers.project}`}
          component={Taskboard}
        />
      </Switch>
    </Suspense>
  );
};

export default App;
