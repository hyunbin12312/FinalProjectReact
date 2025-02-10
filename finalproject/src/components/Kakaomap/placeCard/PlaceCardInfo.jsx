import React from "react";
import styled from "styled-components";

// 고정 크기의 정보 카드 컨테이너
const InfoDiv = styled.div`
  width: 600px;
  height: 160px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 한 줄씩 정보를 보여주는 컴포넌트
const InfoLine = styled.div`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const PlaceInfo = ({ place }) => {
  return (
    <InfoDiv>
      <InfoLine>
        <strong>장소 이름:</strong> {place.name}
      </InfoLine>
      <InfoLine>
        <strong>주소:</strong> {place.address}
      </InfoLine>
      <InfoLine>
        <strong>카테고리:</strong> {place.category}
      </InfoLine>
      {place.phone && (
        <InfoLine>
          <strong>전화번호:</strong> {place.phone}
        </InfoLine>
      )}
    </InfoDiv>
  );
};

export default PlaceInfo;
