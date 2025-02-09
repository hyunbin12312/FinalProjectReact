// src/components/Kakaomap/kakaoFunction/SearchPlaces.jsx
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
}) => {
  // 여기서 e.preventDefault()를 호출하거나, 호출은 부모에서 해도 됩니다.
  e.preventDefault();

  const keyword = inputPlace;
  console.log("검색어:", keyword);

  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    alert("검색어를 입력해주세요");
    return;
  }

  const rect = "126.1240,33.17606,126.9900,33.58313";
  const pageLimit = 6;
  const initialPage = 1;

  setResults([]);
  setPageNumber(initialPage);
  setIsEnd(false);
  setVisiblePlaceCount(10);

  clearMarkers();
  if (infowindowRef.current) {
    infowindowRef.current.close();
  }

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
      setResults((prevResults) => [...prevResults, ...documents]);
      console.log(response.data);
      documents.forEach((place) => {
        displayMarker(place);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  ps.keywordSearch(keyword, placesSearchCB);
};
