import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #000000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    color: #00E5FF;
  }
`;

const LanguageSwitch = styled.button`
  background: none;
  border: 1px solid #00E5FF;
  color: #00E5FF;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <Logo to="/">創意設計工作室</Logo>
      <NavLinks>
        <NavLink to="/portfolio">作品集</NavLink>
        <NavLink to="/about">關於我們</NavLink>
        <LanguageSwitch>EN</LanguageSwitch>
      </NavLinks>
    </Nav>
  );
};

export default Navbar; 