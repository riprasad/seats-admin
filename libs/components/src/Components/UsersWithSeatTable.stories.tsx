import { Page } from '@patternfly/react-core';
import { useSortableSearchParams } from '@rhoas/app-services-ui-components';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Columns,
  UsersWithSeatTable as UsersWithSeatTableComponent,
  labels,
} from './UsersWithSeatTable';

export default {
  component: UsersWithSeatTableComponent,
  args: {
    getUrlForUser: () => '',
    usernames: [],
    availableSeats: 5,
    totalSeats: 10,
    canAddUser: true,
  },
} as ComponentMeta<typeof UsersWithSeatTableComponent>;

const Template: ComponentStory<typeof UsersWithSeatTableComponent> = (args) => {
  const [isColumnSortable] = useSortableSearchParams(
    Columns,
    labels,
    'username'
  );
  return (
    <Page>
      <UsersWithSeatTableComponent
        isColumnSortable={isColumnSortable}
        {...args}
      />
    </Page>
  );
};

export const FirstLoadShowsSpinner = Template.bind({});
FirstLoadShowsSpinner.args = {
  users: null,
};

export const LoadingDataAfterFilteringShowsASkeleton = Template.bind({});
LoadingDataAfterFilteringShowsASkeleton.args = {
  users: undefined,
  usernames: ['foo'],
};

export const NoInitialDataShowsTheRightEmptyState = Template.bind({});
NoInitialDataShowsTheRightEmptyState.args = {
  users: [],
};

export const NoDataWithAFilterShowsTheRightEmptyState = Template.bind({});
NoDataWithAFilterShowsTheRightEmptyState.args = {
  users: [],
  usernames: ['foo'],
};

export const SomeUsers = Template.bind({});
SomeUsers.args = {
  users: [
    {
      username: 'FooBar1',
      firstName: 'Foo1',
      lastName: 'Bar1',
    },
    {
      username: 'FooBar2',
      firstName: 'Foo2',
      lastName: 'Bar2',
    },
    {
      username: 'FooBar3',
      firstName: 'Foo3',
      lastName: 'Bar3',
    },
    {
      username: 'FooBar4',
      firstName: 'Foo4',
      lastName: 'Bar4',
    },
    {
      username: 'FooBar5',
      firstName: 'Foo5',
      lastName: 'Bar5',
    },
  ],
  page: 1,
  itemCount: 5,
  usernames: ['foo'],
};

export const SomeUsersWithPagination = Template.bind({});
SomeUsersWithPagination.args = {
  users: [
    {
      username: 'FooBar1',
      firstName: 'Foo1',
      lastName: 'Bar1',
    },
    {
      username: 'FooBar2',
      firstName: 'Foo2',
      lastName: 'Bar2',
    },
    {
      username: 'FooBar3',
      firstName: 'Foo3',
      lastName: 'Bar3',
    },
    {
      username: 'FooBar4',
      firstName: 'Foo4',
      lastName: 'Bar4',
    },
    {
      username: 'FooBar5',
      firstName: 'Foo5',
      lastName: 'Bar5',
    },
    {
      username: 'FooBar6',
      firstName: 'Foo6',
      lastName: 'Bar6',
    },
    {
      username: 'FooBar7',
      firstName: 'Foo7',
      lastName: 'Bar7',
    },
    {
      username: 'FooBar8',
      firstName: 'Foo8',
      lastName: 'Bar8',
    },
    {
      username: 'FooBar9',
      firstName: 'Foo9',
      lastName: 'Bar9',
    },
    {
      username: 'FooBar10',
      firstName: 'Foo10',
      lastName: 'Bar10',
    },
  ],
  page: 1,
  itemCount: 56,
  usernames: ['foo'],
};

export const CantAddUsers = Template.bind({});
CantAddUsers.args = {
  ...SomeUsersWithPagination.args,
  canAddUser: false,
};
