import React from "react";
import styled from "styled-components";

/*

  이 컴포넌트는 검색 혹은 카테고리를 선택했을 때 보여주는 장소들에 대한 컴포넌트입니다.

*/

// 리스트 아이템 컨테이너
const ListItem = styled.li`
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
const ThumbnailContainer = styled.div`
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
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

// 이미지가 없을 경우 표시할 영역
const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 기본 정보 영역 (장소 이름과 카테고지를 위아래로 배치하며 좌측 정렬)
const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간 사용 */
  text-align: left;
`;

// 장소 이름 텍스트 (모던한 폰트 스타일)
const PlaceName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

// 카테고리 텍스트
const PlaceCategory = styled.span`
  font-size: 16px;
  color: #777;
`;

// 선택(추가/제거) 버튼
// isSelected prop에 따라 배경색과 텍스트가 달라지도록 함.
const SelectButton = styled.button`
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

const PlaceListItem = ({
  place,
  isSelected = false,
  onToggle = () => {},
  onClick = () => {},
}) => {
  // 버튼 클릭 시 이벤트 전파(stopPropagation)를 통해 li의 onClick과 구분함.
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(place);
  };

  return (
    <ListItem onClick={onClick}>
      <ThumbnailContainer>
        {place.imageUrl ? (
          <ThumbnailImage src={place.imageUrl} alt={place.name} />
        ) : (
          <ThumbnailPlaceholder>이미지 없음</ThumbnailPlaceholder>
        )}
      </ThumbnailContainer>
      <BasicInfo>
        <PlaceName>{place.name}</PlaceName>
        <PlaceCategory>{place.category}</PlaceCategory>
      </BasicInfo>
      <SelectButton isSelected={isSelected} onClick={handleToggle}>
        {isSelected ? "제거" : "추가"}
      </SelectButton>
    </ListItem>
  );
};

export default PlaceListItem;
