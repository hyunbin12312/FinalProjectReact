export const transformPlaces = (results, visiblePlaceCount) => {
  return results.slice(0, visiblePlaceCount).map((place) => ({
    name: place.place_name,
    address: place.road_address_name || place.address_name,
    category: place.category_group_name,
    phone: place.phone,
    detailLink: `https://map.kakao.com/link/map/${place.id}`,
    imageUrl: place.image_url,
    y: place.y,
    x: place.x,
  }));
};
