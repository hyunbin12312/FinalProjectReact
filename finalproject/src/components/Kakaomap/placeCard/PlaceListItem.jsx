import React from "react";
import styled from "styled-components";

// 리스트 아이템 컨테이너: 기본 정보, 이미지, 선택 버튼을 좌우로 배치
const ListItem = styled.li`
  display: flex;
  align-items: flex-start; /* 내부 요소들을 상단에 정렬 */
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f7f7f7;
  }
`;

// 좌측 80*80 이미지 영역
const ThumbnailContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// 실제 이미지 태그 (100×100 영역에 맞게 표시)
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 이미지가 없을 경우 표시할 영역
const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 기본 정보 영역 (장소 이름과 카테고지를 위아래로 배치하며 좌측 정렬)
const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1; /* 남은 공간 사용 */
`;

// 장소 이름 텍스트 (좌측 정렬)
const PlaceName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: left;
`;

// 카테고리 텍스트 (좌측 정렬)
const PlaceCategory = styled.span`
  font-size: 16px;
  color: #777;
  margin-top: 4px;
  text-align: left;
`;

// 선택(추가) 버튼
const SelectButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;

const PlaceListItem = ({ place, onSelect, onClick }) => {
  // 버튼 클릭 시 이벤트 전파(stopPropagation)를 통해 li의 onClick과 구분함.
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect(place);
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
      <SelectButton onClick={handleSelect}>추가</SelectButton>
    </ListItem>
  );
};

export default PlaceListItem;
