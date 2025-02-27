import axios from "axios";
import PlaceListItem from "../placeCard/PlaceListItem";

/*
  이 컴포넌트는 검색에 대한 결과를 API로 요청하는 컴포넌트입니다.
  axios를 사용하여 API 결과를 요청합니다.
*/

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
  // 검색어가 없으면 알림 후 종료
  if (!keyword.trim()) {
    alert("검색어를 입력해주세요");
    return;
  }

  // 중심 좌표 (검색했을 때 이곳을 중앙좌표로 삼음)
  const rect = "126.1240,33.17606,126.9900,33.58313";
  // 한 번에 보여줄 개수
  const pageLimit = 6;
  // 보여줄 페이지
  const initialPage = 1;

  // 검색어 변경 시 기존 결과, 페이지 번호, 마지막 페이지 여부, 보일 개수 초기화
  setResults([]);
  setPageNumber(initialPage);
  setIsEnd(false);
  setVisiblePlaceCount(10);

  // 기존 지도에 표시된 마커 및 인포윈도우 제거
  clearMarkers();
  infowindowRef.current.close();
  axios
    .get("https://dapi.kakao.com/v2/local/search/keyword.json", {
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
    .then(async (response) => {
      const { documents, meta } = response.data;

      // 각 장소에 대해 이미지 검색을 수행
      const documentsWithImages = await Promise.all(
        documents.map(async (place) => {
          try {
            // 이미지 검색 API 호출
            const imageResponse = await axios.get(
              "https://dapi.kakao.com/v2/search/image",
              {
                headers: {
                  Authorization: `KakaoAK 5357f44dd713ad518dcc5ef6d3bfbc66`,
                },
                params: {
                  query: place.place_name, // 이 값이 올바른지 확인
                  size: 1,
                },
              }
            );
            /*
            console.log(
              "이미지 검색 응답 for",
              place.place_name,
              ":",
              imageResponse.data
            );
            */
            const imageDocs = imageResponse.data.documents;
            /**
             * 여기서 return에서 돌아가는 값들이 PlaceListItem에 전달이 되지 않고있음.
             *
             * PlaceListItem에 어떻게 보낼지 생각해볼것.
             *
             */
            return {
              ...place,
              imageUrl:
                imageDocs && imageDocs.length > 0 ? imageDocs[0].image_url : "",
              name: place.place_name, // alias 추가: 나중에 PlaceListItem에서 place.name 사용
            };
          } catch (error) {
            console.error("이미지 검색 에러 for", place.place_name, ":", error);
            return {
              ...place,
              imageUrl: "",
              name: place.place_name,
            };
          }
        })
      );

      // 받아온 장소 정보(이미지 URL이 추가된)를 결과에 업데이트
      setResults((prevResults) => [...prevResults, ...documentsWithImages]);

      // 추가로, 기존 검색 결과를 처리하는 콜백 호출 (예: 마커 표시)
      ps.keywordSearch(keyword, (data, status) =>
        placesSearchCB({ data, status, mapInstance, displayMarker })
      );
    })
    .catch((error) => {
      console.error("장소 검색 에러:", error);
    });
};
