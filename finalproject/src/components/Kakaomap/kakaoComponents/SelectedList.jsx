// SelectedList.jsx
import React from "react";
import styled from "styled-components";

/*

  이 컴포넌트는 플랜 생성 페이지에서의 선택한 장소를 보여주는 컴포넌트입니다.

  */

// 상단 제목 영역: AddListDiv
const AddListDiv = styled.div`
  font-size: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #333;
  margin-bottom: 10px;
`;

// SelectedListContainer: 전체 선택된 장소 목록을 감싸는 컨테이너
const SelectedListContainer = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

// 각 SelectedListItem의 컨테이너: 카드 스타일 적용
const SelectedListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 6px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 순번을 표시할 20×20 크기의 OrderBox
const OrderBox = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 8px;
`;

// 좌측 80×80 이미지 영역 (PlaceListItem과 동일)
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

// 정보 영역: 장소의 이름과 카테고지를 위아래로 배치
const InfoContainer = styled.div`
  flex: 1;
  text-align: left;
`;

// 장소 이름 (PlaceListItem과 동일)
const PlaceName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

// 카테고리 텍스트 (PlaceListItem과 동일)
const PlaceCategory = styled.div`
  font-size: 16px;
  color: #777;
`;

// 메시지 영역: 선택된 장소가 없을 때 보여줄 문구
const Message = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: #777;
`;

const SelectedList = ({ selectedPlaces = [] }) => {
  return (
    <SelectedListContainer>
      <AddListDiv>추가된 목록</AddListDiv>
      {selectedPlaces.length === 0 ? (
        <Message>추가된 장소가 없습니다</Message>
      ) : (
        selectedPlaces.map((place, index) => (
          <SelectedListItem key={index}>
            <OrderBox>{index + 1}</OrderBox>
            <ThumbnailContainer>
              {place.imageUrl ? (
                <ThumbnailImage src={place.imageUrl} alt={place.name} />
              ) : (
                <ThumbnailPlaceholder>이미지 없음</ThumbnailPlaceholder>
              )}
            </ThumbnailContainer>
            <InfoContainer>
              <PlaceName>{place.name}</PlaceName>
              <PlaceCategory>{place.category}</PlaceCategory>
            </InfoContainer>
          </SelectedListItem>
        ))
      )}
    </SelectedListContainer>
  );
};

export default SelectedList;
