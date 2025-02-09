export const placesSearchCB = ({
  data,
  status,
  mapInstance,
  displayMarker,
}) => {
  console.log(status);
  if (data.length > 0) {
    const bounds = new window.kakao.maps.LatLngBounds();

    data.forEach((place) => {
      displayMarker(place);
      bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
    });

    if (mapInstance) {
      // 장소 이동 (검색된 결과의 중심 좌표로 이동)
      mapInstance.panTo(new window.kakao.maps.LatLng(33.3606281, 126.5358345));

      // 지도 확대 레벨을 10으로 고정
      mapInstance.setLevel(10);
    }
  } else {
    alert("검색 결과가 없습니다.");
  }
};
