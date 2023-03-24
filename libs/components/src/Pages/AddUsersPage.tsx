import { Page, PageSection } from '@patternfly/react-core';
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from '@rhoas/app-services-ui-components';
import { useQuery } from '@tanstack/react-query';
import { VoidFunctionComponent, useCallback, useState } from 'react';
import { AddUsersHeader } from '../Components/AddUsersHeader';
import { User, UsersPickerTable } from '../Components/UsersPickerTable';

export const AddUsersPage: VoidFunctionComponent = () => {
  const subscriptions = useQuery<{
    totalSeats: number;
    assignedSeats: number;
    availableSeats: number;
  }>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      return (await fetch('/aw-api/subscriptions')).json();
    },
  });
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const usernameChips = useURLSearchParamsChips(
    'username',
    resetPaginationQuery
  );
  const users = useQuery<{ total: number; users: User[] }>({
    queryKey: ['users', { page, perPage, usernames: usernameChips.chips }],
    queryFn: async () => {
      return (await fetch('/aw-api/users-with-no-seat')).json();
    },
  });

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

  return (
    <Page>
      <AddUsersHeader
        seatsAvailable={subscriptions.data?.availableSeats || 0}
        isAddDisabled={
          subscriptions.data?.totalSeats === undefined
            ? true
            : checkedUsers.length > 0
            ? checkedUsers.length + subscriptions.data.assignedSeats >
              subscriptions.data.totalSeats
            : true
        }
        onAdd={() => {}}
      />

      <PageSection isFilled={true} variant={'light'}>
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
          isUserChecked={(user) => checkedUsers.includes(user.username)}
          onCheckUser={(user, isChecked) => {
            setCheckedUsers(
              isChecked
                ? [...checkedUsers, user.username]
                : checkedUsers.filter((u) => u !== user.username)
            );
          }}
        />
      </PageSection>
    </Page>
  );
};
