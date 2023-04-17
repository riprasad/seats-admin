import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthenticatedUser } from "client";
import {
  AddUsersPage,
  RemoveUsersPage,
  UsersPage,
  ServiceContextProvider,
} from "components";
import { Route, Switch } from "react-router-dom";

const queryClient = new QueryClient();

const user = { orgId: "o1", serviceId: "smarts" } as AuthenticatedUser;

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
            <AddUsersPage user={user} onSuccess={handleAlert} onError={handleError} />
          </Route>
          <Route path="/remove-users">
            <RemoveUsersPage user={user} onSuccess={handleAlert} onError={handleError} />
          </Route>
          <Route path="/">
            <UsersPage user={user} />
          </Route>
        </Switch>
      </ServiceContextProvider>
    </QueryClientProvider>
  );
};
