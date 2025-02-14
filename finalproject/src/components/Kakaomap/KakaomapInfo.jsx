// KakaoMapInfo.jsx
import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Map, ZoomControl, useKakaoLoader } from "react-kakao-maps-sdk";
import { searchPlaces } from "./kakaoFunction/SearchPlaces";
import { loadMore } from "./kakaoFunction/LoadMore";
import { placesSearchCB } from "./kakaoFunction/PlaceSearchCB";
import { reset } from "./kakaoFunction/reset";
import PlaceList from "./placeCard/PlaceList";
import styled from "styled-components";
import SearchTab from "./kakaoComponents/SearchTab";
import SelectedList from "./kakaoComponents/SelectedList";
// CategoryTabs를 onCategoryClick prop을 사용할 수 있도록 수정합니다.
import CategoryTabs from "./categoryTab/CategoryTabs";
import { transformPlaces } from "./kakaoFunction/transformPlaces";

// 전체 콘텐츠를 좌우로 배치하는 Flex 컨테이너
const ContentContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  align-items: flex-start;
`;

// 왼쪽 컬럼: 검색창, 버튼, PlaceList, "더보기" 버튼
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 400px;
`;

// CenterContainer: 선택된 장소 목록과 Submit 버튼을 보여주는 영역 (PlaceList와 Map 사이)
const CenterContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 오른쪽 컬럼: 지도 영역
const RightContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
`;

// 검색창과 초기화 버튼을 같이 배치하는 컨테이너
const SearchAndButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

// 버튼 스타일 (흰색 베이스)
const StyledButton = styled.button`
  padding: 10px 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
    border-color: #ccc;
  }

  &:disabled {
    background-color: #f7f7f7;
    border-color: #eee;
    color: #999;
    cursor: default;
  }
`;

// "더보기" 버튼을 감싸는 컨테이너 (PlaceList 아래쪽)
const LoadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

// Submit 버튼 스타일 (CenterContainer 내부에 위치)
const SubmitButton = styled(StyledButton)`
  margin-top: 10px;
  width: 100%;
`;

function KakaoMapInfo() {
  useKakaoLoader();

  const navi = useNavigate();

  // 카카오 지도 SDK가 로드된 후 사용할 장소 검색 객체 생성
  const ps = new window.kakao.maps.services.Places();

  const { auth } = useContext(AuthContext);

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

  // 선택된 장소들을 저장하는 배열 상태 (새 검색어 입력 시 유지됨)
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // 선택된 카테고리 상태 (초기값: "" 없음)
  const [selectedCategory, setSelectedCategory] = useState("");
  // 카테고리를 추가하고싶다면 여기서 추가함
  const categories = ["숙박", "음식점", "관광명소"];

  // 검색 폼 제출 시 호출되는 함수
  const handleSearch = (e) => {
    e.preventDefault();
    setIsEnd(false);
    // 새 검색 시, 기존 선택된 장소와 마커는 유지하기 위해 dummy 함수를 전달
    searchPlaces({
      e,
      inputPlace,
      setResults,
      setPageNumber,
      setIsEnd,
      setVisiblePlaceCount,
      clearMarkers: () => {}, // dummy: 기존 마커 유지
      infowindowRef,
      ps,
      displayMarker: () => {}, // dummy: 기존 마커 유지
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
        displayMarker: () => {}, // dummy 함수
      });
    }
  };

  // 초기화 버튼 클릭 시 호출되는 함수
  // (검색 결과, 페이지 등만 초기화하고, 선택된 장소와 마커는 유지)
  const handleReset = () => {
    reset({
      setInputPlace,
      setClickPlace,
      setResults,
      setIsEnd,
      setPageNumber,
      setVisiblePlaceCount,
      setDefaultLocation,
      clearMarkers: () => {}, // dummy
      infowindowRef,
    });
  };

  // 지도에 표시된 마커들을 모두 제거하는 함수 (검색 결과 관련 마커 제거용)
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  // 지도에 마커를 표시하고 클릭 이벤트를 등록하는 함수 (선택된 장소에 대한 마커 표시)
  const displayMarker = (place) => {
    if (!mapInstance) return;
    const marker = new window.kakao.maps.Marker({
      map: mapInstance,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    // customId를 할당 (장소 이름 사용 - 유니크한 값이어야 함)
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
        if (mapInstance) {
          displayMarker(place);
        }
        return [...prev, place];
      }
      return prev;
    });
  };

  // 선택 토글 함수: PlaceListItem에서 onToggle으로 호출됨.
  const handleTogglePlace = (place) => {
    setSelectedPlaces((prev) => {
      if (prev.find((p) => p.name === place.name)) {
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
  };

  // 선택한 모든 객체가 담긴 배열
  const allPlaceInfo = selectedPlaces.map(
    ({ name, address, category, phone, detailLink, x, y }, index) => ({
      placeName: name,
      placeAddress: address,
      category,
      phone,
      linkUrl: detailLink,
      lat: y,
      lng: x,
      planOrder: index + 1,
    })
  );

  console.log(allPlaceInfo);

  // Submit 버튼 클릭 시, 선택된 장소 배열을 백엔드로 전송하는 함수 (예시)
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost/map", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        travelPlan: allPlaceInfo,
      });
      console.log("Submit 성공:", response.data);
      navi("/map/list");
      alert("여행플랜 저장에 성공하였습니다!");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error.response.data;
        alert(errorMsg);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  // 해당 카테고리명을 검색어로 사용하여 searchPlaces 함수를 실행
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setInputPlace(category);
    setIsEnd(false);
    searchPlaces({
      e: { preventDefault: () => {} }, // 더미데이터를 보내 이벤트를 실행시킴(새로고침방지)
      inputPlace: category,
      setResults,
      setPageNumber,
      setIsEnd,
      setVisiblePlaceCount,
      clearMarkers: () => {}, // dummy: 기존 마커 유지
      infowindowRef,
      ps,
      displayMarker: () => {}, // dummy: 기존 마커 유지
      placesSearchCB,
      mapInstance,
    });
    //setInputPlace("");
  };

  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <ContentContainer>
          <LeftContainer>
            <SearchAndButtonsContainer>
              <SearchTab
                inputPlace={inputPlace}
                setInputPlace={setInputPlace}
                handleSearch={handleSearch}
                handleReset={handleReset}
              />
            </SearchAndButtonsContainer>
            {/* CategoryTabs에 onCategoryClick prop을 추가하여 탭 클릭 시 handleCategoryClick 실행 */}
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              setInputPlace={setInputPlace}
              onCategoryClick={handleCategoryClick}
            />
            <PlaceList
              places={transformPlaces(results, visiblePlaceCount)}
              selectedPlaces={selectedPlaces}
              onToggle={handleTogglePlace}
              onItemClick={handleItemClick}
            />
            <LoadMoreContainer>
              {inputPlace.trim() ? (
                !isEnd ? (
                  <StyledButton onClick={handleLoadMore}>더보기</StyledButton>
                ) : (
                  <StyledButton disabled>더보기</StyledButton>
                )
              ) : (
                <StyledButton disabled>더보기</StyledButton>
              )}
            </LoadMoreContainer>
          </LeftContainer>
          {/* CenterContainer: 선택된 장소 목록과 Submit 버튼 */}
          <CenterContainer>
            <SelectedList selectedPlaces={selectedPlaces} />
            {auth.isAuthenticated ? (
              <StyledButton onClick={handleSubmit}>일정생성</StyledButton>
            ) : (
              <StyledButton onClick={() => alert("로그인 이후에 가능합니다.")}>
                일정생성
              </StyledButton>
            )}
          </CenterContainer>
          <RightContainer>
            <Map
              center={defaultLocation.center}
              isPanto={defaultLocation.isPanto}
              style={{ width: "100%", height: "440px" }}
              level={defaultLocation.level}
              onCreate={setMapInstance}
            >
              <ZoomControl position={"RIGHT"} />
            </Map>
          </RightContainer>
        </ContentContainer>
        <p>{clickPlace}</p>
      </div>
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
