import { Bullseye, Spinner } from '@patternfly/react-core';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import { InvalidObject } from '@redhat-cloud-services/frontend-components/InvalidObject';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  AddUsersPage,
  RemoveUsersPage,
  ServiceContextProvider,
  UsersPage,
} from 'components';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

export const Routes = () => {
  const dispatch = useDispatch();
  const handleAlert = (
    message: string,
    type:
      | 'default'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | undefined = 'success'
  ) => {
    dispatch(
      addNotification({
        variant: type,
        title: message,
      })
    );
  };
  const handleError = (message: string) => handleAlert(message, 'danger');
  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <ServiceContextProvider serviceName={process.env.SERVICE_KEY!}>
        <Router basename={getBaseName(window.location.pathname) + '/seats'}>
          <Switch>
            <Route path="/add-users">
              <UsersPage />
              <AddUsersPage onSuccess={handleAlert} onError={handleError} />
            </Route>
            <Route path="/remove-users">
              <UsersPage />
              <RemoveUsersPage onSuccess={handleAlert} onError={handleError} />
            </Route>
            <Route path="/">
              <UsersPage onSuccess={handleAlert} onError={handleError} />
            </Route>
            {/* Finally, catch all unmatched routes */}
            <Route>
              <InvalidObject />
            </Route>
          </Switch>
        </Router>
      </ServiceContextProvider>
    </Suspense>
  );
};
