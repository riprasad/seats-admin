import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/utilities/Accessibility/accessibility.css';
import '@patternfly/patternfly/utilities/BackgroundColor/BackgroundColor.css';
import '@patternfly/patternfly/utilities/Display/display.css';
import '@patternfly/patternfly/utilities/Flex/flex.css';
import '@patternfly/patternfly/utilities/Sizing/sizing.css';
import '@patternfly/patternfly/utilities/Spacing/spacing.css';
import '@patternfly/patternfly/utilities/Text/text.css';
import { Bullseye, Spinner } from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css';
import { I18nProvider } from '@rhoas/app-services-ui-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

initialize();


export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen'
};


export const decorators = [
  mswDecorator,
  (Story => {
    return (
      <Suspense
        fallback={
          <Bullseye>
            <Spinner />
          </Bullseye>
        }
      >
        <I18nProvider
          lng={'en'}
          debug={true}
          resources={{
            en: {
              common: () =>
                import('@rhoas/app-services-ui-components/locales/en/common.json')
            }
          }}>
          <QueryClientProvider client={new QueryClient()}>
            <Router>
              <Story />
            </Router>
          </QueryClientProvider>

        </I18nProvider>
      </Suspense>
    );
  })
];
