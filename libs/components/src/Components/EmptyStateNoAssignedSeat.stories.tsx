import { Page } from '@patternfly/react-core';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmptyStateNoAssignedSeat as EmptyStateNoAssignedSeatComponent } from './EmptyStateNoAssignedSeat';

export default {
  component: EmptyStateNoAssignedSeatComponent,
  args: {},
} as ComponentMeta<typeof EmptyStateNoAssignedSeatComponent>;

const Template: ComponentStory<typeof EmptyStateNoAssignedSeatComponent> = (
  args
) => (
  <Page>
    <EmptyStateNoAssignedSeatComponent {...args} />
  </Page>
);

export const EmptyStateNoAssignedSeat = Template.bind({});
EmptyStateNoAssignedSeat.args = {
  totalSeats: 10,
};
