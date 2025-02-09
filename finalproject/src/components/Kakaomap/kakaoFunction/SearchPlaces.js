import axios from "axios";

export const searchPlaces = ({
  e,
  inputPlace,
  setResults,
  setPageNumber,
  setIsEnd,
  setVisiblePlaceCount,
  clearMarkers,
  infowindowRef,
  ps,
  placesSearchCB,
  displayMarker,
  mapInstance,
}) => {
  e.preventDefault();
  const keyword = inputPlace;
  console.log("검색어:", keyword);

  if (!keyword.trim("")) {
    alert("검색어를 입력해주세요");
    return;
  }

  // 중심 좌표 (검색했을 때 이곳을 중앙좌표로 삼음)
  const rect = "126.1240,33.17606,126.9900,33.58313";
  // 한번에 보여줄 개수
  const pageLimit = 6;
  // 보여줄 페이지
  const initialPage = 1;

  // 검색어 변경 시 기존 결과, 페이지 번호, 마지막 페이지 여부, 그리고 보일 개수를 초기화
  setResults([]);
  setPageNumber(initialPage);
  setIsEnd(false);
  setVisiblePlaceCount(10);

  // 기존 지도에 표시된 마커들을 제거
  clearMarkers();
  // 기존 지도에 표시된 마커인터페이스들도 제거
  infowindowRef.current.close();

  axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
      headers: {
        Authorization: `KakaoAK 5357f44dd713ad518dcc5ef6d3bfbc66`,
      },
      params: {
        query: inputPlace,
        rect: rect,
        size: pageLimit,
        page: initialPage,
      },
    })
    .then((response) => {
      const { documents, meta } = response.data;
      // 기존 결과에 추가 (필요에 따라 results 상태를 업데이트)
      setResults((prevResults) => [...prevResults, ...documents]);

      console.log(response.data);

      // 받아온 결과들에 대해 마커를 생성
      documents.forEach((place) => {
        displayMarker(place);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  ps.keywordSearch(keyword, (data, status) =>
    placesSearchCB({ data, status, mapInstance, displayMarker })
  );
};
