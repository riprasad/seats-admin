import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { AddUsersPage as AddUsersPageComp } from './AddUsersPage';

export default {
  component: AddUsersPageComp,
  args: {},
} as ComponentMeta<typeof AddUsersPageComp>;

const Template: ComponentStory<typeof AddUsersPageComp> = (args) => (
  <AddUsersPageComp {...args} />
);

export const AddUsersPage = Template.bind({});
AddUsersPage.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            totalSeats: 10,
            availableSeats: 5,
            assignedSeats: 5,
          })
        );
      }),
      rest.get('/aw-api/users-with-no-seat', (req, res, ctx) => {
        return res(
          ctx.delay(450),
          ctx.json({
            total: 20,
            users: Array(20)
              .fill(0)
              .map((_, i) => ({
                username: `user-no-seat-${i}`,
                firstName: `Bob ${i}`,
                lastName: `Brown ${i}`,
              })),
          })
        );
      }),
    ],
  },
};
