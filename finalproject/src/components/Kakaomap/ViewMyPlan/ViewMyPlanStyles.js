import styled from "styled-components";

/* 전체 컨테이너 */
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
`;

/* 플랜 그룹들을 3열 그리드로 배치하기 위한 컨테이너 */
export const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; /* 각 카드 간의 간격 */
`;

/* 그룹별 컨테이너 */
export const PlanGroupContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

/* 그룹 헤더: 클릭 시 그룹을 토글함 */
export const PlanHeader = styled.div`
  background-color: #f5f5f5;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9e9e9;
  }
`;

/* 슬라이드 콘텐츠 (토글 시 슬라이드 다운 효과 적용) */
export const PlanContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow-y: auto; /* 최대 높이를 넘으면 스크롤*/
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;
  padding: ${({ isOpen }) => (isOpen ? "12px 16px" : "0 16px")};
  background-color: #fff;
`;

/* 각 장소 아이템 */
export const PlaceItem = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px dashed #eee;

  &:last-child {
    border-bottom: none;
  }
`;

/* 장소 정보 */
export const PlaceInfo = styled.div`
  margin-bottom: 6px;
`;

/* 수정하기 버튼 */
export const EditButton = styled.button`
  background-color: #007bff;
  margin-right: 5px;
  margin-left: 5px;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

/* 수정하기 버튼 */
export const AddMemoButton = styled.button`
  background-color: #007bff;
  margin-right: 5px;
  margin-left: 5px;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

/* Modal 내부 컨테이너 */
export const ModalContent = styled.div`
  padding: 20px;
`;

/* 삭제버튼 */
export const DeleteButton = styled.button`
  padding: 8px 12px;
  margin-right: 5px;
  margin-left: 5px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d9363e;
  }
`;
