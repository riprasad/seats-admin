import { Alert, Page, PageSection } from '@patternfly/react-core';
import {
  usePaginationSearchParams,
  useURLSearchParamsChips,
} from '@rhoas/app-services-ui-components';
import { useQuery } from '@tanstack/react-query';
import { VoidFunctionComponent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyStateNoSubscription } from '../Components/EmptyStateNoSubscription';
import { RemoveUsersModal } from '../Components/RemoveUsersModal';
import { SeatsHeader } from '../Components/SeatsHeader';
import { User, UsersWithSeatTable } from '../Components/UsersWithSeatTable';

export const UsersPage: VoidFunctionComponent = () => {
  const history = useHistory();
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

  const users = useQuery<{ total: number; users: User[] }>({
    queryKey: ['users', { page, perPage, usernames: usernameChips.chips }],
    queryFn: async () => {
      return (await fetch('/aw-api/users')).json();
    },
  });

  const negativeSeats =
    subscriptions.data?.totalSeats !== undefined &&
    subscriptions.data.totalSeats < subscriptions.data.assignedSeats;

  const usersToRemove =
    subscriptions.data?.totalSeats !== undefined &&
    subscriptions.data.assignedSeats - subscriptions.data.totalSeats;

  const cantAddUsers =
    subscriptions.data?.totalSeats &&
    subscriptions.data?.totalSeats > 0 &&
    subscriptions.data?.availableSeats === 0;

  return (
    <Page>
      <SeatsHeader
        totalSeats={subscriptions.data?.totalSeats || 0}
        availableSeats={subscriptions.data?.availableSeats || 0}
      />
      {subscriptions.data?.totalSeats === 0 && <EmptyStateNoSubscription />}
      {negativeSeats && usersToRemove && (
        <RemoveUsersModal
          usersToRemove={usersToRemove}
          onOk={() => history.push('/remove-users')}
        />
      )}

      <PageSection isFilled={true}>
        {cantAddUsers ? (
          <Alert
            title={
              "There are 0 Ansible Wisdom seats left in your organization's subscription. Contact Red Hat to manage your Ansible Wisdom license."
            }
            variant={'warning'}
            isInline={true}
          />
        ) : null}
        {subscriptions.data?.totalSeats !== 0 && (
          <UsersWithSeatTable
            totalSeats={subscriptions.data?.totalSeats}
            users={users.data?.users}
            itemCount={users.data?.total}
            canAddUser={!cantAddUsers}
            page={page}
            perPage={perPage}
            onPageChange={setPagination}
            usernames={usernameChips.chips}
            onSearchUsername={usernameChips.add}
            onRemoveUsernameChip={usernameChips.remove}
            onRemoveUsernameChips={usernameChips.clear}
            onClearAllFilters={usernameChips.clear}
            getUrlForUser={(user) => `#${user.username}`}
            onAddUser={() => {
              history.push('/add-users');
            }}
            onRemoveSeat={() => {}}
          />
        )}
      </PageSection>
    </Page>
  );
};
