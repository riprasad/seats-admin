import { Bullseye, Spinner } from '@patternfly/react-core';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AddUsersPage, RemoveUsersPage, UsersPage } from 'components';

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Router basename={getBaseName(window.location.pathname) + '/seats'}>
      <Switch>
        <Route path="/add-users">
          <AddUsersPage />
        </Route>
        <Route path="/remove-users">
          <RemoveUsersPage />
        </Route>
        <Route path="/">
          <UsersPage />
        </Route>
        {/* Finally, catch all unmatched routes */}
        <Route>
          <InvalidObject />
        </Route>
      </Switch>
    </Router>
  </Suspense>
);
