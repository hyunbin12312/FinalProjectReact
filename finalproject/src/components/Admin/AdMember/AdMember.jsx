import AdLayout from "../AdLayout/AdLayout";
import {
  WrapDiv,
  MemberTable,
  StyledTh,
  StyledTd,
  PageButton,
  PageDiv,
  PageNo,
  Button,
  CheckBox,
  StyledTbody,
} from "./AdMember.styles";
import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ModalForMail from "./ModalForMail";

const AdMember = () => {
  const [requestUrl, setRequestUrl] = useState(
    "http://localhost/admin/findMembers"
  );
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(1);
  const [arr, setArr] = useState([]);
  const [error, setError] = useState(1);
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const firstBtnRef = useRef(null);
  const finalBtnRef = useRef(null);

  useEffect(() => {
    /* 마운트 시 id 역순 정렬 */
    axios
      .get(requestUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        params: {
          page: page,
        },
      })
      .then((response) => {
        setMembers([...response.data]);
      })
      .catch(() => {
        setError(0);
      });

    if (page === 1) {
      prevBtnRef.current.disabled = true;
      firstBtnRef.current.disabled = true;
    } else {
      prevBtnRef.current.disabled = false;
      firstBtnRef.current.disabled = false;
    }
  }, [page]);

  useEffect(() => {
    if (members.length > 0 && members.length < 10) {
      nextBtnRef.current.disabled = true;
      finalBtnRef.current.disabled = true;
    } else {
      nextBtnRef.current.disabled = false;
      finalBtnRef.current.disabled = false;
    }
  }, [members]);

  useEffect(() => {
    /* 
    정렬 기준이 바뀔 때 마다 서버에 요청을 보내게 되므로
    중복코드를 줄이기 위해 requestUrl 변수화    
    */
    axios
      .get(requestUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        params: {
          page: page,
        },
      })
      .then((response) => {
        setMembers([...response.data]);
      })
      .catch(() => {
        setError(0);
      });
  }, [requestUrl]);

  /* 
  페이지 이동 기능. 총 rowBounds 수 구하기 위해 finalPage 버튼 클릭 시 get요청
  */
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const handleFinalPage = () => {
    nextBtnRef.current.disabled = true;
    finalBtnRef.current.disabled = true;
    axios
      .get("http://localhost/admin/findTotalCount", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setPage(Math.ceil(response.data / 10));
      })
      .catch(() => {
        setError(0);
      });
  };

  /* 
    정렬기능 requestUrl 대입 해주는 함수들
    하나의 버튼으로 순서를 계속 바꿔주기 위해 Sort State로 관리
  */
  const sortById = () => {
    if (sort === 1) {
      setRequestUrl("http://localhost/admin/findMembersAsc");
      setSort(2);
    } else {
      setRequestUrl("http://localhost/admin/findMembers");
      setSort(1);
    }
  };
  const sortByMail = () => {
    if (sort === 1) {
      setRequestUrl("http://localhost/admin/findByMail");
      setSort(2);
    } else {
      setRequestUrl("http://localhost/admin/findByMailAsc");
      setSort(1);
    }
  };
  const sortByStatus = () => {
    if (sort === 1) {
      setRequestUrl("http://localhost/admin/findByStatus");
      setSort(2);
    } else {
      setRequestUrl("http://localhost/admin/findByStatusAsc");
      setSort(1);
    }
  };
  const sortByDate = () => {
    if (sort === 1) {
      setRequestUrl("http://localhost/admin/findByDate");
      setSort(2);
    } else {
      setRequestUrl("http://localhost/admin/findByDateAsc");
      setSort(1);
    }
  };
  const findAdmin = () => {
    setRequestUrl("http://localhost/admin/findAdmin");
    setPage(1);
  };

  /* 
    회원 행 선택 기능
    선택된 회원목록은 배열로 넘어가게 됨
  */
  const handleCheck = (e) => {
    if (e.target.checked) {
      setArr((arr) => [...arr, e.target.value]);
    } else {
      const ee = arr.filter((el) => {
        return el !== e.target.value;
      });
      setArr([...ee]);
    }
  };

  const blockUser = () => {
    if (
      window.confirm(arr.length > 0 && "선택된 회원을 비활성화 하시겠어요?")
    ) {
      axios
        .post("http://localhost/admin/blockUser", arr, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then(() => {
          alert("선택 회원 비활성화");
          setArr([]);
        })
        .catch(() => {
          alert("오류 발생. 다시 시도 해주세요.");
        });
    }
    // 작업 처리 후 체크 풀어야 됨 => State 바뀔텐데 재랜더링이 안된다?
  };

  const unblockUser = () => {
    if (window.confirm(arr.length > 0 && "비활성화를 해제 하시겠어요?")) {
      axios
        .post("http://localhost/admin/unblockUser", arr, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then(() => {
          alert("복구 완료");
          setArr([]);
        })
        .catch(() => {
          alert("오류 발생. 다시 시도 해주세요.");
        });
    }
  };

  // 메일링
  const mailForAll = () => {
    // 전체선택 방법은 또 조회뿐..?
    setArr([]);
    setArr(["전체 메일"]);
    setOpen(true);
  };

  const mailForUser = () => {
    setOpen(true);
  };

  return (
    <>
      <AdLayout />
      <WrapDiv>
        <h4>*회원 관리</h4>
        <MemberTable>
          <thead>
            <StyledTh>선택</StyledTh>
            <StyledTh onClick={sortById}>회원ID↕</StyledTh>
            <StyledTh onClick={sortByMail}>E-Mail↕</StyledTh>
            <StyledTh>등급</StyledTh>
            <StyledTh onClick={sortByStatus}>활동상태↕</StyledTh>
            <StyledTh onClick={sortByDate}>가입일↕</StyledTh>
          </thead>
          {error !== 0 ? (
            <>
              {members.map((member) => (
                <StyledTbody key={member.userId}>
                  <StyledTd>
                    <CheckBox
                      type="checkbox"
                      onChange={handleCheck}
                      value={member.userId}
                    />
                  </StyledTd>
                  <StyledTd>{member.userId}</StyledTd>
                  <StyledTd>{member.email}</StyledTd>
                  <StyledTd>{member.role.split("_")[1]}</StyledTd>
                  <StyledTd>{member.status}</StyledTd>
                  <StyledTd>{member.enrollDate}</StyledTd>
                </StyledTbody>
              ))}
            </>
          ) : (
            <tbody>
              <StyledTd>
                <h4>조회 결과가 없습니다.</h4>
              </StyledTd>
            </tbody>
          )}
        </MemberTable>

        <PageDiv>
          <PageButton ref={firstBtnRef} onClick={() => setPage(1)}>
            처음
          </PageButton>
          <PageButton ref={prevBtnRef} onClick={handlePrevPage}>
            이전
          </PageButton>
          <PageNo>{page}</PageNo>
          <PageButton ref={nextBtnRef} onClick={handleNextPage}>
            다음
          </PageButton>
          <PageButton ref={finalBtnRef} onClick={handleFinalPage}>
            끝
          </PageButton>
        </PageDiv>

        <br />
        <Button onClick={mailForAll}>전체 메일 발송</Button>
        <Button onClick={mailForUser}>선택 메일 발송</Button>
        <Button onClick={blockUser}>회원 차단</Button>
        <Button onClick={unblockUser}>차단 해제</Button>
        <br />
        <Button onClick={findAdmin}>관리자 목록 보기</Button>
        <Button onClick={sortById}>돌아가기</Button>
      </WrapDiv>

      <ModalForMail isOpen={open} onClose={() => setOpen(false)} reciever={arr}>
        <></>
      </ModalForMail>
    </>
  );
};
export default AdMember;
