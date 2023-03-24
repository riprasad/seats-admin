import { Nav, NavList, PageSidebar } from "@patternfly/react-core";
import React from "react";
import { NavLink } from "react-router-dom";

export const PageNav = () => (
  <PageSidebar
    nav={
      <Nav>
        <NavList>
          <li>
            <NavLink to="/" className="pf-c-nav__link">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/remove-users" className="pf-c-nav__link">
              Remove
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-users" className="pf-c-nav__link">
              Add
            </NavLink>
          </li>
        </NavList>
      </Nav>
    }
  />
);
