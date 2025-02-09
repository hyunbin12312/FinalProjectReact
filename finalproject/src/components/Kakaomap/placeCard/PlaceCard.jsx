import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// 카드 컨테이너 (간단한 정보만 보여줌)
const CardContainer = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: left;
  padding: 16px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: flex-start;
  &:hover {
    transform: translateY(-2px);
  }
`;

// 좌측 썸네일 이미지 스타일 (정확히 100x100 픽셀)
const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 16px;
`;

// 이미지가 없을 경우 표시할 영역 (정확히 100x100 픽셀)
const ThumbnailPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
`;

// 우측 정보 영역
const InfoContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

// 장소 이름 (카드 상단)
const PlaceName = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

// 장소 카테고리
const PlaceCategory = styled.p`
  margin: 4px 0 0 0;
  font-size: 16px;
  color: #777;
`;

/* ---------------- Modal 스타일 ---------------- */

// 모달 오버레이: 화면 전체를 덮어 배경을 어둡게 처리
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// 모달 콘텐츠: 중앙에 배치되는 내용 영역
const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

// 닫기 버튼 (오른쪽 상단)
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
`;

// 상세 정보 항목
const DetailItem = styled.p`
  margin: 8px 0;
  color: #555;
  font-size: 16px;
`;

const DetailLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

// 미리보기 이미지 영역 (모달 내, 고정된 크기)
const PreviewImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 4px;
  background: #f0f0f0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderText = styled.span`
  color: #999;
  font-size: 16px;
`;

function PlaceCard({ place }) {
  // 모달 오픈 여부 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 미리보기 이미지 URL 상태
  const [imageUrl, setImageUrl] = useState("");

  // 컴포넌트가 마운트될 때나 place.name이 바뀔 때 이미지를 가져옵니다.
  useEffect(() => {
    axios
      .get("https://dapi.kakao.com/v2/search/image", {
        headers: {
          Authorization: `KakaoAK 5357f44dd713ad518dcc5ef6d3bfbc66`,
        },
        params: {
          query: place.name,
          size: 1, // 첫 번째 결과만
        },
      })
      .then((response) => {
        const documents = response.data.documents;
        if (documents && documents.length > 0) {
          setImageUrl(documents[0].image_url);
        } else {
          setImageUrl("");
        }
      })
      .catch((error) => {
        console.error("이미지 검색 에러:", error);
        setImageUrl("");
      });
  }, [place.name]);

  return (
    <>
      {/* 카드 영역 */}
      <CardContainer onClick={() => setIsModalOpen(true)}>
        {imageUrl ? (
          <Thumbnail src={imageUrl} alt={place.name} />
        ) : (
          <ThumbnailPlaceholder>이미지 없음</ThumbnailPlaceholder>
        )}
        <InfoContainer>
          <PlaceName>{place.name}</PlaceName>
          <PlaceCategory>{place.category}</PlaceCategory>
        </InfoContainer>
      </CardContainer>

      {/* 모달 창 */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              &times;
            </CloseButton>
            <PreviewImageWrapper>
              {imageUrl ? (
                <PreviewImage src={imageUrl} alt={place.name} />
              ) : (
                <PlaceholderText>
                  미리보기 이미지가 제공되지 않습니다
                </PlaceholderText>
              )}
            </PreviewImageWrapper>
            <PlaceName>{place.name}</PlaceName>
            <DetailItem>
              <strong>주소:</strong> {place.address}
            </DetailItem>
            {place.phone && (
              <DetailItem>
                <strong>전화번호:</strong> {place.phone}
              </DetailItem>
            )}
            <DetailItem>
              <strong>카테고리:</strong> {place.category}
            </DetailItem>
            <DetailItem>
              <DetailLink
                href={place.detailLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                자세히 보기
              </DetailLink>
            </DetailItem>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default PlaceCard;
