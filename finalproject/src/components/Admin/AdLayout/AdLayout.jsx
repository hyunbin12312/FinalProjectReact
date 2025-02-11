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

const AdLayout = () => {
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };

  return (
    <>
      <Title>⚙관리자 페이지</Title>
      <WrapDiv>
        <AdBanner>
          <BannerMargin />
          <BannerMargin />
          <AdminBox>
            <h6>***님 환영합니다.</h6>
          </AdminBox>
          <BannerMargin />
          <BannerMargin />
          <BannerMargin />
          <MenuBox>
            <ul>
              <StyledLi onClick={() => goTo("/admin")}>관리자 홈</StyledLi>
              <BannerMargin />
              <StyledLi onClick={() => goTo("/admin/adMember")}>
                회원 관리
              </StyledLi>
              <BannerMargin />
              <StyledLi>리스트 관리</StyledLi>
              <BannerMargin />
              <StyledLi>배너 관리</StyledLi>
              <BannerMargin />
              <StyledLi>팝업 관리</StyledLi>
            </ul>
          </MenuBox>
        </AdBanner>
      </WrapDiv>
    </>
  );
};
export default AdLayout;
