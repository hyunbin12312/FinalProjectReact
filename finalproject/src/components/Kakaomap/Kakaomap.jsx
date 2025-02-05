import axios from "axios";
import { useEffect, useState } from "react";
import {
  Map,
  MapTypeControl,
  ZoomControl,
  useKakaoLoader,
} from "react-kakao-maps-sdk";

function KakaoMap(props) {
  useKakaoLoader();
  // 카카오 지도 SDK가 로드된 후 사용할 장소 검색 객체 생성
  const ps = new window.kakao.maps.services.Places();

  // 마커 클릭 시 장소명을 표출할 인포윈도우 생성
  const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

  // <Map> 컴포넌트에서 반환되는 실제 지도 인스턴스를 저장할 state
  const [mapInstance, setMapInstance] = useState(null);

  // 사용자가 입력한 검색어 state
  const [inputPlace, setInputPlace] = useState("");

  const [clickPlace, setClickPlace] = useState("");

  // 지도의 기본 설정 state
  const [defaultLocation, setDefaultLocation] = useState({
    center: { lat: 33.3606281, lng: 126.5358345 },
    isPanto: false,
    level: 10,
  });

  // 검색 폼 제출 시 호출되는 함수
  const searchPlaces = (e) => {
    e.preventDefault();
    const keyword = inputPlace;
    console.log("검색어:", keyword);

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("검색어를 입력해주세요");
      return;
    }

    const rect = "126.1240,33.17606,126.9900,33.58313";

    const response = [];

    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${inputPlace}&rect=${rect}`,
        {
          headers: {
            Authorization: `KakaoAK 5357f44dd713ad518dcc5ef6d3bfbc66`,
          },
        }
      )
      .then((data) => {
        console.log(data);
      });

    ps.keywordSearch(keyword, placesSearchCB);
  };

  // 검색 결과를 처리하는 콜백 함수
  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      if (mapInstance) {
        mapInstance.setBounds(bounds);
      }
    } else {
      alert("검색 결과가 없습니다.");
    }
  };

  // 지도에 마커를 표시하고 클릭 이벤트를 등록하는 함수
  const displayMarker = (place) => {
    // 지도 인스턴스가 준비되지 않은 경우
    if (!mapInstance) return;

    const marker = new window.kakao.maps.Marker({
      map: mapInstance,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭 이벤트 등록
    window.kakao.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );

      infowindow.open(mapInstance, marker);

      // 위도 경도를 담을 객체
      const latlng = marker.getPosition();

      // 클릭하면 위도, 경도 뽑기
      setClickPlace(`위도 : ${latlng.getLat()}, 경도 : ${latlng.getLng()}`);

      // 위도 경도 나누기
      const clickLat = latlng.getLat();
      const clickLng = latlng.getLng();

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
      <div>
        <form onSubmit={searchPlaces}>
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
      <Map
        center={defaultLocation.center}
        isPanto={defaultLocation.isPanto}
        style={{ width: "800px", height: "360px" }}
        level={defaultLocation.level}
        onCreate={setMapInstance}
      >
        <ZoomControl position={"RIGHT"} />
      </Map>
      <button
        onClick={() =>
          setDefaultLocation({
            center: { lat: 33.3606281, lng: 126.5358345 },
            isPanto: true,
            level: 10,
          })
        }
      >
        지도 중심좌표 이동시키기
      </button>{" "}
      <button
        onClick={() =>
          setDefaultLocation({
            center: { lat: 33.5070772, lng: 126.4934311 },
            isPanto: true,
            level: 3,
          })
        }
      >
        지도 중심좌표 부드럽게 이동시키기
      </button>
    </>
  );
}

export default KakaoMap;
