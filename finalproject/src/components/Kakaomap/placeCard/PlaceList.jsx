import React from "react";
import styled from "styled-components";
import PlaceListItem from "./PlaceListItem";

/*

*/

// ul 요소 스타일
const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 500px; /* 원하는 최대 높이 */
  overflow-y: auto; /* 내용이 max-height를 초과하면 스크롤 활성화 */
`;

const PlaceList = ({ places, selectedPlaces = [], onToggle, onItemClick }) => {
  return (
    <ListContainer>
      {places.map((place, index) => {
        // 각 장소가 선택된 상태인지 확인 (예: 이름 기준)
        const isSelected = selectedPlaces.some((p) => p.name === place.name);
        return (
          <PlaceListItem
            key={index}
            place={place}
            isSelected={isSelected}
            onToggle={onToggle}
            onClick={() => onItemClick(place)}
          />
        );
      })}
    </ListContainer>
  );
};

export default PlaceList;
