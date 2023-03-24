import { Page } from '@patternfly/react-core';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmptyStateNoSubscription as EmptyStateNoSubscriptionComponent } from './EmptyStateNoSubscription';

export default {
  component: EmptyStateNoSubscriptionComponent,
  args: {},
} as ComponentMeta<typeof EmptyStateNoSubscriptionComponent>;

const Template: ComponentStory<typeof EmptyStateNoSubscriptionComponent> = (
  args
) => (
  <Page>
    <EmptyStateNoSubscriptionComponent {...args} />
  </Page>
);

export const EmptyStateNoSubscription = Template.bind({});
