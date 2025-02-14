import React from "react";
import {
  ListItem,
  ThumbnailContainer,
  ThumbnailImage,
  ThumbnailPlaceholder,
  BasicInfo,
  PlaceName,
  PlaceCategory,
  SelectButton,
} from "./PlaceListItemStyles"; // 스타일 파일 경로에 맞게 수정

const PlaceListItem = ({
  place,
  isSelected = false,
  onToggle = () => {},
  onClick = () => {},
}) => {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(place);
  };

  console.log(place);

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
