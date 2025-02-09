import React from "react";
import styled from "styled-components";
import PlaceListItem from "./PlaceListItem";

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlaceList = ({ places, onSelect, onItemClick }) => {
  return (
    <ListContainer>
      {places.map((place, index) => (
        <PlaceListItem
          key={index}
          place={place}
          onSelect={onSelect}
          onClick={() => onItemClick(place)}
        />
      ))}
    </ListContainer>
  );
};

export default PlaceList;
