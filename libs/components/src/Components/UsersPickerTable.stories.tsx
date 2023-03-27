import { Page } from '@patternfly/react-core';
import { useSortableSearchParams } from '@rhoas/app-services-ui-components';
import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import {
  Columns,
  UsersPickerTable as UsersPickerTableComponent,
  labels,
} from './UsersPickerTable';

export default {
  component: UsersPickerTableComponent,
  args: {
    usernames: [],
  },
} as Meta<typeof UsersPickerTableComponent>;

const Template: StoryFn<typeof UsersPickerTableComponent> = (args) => {
  const [isColumnSortable] = useSortableSearchParams(
    Columns,
    labels,
    'username'
  );
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  return (
    <Page>
      <UsersPickerTableComponent
        isColumnSortable={isColumnSortable}
        {...args}
        isUserChecked={(user) => checkedUsers.includes(user.username)}
        onCheckUser={(user, isChecked) => {
          setCheckedUsers(
            isChecked
              ? [...checkedUsers, user.username]
              : checkedUsers.filter((u) => u !== user.username)
          );
        }}
      />
    </Page>
  );
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
