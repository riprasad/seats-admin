import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AddUsersPage,
  RemoveUsersPage,
  UsersPage,
  ServiceContextProvider,
} from "components";
import { Route, Switch } from "react-router-dom";

const queryClient = new QueryClient();

export const Routes = () => {
  const handleAlert = (message: string) => alert(message);
  const handleError = (message: string) => alert("ERROR: " + message);
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContextProvider
        serviceName={import.meta.env.VITE_SERVICE_KEY}
        baseUrl={import.meta.env.VITE_BASE_URL}
      >
        <Switch>
          <Route path="/add-users">
            <AddUsersPage onSuccess={handleAlert} onError={handleError} />
          </Route>
          <Route path="/remove-users">
            <RemoveUsersPage onSuccess={handleAlert} onError={handleError} />
          </Route>
          <Route path="/">
            <UsersPage />
          </Route>
        </Switch>
      </ServiceContextProvider>
    </QueryClientProvider>
  );
};
