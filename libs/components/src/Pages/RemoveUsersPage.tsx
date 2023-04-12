import { Button, ButtonVariant, Modal } from "@patternfly/react-core";
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, License } from "client";
import { useCallback, useState } from "react";
import { useService } from "../Components/ServiceProvider";
import { UsersPickerTable } from "../Components/UsersPickerTable";
import { useHistory } from "react-router-dom";
import { Notification } from "./AddUsersPage";

export const RemoveUsersPage = ({ onSuccess, onError }: Notification) => {
  const history = useHistory();
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
    queryFn: () => service.seats("o1", "smarts"),
  });

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  const assignedSeats =
    (subscriptions.data?.total || 0) - (subscriptions.data?.available || 0);

  const { mutate, isLoading } = useMutation(
    () => {
      setCheckedUsers([]);
      return service.unAssign("o1", "smarts", checkedUsers);
    },
    {
      onSuccess: () => {
        onSuccess("Successfully removed users");
      },
      onError: (error) => {
        onError("there was an error: " + error);
      },
    }
  );

  const close = () => history.push("/");

  return (
    <Modal
      isOpen
      title={`Remove ${assignedSeats} users from their assigned seats`}
      variant="medium"
      onClose={close}
      actions={[
        <Button
          onClick={() => mutate()}
          isDisabled={checkedUsers.length > assignedSeats}
          isLoading={isLoading}
        >
          Remove
        </Button>,
        <Button
          onClick={close}
          variant={ButtonVariant.link}
          isDisabled={isLoading}
        >
          Cancel
        </Button>,
      ]}
    >
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
