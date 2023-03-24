import { Page, PageSection } from '@patternfly/react-core';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { RemoveUsersHeader as RemoveUsersHeaderComponent } from './RemoveUsersHeader';

export default {
  component: RemoveUsersHeaderComponent,
  args: {
    usersToRemove: 10,
    isRemoveDisabled: false,
  },
} as ComponentMeta<typeof RemoveUsersHeaderComponent>;

const Template: ComponentStory<typeof RemoveUsersHeaderComponent> = (args) => (
  <Page>
    <RemoveUsersHeaderComponent {...args} />
    <PageSection>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi
      at doloremque eius eum facere illum iste labore laboriosam, minima
      molestias nisi quam quibusdam quos repellendus, sint vero vitae
      voluptatum!
    </PageSection>
  </Page>
);

export const RemoveUsersHeader = Template.bind({});
RemoveUsersHeader.args = {};

export const RemoveUsersHeaderDisabledRemove = Template.bind({});
RemoveUsersHeaderDisabledRemove.args = {
  isRemoveDisabled: true,
};
