import React, { useContext, useState } from "react";
import { HeaderContainer, Menu, MenuList, MenuItem } from "./HeaderStyled";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const HeaderComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠어요?")) {
      axios
        .delete("http://localhost/member/deleteRefToken", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          data: {
            username: auth.username,
          },
        })
        .then(() => {
          logout();
          alert("로그아웃 되었습니다.");
          goTo("/login");
        })
        .catch(() => {
          alert("오류 발생! 다시 시도해주세요.");
        });

      // logout();

      // alert("로그아웃 되었습니다.");
      // goTo("/login");
    }
  };

  return (
    <HeaderContainer
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Menu show={showMenu}>
        <MenuList>
          <MenuItem onClick={() => goTo("/")}>홈</MenuItem>
          {auth.isAuthenticated ? (
            <>
              <MenuItem onClick={() => goTo("/myPage")}>내 정보</MenuItem>
              <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              {auth.role === "ROLE_ADMIN" && (
                <MenuItem onClick={() => goTo("/admin")}>
                  관리자 페이지
                </MenuItem>
              )}
            </>
          ) : (
            <>
              <MenuItem onClick={() => goTo("/join")}>회원가입</MenuItem>
              <MenuItem onClick={() => goTo("/login")}>로그인</MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </HeaderContainer>
  );
};

export default HeaderComponent;
