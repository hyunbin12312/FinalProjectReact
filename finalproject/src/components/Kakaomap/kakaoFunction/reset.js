export const reset = ({
  setInputPlace,
  setClickPlace,
  setResults,
  setIsEnd,
  setPageNumber,
  setVisiblePlaceCount,
  setDefaultLocation,
  clearMarkers,
  infowindowRef,
}) => {
  // 1) 검색어, 클릭한 장소, 검색 결과 등 리셋
  setInputPlace(""); // 검색창 비우기
  setClickPlace(""); // 클릭 정보 초기화
  setResults([]); // 검색 결과 비우기
  setIsEnd(false); // 더 이상 불러올 데이터가 없는지 여부 초기화
  setPageNumber(1); // 페이지 번호 초기화
  setVisiblePlaceCount(10); // 보여줄 개수 초기화

  // 2) 지도 위치 및 레벨도 초기 상태로 되돌리기
  setDefaultLocation({
    center: { lat: 33.3608281, lng: 126.5535785 },
    isPanto: false,
    level: 10,
  });

  // 3) 마커, 인포윈도우 모두 제거
  clearMarkers(); // 마커 배열 비우고 지도에서 제거
  infowindowRef.current.close(); // 열려있는 인포윈도우 닫기
};
