import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  Map,
  MapTypeControl,
  ZoomControl,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { searchPlaces } from "./kakaoFunction/SearchPlaces";
import { loadMore } from "./kakaoFunction/LoadMore";
import { placesSearchCB } from "./kakaoFunction/PlaceSearchCB";
import { reset } from "./kakaoFunction/reset";
import PlaceCard from "./placeCard/PlaceCard";

function KakaoMap() {
  useKakaoLoader();
  // 카카오 지도 SDK가 로드된 후 사용할 장소 검색 객체 생성
  const ps = new window.kakao.maps.services.Places();

  // 지도의 기본 설정 state
  const [defaultLocation, setDefaultLocation] = useState({
    center: { lat: 33.3608281, lng: 126.5535785 },
    isPanto: true,
    level: 10,
  });

  // 마커 클릭 시 장소명을 표출할 인포윈도우 생성
  const infowindowRef = useRef(null);
  if (!infowindowRef.current) {
    infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
  }

  // 마커관리 Ref
  const markersRef = useRef([]);

  // 마커의 infowindow관리
  let currentInfoWindow = null;

  // <Map> 컴포넌트에서 반환되는 실제 지도 인스턴스를 저장할 state
  const [mapInstance, setMapInstance] = useState(null);

  // 사용자가 입력한 검색어 state
  const [inputPlace, setInputPlace] = useState("");

  // 사용자가 검색어를 입력했을 때, 보여줄 항목의 수
  const [visiblePlaceCount, setVisiblePlaceCount] = useState(10);

  // 클릭한 장소 state
  const [clickPlace, setClickPlace] = useState("");

  // 전체 검색 결과를 저장할 상태
  const [results, setResults] = useState([]);

  // 현재 페이지 번호 (최초 1페이지)
  const [pageNumber, setPageNumber] = useState(1);

  // 마지막 페이지 여부 (추가 요청이 가능한지 여부)
  const [isEnd, setIsEnd] = useState(false);

  // 검색 폼 제출 시 호출되는 함수
  const handleSearch = (e) => {
    e.preventDefault();
    // 검색을 다시 시작하면 더보기 버튼이 활성화됨
    setIsEnd(false);
    searchPlaces({
      e,
      inputPlace,
      setResults,
      setPageNumber,
      setIsEnd,
      setVisiblePlaceCount,
      clearMarkers,
      infowindowRef,
      ps,
      displayMarker,
      // 검색 결과를 처리하는 콜백 함수
      placesSearchCB,
      // 콜백함수를 위한 추가 State 전달
      mapInstance,
    });
  };

  // 추가 검색 (페이지 증가 시 호출)
  const handleLoadMore = () => {
    // 만약 현재 화면에 보이는 개수가 전체 로드된 결과보다 적다면
    if (visiblePlaceCount < results.length) {
      setVisiblePlaceCount(visiblePlaceCount + 10);
    } else if (!isEnd) {
      // 모든 로드된 결과를 이미 보여주고 있고 추가 데이터가 있다면,
      // 추가 데이터를 받아오는 loadMore 함수 호출
      loadMore({
        inputPlace,
        setResults,
        setPageNumber,
        pageNumber,
        isEnd,
        setIsEnd,
        setVisiblePlaceCount,
        displayMarker,
      });
    }
  };

  // 초기화 버튼
  const handleReset = () => {
    reset({
      setInputPlace,
      setClickPlace,
      setResults,
      setIsEnd,
      setPageNumber,
      setVisiblePlaceCount,
      setDefaultLocation,
      clearMarkers,
      infowindowRef,
    });
  };

  // 마커를 초기화하는 함수
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  // 지도에 마커를 표시하고 클릭 이벤트를 등록하는 함수
  const displayMarker = (place) => {
    // 지도 인스턴스가 준비되지 않은 경우
    if (!mapInstance) return;

    const marker = new window.kakao.maps.Marker({
      map: mapInstance,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 생성된 마커를 markersRef에 저장
    markersRef.current.push(marker);

    // 마커에 클릭 이벤트 등록
    window.kakao.maps.event.addListener(marker, "click", function () {
      infowindowRef.current.close();

      infowindowRef.current.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );

      infowindowRef.current.open(mapInstance, marker);

      // 위도 경도를 담을 객체
      const latlng = marker.getPosition();
      // 위도 경도 나누기
      const clickLat = latlng.getLat();
      const clickLng = latlng.getLng();

      // 클릭하면 위도, 경도 뽑기
      setClickPlace(`위도 : ${latlng.getLat()}, 경도 : ${latlng.getLng()}`);

      // 이동
      setDefaultLocation({
        center: { lat: clickLat, lng: clickLng },
        isPanto: true,
        level: defaultLocation.level,
      });
    });
  };

  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={inputPlace}
            onChange={(e) => setInputPlace(e.target.value)}
            placeholder="장소를 입력하세요"
          />
          <button type="submit">검색</button>
        </form>
        <p>{clickPlace}</p>
      </div>
      <div>
        {inputPlace.trim() ? (
          // 겁색어가 없을땐 disabled, 키워드가 입력되면 활성화
          !isEnd ? (
            <button onClick={handleLoadMore}>더보기</button>
          ) : (
            <button disabled>더보기</button>
          )
        ) : (
          // 다시 검색버튼을 누르면 isEnd가 false로 바뀌어 활성화된다.
          <button disabled>더보기</button>
        )}
        <button onClick={handleReset}>초기화</button>
      </div>
      <Map
        center={defaultLocation.center}
        isPanto={defaultLocation.isPanto}
        style={{ width: "700px", height: "440px" }}
        level={defaultLocation.level}
        onCreate={setMapInstance}
      >
        <ZoomControl position={"RIGHT"} />
      </Map>
      <ul>
        {results.slice(0, visiblePlaceCount).map((place, i) => (
          <li key={i}>{place.place_name}</li>
        ))}
      </ul>
    </>
  );
}

export default KakaoMap;
