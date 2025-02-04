import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    color: #61dafb;
  }
`;
