import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly-addons.css";

import { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Bullseye, Page, Spinner } from "@patternfly/react-core";

import { Routes } from "./Routes";
import { PageNav } from "./root/PageNav";

// Initialize required components before rendering app.

const root = document.getElementById("app");

render(
  <StrictMode>
    <Router>
      <Page sidebar={<PageNav />} isManagedSidebar>
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <Routes />
        </Suspense>
      </Page>
    </Router>
  </StrictMode>,
  root
);
