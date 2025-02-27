import styled from "styled-components";

// 리스트 아이템 컨테이너
export const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 6px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 좌측 80×80 이미지 영역
export const ThumbnailContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  flex-shrink: 0;
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 실제 이미지 태그 (80×80 영역에 맞게 표시)
export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

// 이미지가 없을 경우 표시할 영역
export const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 기본 정보 영역 (장소 이름과 카테고지를 위아래로 배치하며 좌측 정렬)
export const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간 사용 */
  text-align: left;
`;

// 장소 이름 텍스트
export const PlaceName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

// 카테고리 텍스트
export const PlaceCategory = styled.span`
  font-size: 16px;
  color: #777;
`;

// 선택(추가/제거) 버튼
export const SelectButton = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#dc3545" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? "#c82333" : "#0056b3")};
  }
`;
