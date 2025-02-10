import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { HeaderContainer, Menu, MenuList, MenuItem } from "./HeaderStyled";

const HeaderComponent = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navi = useNavigate();

  const goTo = (path) => {
    navi(path);
  };

  // useContext와 AuthContext를 import하고
  // useContext를 이용해서 AuthContext를 사용하도록 한다.
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // axios로 refreshToken을 보내서 DB에서 삭제

    logout();
  };
  return (
    <HeaderContainer
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Menu show={showMenu}>
        <MenuList>
          <MenuItem onClick={() => goTo("/")}> 메인 </MenuItem>
          <MenuItem onClick={() => goTo("/map")}> 지도보기</MenuItem>
          <MenuItem>메뉴 2</MenuItem>
          <MenuItem>메뉴 3</MenuItem>
        </MenuList>
      </Menu>
    </HeaderContainer>
  );
};

export default HeaderComponent;
