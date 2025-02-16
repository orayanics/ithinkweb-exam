import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import { FaGratipay } from "react-icons/fa";

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="md" className="bg-white border-bottom">
      <NavbarBrand tag={Link} to="/">
        <span className="d-flex align-items-center gap-2 fw-bold text-danger">
          <FaGratipay /> Admin
        </span>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} className="border-0 outline">
        <FaGratipay />
      </NavbarToggler>

      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/users">
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/features">
              Features
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/pricing">
              Pricing
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/disabled" disabled>
              Disabled
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <NavbarText>Simple Text</NavbarText> */}
      </Collapse>
    </Navbar>
  );
}

export default PageNav;
