import React, { useState } from "react";
import { HeaderContainer, Menu, MenuList, MenuItem } from "./HeaderStyled";

const HeaderComponent = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <HeaderContainer
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Menu show={showMenu}>
        <MenuList>
          <MenuItem>메뉴 1</MenuItem>
          <MenuItem>메뉴 2</MenuItem>
          <MenuItem>메뉴 3</MenuItem>
        </MenuList>
      </Menu>
    </HeaderContainer>
  );
};

export default HeaderComponent;
