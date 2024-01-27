import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import { Disclosure, Transition } from "@headlessui/react";
import styled from "@emotion/styled";
import { space } from "styled-system";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Statstics", href: "/stat", current: false },
  { name: "Add Song", href: "/create", current: false },
];

const Header = styled("header")`
  background-color: #4a5568;
`;

const Nav = styled("nav")`
  max-width: 7xl;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Logo = styled("img")`
  width: 8rem;
  cursor: pointer;
`;

const NavLinkContainer = styled("div")`
  position: relative;
  background-color: #4a5568;
  width: auto;
  height: auto;
  transition: top 0.5s;
`;

const NavLinkList = styled("ul")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0rem;
  ${space}
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #edf2f7;
  }
`;

const Navbar = () => {
  return (
    <Header>
      <Nav>
        <NavLinkContainer>
          <NavLinkList px={5}>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  ${
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  px-3 py-2 rounded-md text-sm font-medium
                `}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </NavLink>
            ))}
          </NavLinkList>
        </NavLinkContainer>
      </Nav>
    </Header>
  );
};

export default Navbar;
