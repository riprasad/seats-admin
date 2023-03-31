import { Alert, Page, PageSection } from "@patternfly/react-core";
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { VoidFunctionComponent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { EmptyStateNoSubscription } from "../Components/EmptyStateNoSubscription";
import { RemoveUsersModal } from "../Components/RemoveUsersModal";
import { SeatsHeader } from "../Components/SeatsHeader";
import { useService } from "../Components/ServiceProvider";
import { UsersWithSeatTable } from "../Components/UsersWithSeatTable";
import { User, License } from "client";

export const UsersPage: VoidFunctionComponent = () => {
  const history = useHistory();
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const usernameChips = useURLSearchParamsChips(
    "username",
    resetPaginationQuery
  );

  const service = useService();

  const subscriptions = useQuery<License>({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      return await service.get("o1", "smarts");
    },
  });

  const users = useQuery<User[]>({
    queryKey: ["users", { page, perPage, usernames: usernameChips.chips }],
    queryFn: async () => {
      return await service.seats("o1", "smarts");
    },
  });

  const assignedSeats =
    subscriptions.data?.total || 0 - (subscriptions.data?.available || 0);
  const negativeSeats =
    subscriptions.data?.total !== undefined &&
    subscriptions.data.total < assignedSeats;

  const usersToRemove =
    subscriptions.data?.total !== undefined &&
    assignedSeats - subscriptions.data.total;

  const cantAddUsers =
    subscriptions.data?.total &&
    subscriptions.data?.total > 0 &&
    subscriptions.data?.available === 0;

  const { mutate } = useMutation(
    async (user: User) => {
      await service.unAssign("o1", "smarts", [user.id]);
    },
    {
      onSuccess: () => {
        alert("done");
      },
      onError: (error) => {
        alert("there was an error: " + error);
      },
    }
  );
  return (
    <Page>
      <SeatsHeader
        totalSeats={subscriptions.data?.total || 0}
        availableSeats={subscriptions.data?.available || 0}
      />
      {subscriptions.data?.total === 0 && <EmptyStateNoSubscription />}
      {negativeSeats && usersToRemove && (
        <RemoveUsersModal
          usersToRemove={usersToRemove}
          onOk={() => history.push("/remove-users")}
        />
      )}

      <PageSection isFilled={true}>
        {cantAddUsers ? (
          <Alert
            title={
              "There are 0 seats left in your organization's subscription. Contact Red Hat to manage your Seats Administration license."
            }
            variant={"warning"}
            isInline={true}
          />
        ) : null}
        {subscriptions.data?.total !== 0 && (
          <UsersWithSeatTable
            totalSeats={subscriptions.data?.total}
            users={users.data}
            itemCount={users.data?.length}
            canAddUser={!cantAddUsers}
            page={page}
            perPage={perPage}
            onPageChange={setPagination}
            usernames={usernameChips.chips}
            onSearchUsername={usernameChips.add}
            onRemoveUsernameChip={usernameChips.remove}
            onRemoveUsernameChips={usernameChips.clear}
            onClearAllFilters={usernameChips.clear}
            getUrlForUser={(user) => `#${user.name}`}
            onAddUser={() => {
              history.push("/add-users");
            }}
            onRemoveSeat={(user) => mutate(user)}
          />
        )}
      </PageSection>
    </Page>
  );
};
