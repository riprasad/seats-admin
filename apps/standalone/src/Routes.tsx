import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddUsersPage, RemoveUsersPage, UsersPage } from "components";
import { Route, Switch } from "react-router-dom";

const queryClient = new QueryClient();

export const Routes = () => (
  <QueryClientProvider client={queryClient}>
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
    </Switch>
  </QueryClientProvider>
);
