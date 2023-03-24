import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { RemoveUsersPage as RemoveUsersPageComp } from './RemoveUsersPage';

export default {
  component: RemoveUsersPageComp,
  args: {},
} as ComponentMeta<typeof RemoveUsersPageComp>;

const Template: ComponentStory<typeof RemoveUsersPageComp> = (args) => (
  <RemoveUsersPageComp {...args} />
);

export const RemoveUsersPage = Template.bind({});
RemoveUsersPage.parameters = {
  msw: {
    handlers: [
      rest.get('/aw-api/subscriptions', (req, res, ctx) => {
        return res(
          ctx.delay(150),
          ctx.json({
            totalSeats: 25,
            availableSeats: 0,
            assignedSeats: 30,
          })
        );
      }),
      rest.get('/aw-api/users', (req, res, ctx) => {
        return res(
          ctx.delay(450),
          ctx.json({
            total: 20,
            users: Array(20)
              .fill(0)
              .map((_, i) => ({
                username: `user${i}`,
                firstName: `John ${i}`,
                lastName: `Woo ${i}`,
              })),
          })
        );
      }),
    ],
  },
};
