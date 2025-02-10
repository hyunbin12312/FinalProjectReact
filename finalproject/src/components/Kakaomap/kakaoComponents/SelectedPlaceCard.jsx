// SelectedPlaceCard.jsx
import React from "react";
import styled from "styled-components";

// 카드 컨테이너: PlaceListItem과 유사한 카드 스타일
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 16px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

// 좌측 80×80 이미지 영역
const ThumbnailContainer = styled.div`
  width: 80px;
  height: 80px;
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

// 정보 영역: 장소의 상세 정보를 위아래로 배치
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
`;

// 장소 이름 (굵은 텍스트)
const PlaceName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

// 상세 정보 항목 (주소, 카테고리, 전화번호, 상세 링크 등)
const DetailItem = styled.div`
  font-size: 16px;
  color: #777;
  margin-bottom: 2px;
`;

const SelectedPlaceCard = ({ place }) => {
  return (
    <CardContainer>
      <ThumbnailContainer>
        {place.imageUrl ? (
          <ThumbnailImage src={place.imageUrl} alt={place.name} />
        ) : (
          <ThumbnailPlaceholder>이미지 없음</ThumbnailPlaceholder>
        )}
      </ThumbnailContainer>
      <InfoContainer>
        <PlaceName>{place.name}</PlaceName>
        {place.address && (
          <DetailItem>
            <strong>주소:</strong> {place.address}
          </DetailItem>
        )}
        {place.category && (
          <DetailItem>
            <strong>카테고리:</strong> {place.category}
          </DetailItem>
        )}
        {place.phone && (
          <DetailItem>
            <strong>전화번호:</strong> {place.phone}
          </DetailItem>
        )}
        {place.detailLink && (
          <DetailItem>
            <strong>자세히:</strong>{" "}
            <a
              href={place.detailLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              보기
            </a>
          </DetailItem>
        )}
      </InfoContainer>
    </CardContainer>
  );
};

export default SelectedPlaceCard;
