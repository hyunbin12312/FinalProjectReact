import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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

// Flex Container를 생성하여 PlaceList와 Map을 좌우로 배치
const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

// PlaceList 영역의 스타일 (예: 너비 지정)
const ListContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

// Map 영역의 스타일 (예: 너비 지정)
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

  // Map 인스턴스를 저장할 state
  const [mapInstance, setMapInstance] = useState(null);

  // 사용자가 입력한 검색어 상태
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
    // displayMarker 함수는 검색 시 자동 호출되지 않도록 더미 함수를 전달
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

  // 추가 검색 (페이지 증가 시) 호출되는 함수
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

  // 초기화 버튼 클릭 시 호출되는 함수
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

  // 지도에 표시된 마커들을 모두 제거하는 함수
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  // 지도에 마커를 표시하고 클릭 이벤트를 등록하는 함수
  const displayMarker = (place) => {
    if (!mapInstance) return;
    const marker = new window.kakao.maps.Marker({
      map: mapInstance,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    // 예: 각 마커에 customId를 할당 (여기서는 장소 이름 사용)
    marker.customId = place.name;
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

  // PlaceList에서 "추가" 버튼 클릭 시 호출되는 함수 (선택된 장소에 대해 마커 표시)
  const handleSelectPlace = (place) => {
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

  // 선택 토글 함수: PlaceListItem에서 onToggle으로 호출됨.
  // 이미 선택되어 있으면 제거하고, 선택되지 않았으면 추가함.
  const handleTogglePlace = (place) => {
    setSelectedPlaces((prev) => {
      if (prev.find((p) => p.name === place.name)) {
        // 마커 제거: markersRef에서 해당 마커를 찾아 제거
        markersRef.current = markersRef.current.filter((marker) => {
          if (marker.customId === place.name) {
            marker.setMap(null);
            return false;
          }
          return true;
        });
        return prev.filter((p) => p.name !== place.name);
      } else {
        if (mapInstance) {
          displayMarker(place);
        }
        return [...prev, place];
      }
    });
  };

  // PlaceList에서 항목 클릭 시(예: 모달 열기 등) 호출되는 함수
  const handleItemClick = (place) => {
    console.log("장소 클릭:", place);
    // 필요에 따라 모달을 열거나 다른 동작을 구현할 수 있습니다.
  };

  return (
    <>
      {/* 상단 검색 영역 */}
      <div style={{ paddingTop: "50px" }}>
        <SearchTab
          inputPlace={inputPlace}
          setInputPlace={setInputPlace}
          handleSearch={handleSearch}
        />
        <p>{clickPlace}</p>
      </div>
      {/* 더보기 및 초기화 버튼 */}
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
              imageUrl: place.image_url, // 이미지 URL이 있다면 사용
              y: place.y, // 좌표 정보 추가
              x: place.x, // 좌표 정보 추가
            }))}
            selectedPlaces={selectedPlaces}
            onToggle={handleTogglePlace} // 토글 함수 전달
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
