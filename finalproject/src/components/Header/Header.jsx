import { HeaderContainer, Logo, Nav, NavItem } from "./Header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>KH 정보교육원 참예쁘다~~</Logo>
      <Nav>
        <NavItem>홈</NavItem>
        <NavItem>게시판</NavItem>
        {false ? (
          <>
            <NavItem>님 반갑습니다.</NavItem>
            <NavItem>마이페이지</NavItem>
            <NavItem>로그아웃</NavItem>
          </>
        ) : (
          <>
            <NavItem>회원가입</NavItem>
            <NavItem>로그인</NavItem>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
