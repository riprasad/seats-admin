import { Page, PageSection } from "@patternfly/react-core";
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { useQuery } from "@tanstack/react-query";
import { User } from "client";
import { VoidFunctionComponent, useCallback, useState } from "react";
import { RemoveUsersHeader } from "../Components/RemoveUsersHeader";
import { UsersPickerTable } from "../Components/UsersPickerTable";

export const RemoveUsersPage: VoidFunctionComponent = () => {
  const subscriptions = useQuery<{
    totalSeats: number;
    assignedSeats: number;
    availableSeats: number;
  }>({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      return (await fetch("/aw-api/subscriptions")).json();
    },
  });
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
  const users = useQuery<{ total: number; users: User[] }>({
    queryKey: ["users", { page, perPage, usernames: usernameChips.chips }],
    queryFn: async () => {
      return (await fetch("/aw-api/users")).json();
    },
  });

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const usersToRemove =
    subscriptions.data?.totalSeats !== undefined &&
    subscriptions.data.assignedSeats - subscriptions.data.totalSeats;

  return (
    <Page>
      <RemoveUsersHeader
        usersToRemove={usersToRemove || 0}
        isRemoveDisabled={checkedUsers.length < usersToRemove}
        onRemove={() => {}}
      />
      <PageSection isFilled={true} variant={"light"}>
        <UsersPickerTable
          users={users.data?.users}
          itemCount={users.data?.total}
          page={page}
          perPage={perPage}
          onPageChange={setPagination}
          usernames={usernameChips.chips}
          onSearchUsername={usernameChips.add}
          onRemoveUsernameChip={usernameChips.remove}
          onRemoveUsernameChips={usernameChips.clear}
          onClearAllFilters={usernameChips.clear}
          isUserChecked={(user) => checkedUsers.includes(user.name)}
          onCheckUser={(user, isChecked) => {
            setCheckedUsers(
              isChecked
                ? [...checkedUsers, user.name]
                : checkedUsers.filter((u) => u !== user.name)
            );
          }}
        />
      </PageSection>
    </Page>
  );
};
