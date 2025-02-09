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
import PlaceList from "./placeCard/PlaceList";
import styled from "styled-components";
import SearchTab from "./kakaoComponents/SearchTab";

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const ListContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

const MapContainer = styled.div`
  flex: 2;
  min-width: 700px;
`;

function KakaoMapInfo() {
  useKakaoLoader();

  // 카카오 지도 SDK가 로드된 후 사용할 장소 검색 객체 생성
  const ps = new window.kakao.maps.services.Places();

  // 지도의 기본 설정 state
  const [defaultLocation, setDefaultLocation] = useState({
    center: { lat: 33.3608281, lng: 126.5535785 },
    isPanto: true,
    level: 10,
  });

  // 인포윈도우 생성
  const infowindowRef = useRef(null);
  if (!infowindowRef.current) {
    infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
  }

  // 마커 관리
  const markersRef = useRef([]);

  // Map 인스턴스
  const [mapInstance, setMapInstance] = useState(null);

  // 검색어 상태
  const [inputPlace, setInputPlace] = useState("");

  // 검색 결과 관련 상태
  const [results, setResults] = useState([]);
  const [visiblePlaceCount, setVisiblePlaceCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  // 마커 클릭 시 표시할 위치
  const [clickPlace, setClickPlace] = useState("");

  // 선택된 장소들을 저장하는 배열 상태
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // 검색 폼 제출 시 호출되는 함수
  const handleSearch = (e) => {
    e.preventDefault();
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
      displayMarker: () => {}, // 더미 함수 전달
      placesSearchCB,
      mapInstance,
    });
  };

  // 추가 검색 (페이지 증가 시)
  const handleLoadMore = () => {
    if (visiblePlaceCount < results.length) {
      setVisiblePlaceCount(visiblePlaceCount + 10);
    } else if (!isEnd) {
      loadMore({
        inputPlace,
        setResults,
        setPageNumber,
        pageNumber,
        isEnd,
        setIsEnd,
        setVisiblePlaceCount,
        displayMarker: () => {}, // 더미 함수 전달
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
    setSelectedPlaces([]); // 선택된 장소 배열도 초기화
  };

  // 마커 초기화 함수
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  // 지도에 마커 표시 및 이벤트 등록 함수
  const displayMarker = (place) => {
    if (!mapInstance) return;
    const marker = new window.kakao.maps.Marker({
      map: mapInstance,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    markersRef.current.push(marker);

    window.kakao.maps.event.addListener(marker, "click", function () {
      infowindowRef.current.close();
      infowindowRef.current.setContent(
        `<div style="padding:5px;font-size:12px;">${place.name}</div>`
      );
      infowindowRef.current.open(mapInstance, marker);

      const latlng = marker.getPosition();
      const clickLat = latlng.getLat();
      const clickLng = latlng.getLng();

      setClickPlace(`위도 : ${clickLat}, 경도 : ${clickLng}`);

      setDefaultLocation({
        center: { lat: clickLat, lng: clickLng },
        isPanto: true,
        level: defaultLocation.level,
      });
    });
  };

  // PlaceList에서 "추가" 버튼 클릭 시 호출되는 함수
  const handleSelectPlace = (place) => {
    // 중복 선택 방지 로직 등
    setSelectedPlaces((prev) => {
      if (!prev.find((p) => p.name === place.name)) {
        // 선택된 장소에 대해서만 마커 표시
        if (mapInstance) {
          displayMarker(place);
        }
        return [...prev, place];
      }
      return prev;
    });
  };

  // PlaceList에서 항목 클릭 시(예: 모달 열기 등) 호출되는 함수
  const handleItemClick = (place) => {
    console.log("장소 클릭:", place);
    // 필요에 따라 모달을 열거나 다른 동작을 구현할 수 있습니다.
  };

  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <SearchTab
          inputPlace={inputPlace}
          setInputPlace={setInputPlace}
          handleSearch={handleSearch}
        />
        <p>{clickPlace}</p>
      </div>
      <div>
        {inputPlace.trim() ? (
          !isEnd ? (
            <button onClick={handleLoadMore}>더보기</button>
          ) : (
            <button disabled>더보기</button>
          )
        ) : (
          <button disabled>더보기</button>
        )}
        <button onClick={handleReset}>초기화</button>
      </div>

      {/* PlaceList와 Map을 좌우로 배치하는 영역 */}
      <ContentContainer>
        <ListContainer>
          <PlaceList
            places={results.slice(0, visiblePlaceCount).map((place) => ({
              name: place.place_name,
              address: place.road_address_name || place.address_name,
              category: place.category_group_name,
              phone: place.phone,
              detailLink: `https://map.kakao.com/link/map/${place.id}`,
              imageUrl: place.image_url, // 이미지 URL이 있다면
              y: place.y, // 좌표 정보 추가 (필요한 경우)
              x: place.x, // 좌표 정보 추가 (필요한 경우)
            }))}
            onSelect={handleSelectPlace} // 반드시 함수여야 함
            onItemClick={handleItemClick}
          />
        </ListContainer>
        <MapContainer>
          <Map
            center={defaultLocation.center}
            isPanto={defaultLocation.isPanto}
            style={{ width: "100%", height: "440px" }}
            level={defaultLocation.level}
            onCreate={setMapInstance}
          >
            <ZoomControl position={"RIGHT"} />
          </Map>
        </MapContainer>
      </ContentContainer>

      {/* 선택된 장소 목록 출력 */}
      <div style={{ marginTop: "20px" }}>
        <h3>선택된 장소들:</h3>
        <ul>
          {selectedPlaces.map((place, index) => (
            <li key={index}>{place.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default KakaoMapInfo;
