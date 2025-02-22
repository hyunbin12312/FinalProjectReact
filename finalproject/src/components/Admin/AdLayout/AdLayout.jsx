import { AuthContext } from "../../context/AuthContext";
import {
  AdBanner,
  BannerMargin,
  MenuBox,
  StyledLi,
  AdminBox,
  Title,
  WrapDiv,
} from "./AdLayout.styles";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const AdLayout = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };

  useEffect(() => {
    if (auth.role != "ROLE_ADMIN") {
      goTo("/");
    }
  }, []);

  return (
    <>
      <Title>⚙관리자 페이지</Title>
      <WrapDiv>
        <AdBanner>
          <BannerMargin />
          <BannerMargin />
          <AdminBox>
            <h6>{auth.username}님 환영합니다.</h6>
          </AdminBox>
          <BannerMargin />
          <BannerMargin />
          <BannerMargin />
          <MenuBox>
            <ul>
              <StyledLi onClick={() => goTo("/admin")}>관리자 홈</StyledLi>
              <BannerMargin />
              <StyledLi onClick={() => goTo("/admin/findMember")}>
                회원 관리
              </StyledLi>
            </ul>
          </MenuBox>
        </AdBanner>
      </WrapDiv>
    </>
  );
};
export default AdLayout;
