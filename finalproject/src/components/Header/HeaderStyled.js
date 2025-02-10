import styled, { keyframes } from "styled-components";

// 슬라이드 애니메이션 정의
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 헤더 영역 스타일 컴포넌트
export const HeaderContainer = styled.header`
  position: fixed; /* 브라우저 창에 고정 */
  top: 0; /* 위쪽에 붙게 설정 */
  left: 0;
  width: 100%; /* 전체 너비 사용 */
  background: #333;
  color: #fff;
  padding: 15px 20px;
  cursor: pointer;
  z-index: 1000; /* 다른 요소들보다 위에 오도록 z-index 설정 */
`;

// 드롭다운 메뉴 영역 스타일 컴포넌트
export const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #444;
  overflow: hidden;
  animation: ${(props) => (props.show ? slideDown : "")} 0.3s ease-out;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 100;
`;

// 메뉴 목록과 메뉴 항목 스타일 컴포넌트
export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 0;
  display: flex; /* Flexbox를 사용하여 자식 요소들을 가로로 정렬 */
  justify-content: center; /* 메뉴 아이템들을 중앙에 정렬 */
  align-items: center; /* 수직 정렬 */
`;

export const MenuItem = styled.li`
  padding: 10px 20px;
  color: #fff;
  &:hover {
    background: #555;
  }
  margin: 0 10px; /* 좌우에 10px 간격 추가 */
`;
