import axios from "axios";

export const loadMore = ({
  inputPlace,
  setResults,
  setPageNumber,
  pageNumber,
  isEnd,
  setIsEnd,
  setVisiblePlaceCount,
  displayMarker,
}) => {
  if (isEnd) return; // 마지막 페이지면 요청 중단

  const rect = "126.1240,33.17606,126.9900,33.58313";
  const pageLimit = 6;
  const nextPage = pageNumber + 1;

  axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
      params: {
        query: inputPlace,
        rect: rect,
        size: pageLimit,
        page: nextPage,
      },
      headers: {
        Authorization: `KakaoAK 5357f44dd713ad518dcc5ef6d3bfbc66`,
      },
    })
    .then((response) => {
      const { documents, meta } = response.data;
      // 기존 결과에 추가
      setResults((prevResults) => [...prevResults, ...documents]);

      console.log(response.data);

      // 추가로 받아온 결과들에 대해 마커를 생성
      documents.forEach((place) => {
        displayMarker(place);
      });

      setPageNumber(nextPage);
      if (meta.is_end) {
        setIsEnd(true);
      }

      // 새로 받아온 결과 수만큼 visiblePlaceCount 증가
      setVisiblePlaceCount((prevCount) => prevCount + documents.length);
    })
    .catch((error) => {
      console.error(error);
    });
};
