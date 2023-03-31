import { Page, PageSection } from "@patternfly/react-core";
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { License, User } from "client";
import { VoidFunctionComponent, useCallback, useState } from "react";
import { AddUsersHeader } from "../Components/AddUsersHeader";
import { useService } from "../Components/ServiceProvider";
import { UsersPickerTable } from "../Components/UsersPickerTable";

export const AddUsersPage: VoidFunctionComponent = () => {
  const service = useService();
  const subscriptions = useQuery<License>({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      return await service.get("o1", "smarts");
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
  const users = useQuery<User[]>({
    queryKey: ["users", { page, perPage, usernames: usernameChips.chips }],
    queryFn: async () => {
      return await service.seats("o1", "smarts", false);
    },
  });

  const { mutate } = useMutation(
    async () => {
      await service.assign("o1", "smarts", checkedUsers);
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

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const assignedSeats =
    (subscriptions.data?.total || 0) - (subscriptions.data?.available || 0);
  return (
    <Page>
      <AddUsersHeader
        seatsAvailable={subscriptions.data?.available || 0}
        isAddDisabled={
          subscriptions.data?.total === undefined
            ? true
            : checkedUsers.length > 0
            ? checkedUsers.length + assignedSeats > subscriptions.data.total
            : true
        }
        onAdd={mutate}
      />

      <PageSection isFilled={true} variant={"light"}>
        <UsersPickerTable
          users={users.data}
          itemCount={users.data?.length}
          page={page}
          perPage={perPage}
          onPageChange={setPagination}
          usernames={usernameChips.chips}
          onSearchUsername={usernameChips.add}
          onRemoveUsernameChip={usernameChips.remove}
          onRemoveUsernameChips={usernameChips.clear}
          onClearAllFilters={usernameChips.clear}
          isUserChecked={(user) => checkedUsers.includes(user.id)}
          onCheckUser={(user, isChecked) => {
            setCheckedUsers(
              isChecked
                ? [...checkedUsers, user.id]
                : checkedUsers.filter((u) => u !== user.id)
            );
          }}
        />
      </PageSection>
    </Page>
  );
};
