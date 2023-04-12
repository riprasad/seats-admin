import { Alert, Button, ButtonVariant, Modal } from "@patternfly/react-core";
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { License, User } from "client";
import { VoidFunctionComponent, useCallback, useState } from "react";
import { useService } from "../Components/ServiceProvider";
import { UsersPickerTable } from "../Components/UsersPickerTable";
import { useHistory } from "react-router-dom";

export const AddUsersPage: VoidFunctionComponent = () => {
  const history = useHistory();
  const service = useService();

  const close = () => history.push("/");

  const subscriptions = useQuery<License>({
    queryKey: ["subscriptions"],
    queryFn: () => service.get("o1", "smarts"),
  });
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const usernameChips = useURLSearchParamsChips("name", resetPaginationQuery);
  const users = useQuery<User[]>({
    queryKey: ["users", { page, perPage, usernames: usernameChips.chips }],
    queryFn: () => service.seats("o1", "smarts", false),
  });

  const { mutate, isLoading } = useMutation(
    () => service.assign("o1", "smarts", checkedUsers),
    {
      onSuccess: () => {
        close();
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
  const isAddDisabled =
    subscriptions.data?.total === undefined
      ? true
      : checkedUsers.length > 0
      ? checkedUsers.length + assignedSeats > subscriptions.data.total
      : true;

  return (
    <Modal
      isOpen
      title="Assign users"
      variant="medium"
      onClose={close}
      actions={[
        <Button
          key="assign"
          onClick={() => mutate()}
          isDisabled={isAddDisabled}
          isLoading={isLoading}
        >
          Assign
        </Button>,
        <Button key="cancel" onClick={close} variant={ButtonVariant.link}>
          Cancel
        </Button>,
      ]}
    >
      {checkedUsers.length + assignedSeats >
        (subscriptions.data?.total || 0) && (
        <Alert
          variant="warning"
          isInline
          title="Your organization does not have enough Project Wisdom seats for the assignments below"
        />
      )}
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
    </Modal>
  );
};
