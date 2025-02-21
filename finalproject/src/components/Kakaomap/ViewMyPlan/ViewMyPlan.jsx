import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import axios from "axios";
import {
  Container,
  PlanGroupContainer,
  PlanGrid,
  PlanHeader,
  PlanContent,
  PlaceItem,
  PlaceInfo,
  EditButton,
  DeleteButton,
  AddMemoButton,
} from "./ViewMyPlanStyles";
import CustomModal from "./CustomModal";
import SearchTab from "../kakaoComponents/SearchTab";

/*

 이 컴포넌트는 내 플랜 전체보기, 리스트 수정 MODAL 띄우기 등

 플랜 생성을 제외한 수정, 삭제 등의 기능을 맡은 컴포넌트입니다.


*/

const ViewMyPlan = () => {
  const { auth } = useContext(AuthContext);

  // 백엔드에서 그룹화된 플랜 데이터를 저장 (Map 형태: { [planCode]: TravelPlanDTO[] })
  const [groupedPlans, setGroupedPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 각 그룹의 열림/닫힘 상태
  const [openGroups, setOpenGroups] = useState({});
  // Modal 관련 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // 수정할 대상의 정보를 저장하는 상태 (검색 결과로 선택)
  const [editForm, setEditForm] = useState({
    placeName: "",
    placeAddress: "",
    phone: "",
    category: "",
    linkUrl: "",
    planCode: null, // 기존 객체의 planCode 값을 그대로 사용
    planOrder: null, // 기존 객체의 planOrder 값을 그대로 사용
  });

  // 수정 모달 내에서 사용할 검색 관련 상태
  const [editInput, setEditInput] = useState("");
  const [editSearchResults, setEditSearchResults] = useState([]);
  const [editIsEnd, setEditIsEnd] = useState(false);
  const [editPage, setEditPage] = useState(1);

  // 여행플랜을 불러오는 useEffect
  useEffect(() => {
    if (!auth.accessToken) return; // accessToken 없으면 돌려보냄
    axios
      .get("http://localhost/map/list", {
        params: { userId: auth.username },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setGroupedPlans(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("플랜 로드 에러:", err);
        setError(err);
        setLoading(false);
      });
  }, [auth.username, auth.accessToken]);

  // 플랜이 열려있는지, 닫혀있는지 구분하는용도
  const toggleGroup = (planCode) => {
    setOpenGroups((prev) => ({
      ...prev,
      [planCode]: !prev[planCode],
    }));
  };
  /*
  useEffect(() => {
    axios.put("http://localhost/map/memo"), { planCode: , planOrder: , userId: }
  })
*/

  // 수정 버튼 클릭 시 모달 열기 및 수정 폼 초기화
  const handleEditClick = (place, planCode) => {
    setSelectedPlace({ ...place, planCode });
    setEditForm({
      placeName: place.placeName || "",
      placeAddress: place.placeAddress || "",
      phone: place.phone || "",
      category: place.category || "",
      linkUrl: place.linkUrl || "",
      planCode: place.planCode, // 기존 값을 그대로 사용
      planOrder: place.planOrder, // 기존 값을 그대로 사용
    });
    // 수정 모달 내 검색 입력 초기화
    setEditInput("");
    setEditSearchResults([]);
    setEditPage(1);
    setEditIsEnd(false);
    setModalOpen(true);
  };

  // 장소삭제버튼
  const handleDeletePlace = (place, planCode) => {
    if (window.confirm("해당 장소를 삭제하시겠습니까?")) {
      setGroupedPlans((prevPlans) => ({
        ...prevPlans,
        [planCode]: prevPlans[planCode].filter(
          (p) => p.planOrder !== place.planOrder
        ),
      }));

      // 백엔드 삭제 요청 예시
      axios
        .delete("http://localhost/map/delete/place", {
          data: { userId: auth.username, planCode, planOrder: place.planOrder },
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log("삭제 성공:", response.data);
          alert("장소가 성공적으로 삭제되었습니다.");
        })
        .catch((err) => {
          console.error("삭제 에러:", err);
          alert("삭제 중 오류가 발생했습니다.");
        });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlace(null);
  };

  // 플랜삭제버튼
  const handleDeletePlan = (planCode) => {
    if (window.confirm("여행플랜을 삭제하시겠습니까?")) {
      axios
        .delete("http://localhost/map/delete/plan", {
          data: { userId: auth.username, planCode },
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((response) => {
          console.log("삭제 성공:", response.data);
          alert("장소가 성공적으로 삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          console.error("삭제 에러:", err);
          alert("삭제 중 오류가 발생했습니다.");
        });
    }
  };

  // 장소를 찾는 함수, SearchPlaces와 비슷하게 작동한다.
  const handleEditSearch = async (e) => {
    e.preventDefault();
    if (!editInput.trim()) {
      alert("검색어를 입력해주세요");
      return;
    }

    // 초기화: 이전 검색 결과, 페이지 번호, 마지막 페이지 여부 등을 초기화합니다.
    setEditSearchResults([]);
    setEditPage(1);
    setEditIsEnd(false);

    // API 요청에 사용할 값들
    const rect = "126.1240,33.17606,126.9900,33.58313"; // 중심 좌표 영역 (필요에 따라 수정)
    const pageLimit = 6; // 한 페이지당 보여줄 결과 수
    const initialPage = 1;

    try {
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/keyword.json",
        {
          headers: {
            Authorization: `KakaoAK 5357f44dd713ad518dcc5ef6d3bfbc66`,
          },
          params: {
            query: editInput,
            rect: rect,
            size: pageLimit,
            page: initialPage,
          },
        }
      );

      const { documents, meta } = response.data;
      // 첫 페이지의 결과를 상태에 저장합니다.
      setEditSearchResults(documents);
      setEditIsEnd(meta.is_end);
      setEditPage(initialPage + 1);
      console.log(response.data);
    } catch (error) {
      console.error("검색 에러:", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  // 수정 모달 내 검색 리셋 (예: 초기화 버튼 클릭 시)
  const handleEditReset = () => {
    setEditInput("");
    setEditSearchResults([]);
    setEditPage(1);
    setEditIsEnd(false);
  };

  // 검색 결과 항목 클릭 시, 해당 정보를 수정 폼에 반영
  const handleSelectSearchResult = (result) => {
    setEditForm((prev) => ({
      ...prev,
      placeName: result.place_name,
      placeAddress: result.address_name,
      phone: result.phone,
      category: result.category_group_name,
      linkUrl: `https://map.kakao.com/link/map/${result.id}`,
      lat: result.y,
      lng: result.x,
      // planCode와 planOrder은 변경하지 않기위해 작성하지 않음
    }));
    setEditSearchResults([]);
    setEditInput("");
  };

  // 수정 저장 버튼 클릭 시, 수정된 내용을 해당 그룹에 업데이트
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const { planCode, planOrder } = editForm;

    setGroupedPlans((prevPlans) => ({
      ...prevPlans,
      [planCode]: prevPlans[planCode].map((place) => {
        if (place.planOrder === planOrder) {
          return { ...place, ...editForm };
        }
        return place;
      }),
    }));

    // 백엔드 PUT요청
    axios
      .put(
        "http://localhost/map",
        {
          userId: auth.username,
          // 전개연산자 ... 를 사용해서 코드 단축
          ...editForm,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("수정 성공:", response.data);
        closeModal();
        alert("장소 수정에 성공했습니다.");
      })
      .catch((err) => {
        console.error("수정 에러:", err);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  return (
    <Container>
      <h1>내 여행 플랜</h1>
      {Object.keys(groupedPlans).length === 0 ? (
        <p>저장된 여행 플랜이 없습니다.</p>
      ) : (
        // PlanGrid로 플랜 그룹들을 3열로 배치
        <PlanGrid>
          {Object.keys(groupedPlans).map((planCode) => (
            <PlanGroupContainer key={planCode}>
              <PlanHeader onClick={() => toggleGroup(planCode)}>
                플랜 번호: {planCode}
              </PlanHeader>
              <PlanContent isOpen={!!openGroups[planCode]}>
                {groupedPlans[planCode].map((place, index) => (
                  <PlaceItem key={index}>
                    <PlaceInfo>
                      <strong>장소명:</strong> {place.placeName}
                    </PlaceInfo>
                    <PlaceInfo>
                      <strong>주소:</strong> {place.placeAddress}
                    </PlaceInfo>
                    <PlaceInfo>
                      <strong>전화번호:</strong> {place.phone}
                    </PlaceInfo>
                    <PlaceInfo>
                      <strong>카테고리:</strong> {place.category}
                    </PlaceInfo>
                    {place.linkUrl && (
                      <PlaceInfo>
                        <strong>링크:</strong>{" "}
                        <a
                          href={place.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {place.linkUrl}
                        </a>
                      </PlaceInfo>
                    )}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <EditButton
                        onClick={() => handleEditClick(place, planCode)}
                      >
                        수정하기
                      </EditButton>
                      <AddMemoButton>메모작성</AddMemoButton>

                      <DeleteButton
                        onClick={() => handleDeletePlace(place, planCode)}
                      >
                        삭제하기
                      </DeleteButton>
                    </div>
                  </PlaceItem>
                ))}
              </PlanContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <DeleteButton onClick={() => handleDeletePlan(planCode)}>
                  삭제하기
                </DeleteButton>
              </div>
            </PlanGroupContainer>
          ))}
        </PlanGrid>
      )}

      {/* 수정 모달 */}
      <CustomModal isOpen={modalOpen} onClose={closeModal}>
        <h2>플랜 수정</h2>
        {selectedPlace ? (
          <>
            {/* 수정 전 현재 선택된 정보 미리보기 */}
            <div>
              <strong>현재 장소명:</strong> {editForm.placeName}
            </div>
            <div>
              <strong>현재 주소:</strong> {editForm.placeAddress}
            </div>
            {/* 위치를 알 수 있는 MAP 추가 */}
            <div style={{ marginTop: "10px" }}>
              <Map
                center={{
                  lat: editForm.lat ? Number(editForm.lat) : 33.3608281,
                  lng: editForm.lng ? Number(editForm.lng) : 126.5535785,
                }}
                style={{ width: "100%", height: "300px" }}
                level={11} // 지도 확대 레벨 (필요에 따라 조정)
                isPanto={true}
              >
                {/* 좌표가 있을 경우 마커 표시 */}
                {editForm.lat && editForm.lng && (
                  <MapMarker
                    position={{
                      lat: Number(editForm.lat),
                      lng: Number(editForm.lng),
                    }}
                  />
                )}
                <ZoomControl position={"RIGHT"} />
              </Map>
            </div>

            {/* SearchTab을 이용한 검색 영역 */}
            <SearchTab
              inputPlace={editInput}
              setInputPlace={setEditInput}
              handleSearch={handleEditSearch}
              handleReset={handleEditReset}
            />

            {/* 검색 결과 목록 */}
            {editSearchResults.length > 0 && (
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  marginTop: "10px",
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                {editSearchResults.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => handleSelectSearchResult(result)}
                  >
                    {result.place_name} - {result.address_name}
                  </div>
                ))}
              </div>
            )}

            <button onClick={handleSubmitEdit}>수정 저장</button>
            <button onClick={closeModal}>취소</button>
          </>
        ) : (
          <p>수정할 장소 정보를 불러오는 중입니다.</p>
        )}
      </CustomModal>
    </Container>
  );
};

export default ViewMyPlan;
