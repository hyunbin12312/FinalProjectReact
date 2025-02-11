import React, { useState } from "react";
import { HeaderContainer, Menu, MenuList, MenuItem } from "./HeaderStyled";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  // 로그아웃은 auth 할 때 구현

  return (
    <HeaderContainer
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Menu show={showMenu}>
        <MenuList>
          <MenuItem onClick={() => goTo("/")}>홈</MenuItem>
          <MenuItem onClick={() => goTo("/myPage")}>내 정보</MenuItem>
          <MenuItem onClick={() => goTo("/join")}>회원가입</MenuItem>
          <MenuItem onClick={() => goTo("/login")}>로그인</MenuItem>
          <MenuItem onClick={() => goTo("/admin")}>관리자 페이지</MenuItem>
          <MenuItem>로그아웃</MenuItem>
        </MenuList>
      </Menu>
    </HeaderContainer>
  );
};

export default HeaderComponent;
