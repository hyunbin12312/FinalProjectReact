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
} from "./AdMember.styles";
import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdMember = () => {
  const [requestUrl, setRequestUrl] = useState(
    "http://localhost/admin/findMembers"
  );
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(1);
  const [check, setCheck] = useState([]);
  const [error, setError] = useState(1);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
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

    if (page == 1) {
      prevBtnRef.current.disabled = true;
    } else {
      prevBtnRef.current.disabled = false;
    }
  }, [page]);

  useEffect(() => {
    if (members.length > 1 && members.length < 10) {
      nextBtnRef.current.disabled = true;
    } else {
      nextBtnRef.current.disabled = false;
    }
  }, [members]);

  useEffect(() => {
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

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };

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

  const handleCheckbox = (userId) => {
    setCheck(userId);
    console.log(check);
  };
  useEffect(() => {}, [check]);
  /*
    1. 체크박스 행 선택
    2. authoricate, 정보수정, 탈퇴 마무리
  */

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
          {error != 0 ? (
            <>
              {members.map((member) => (
                <tbody key={member.userId}>
                  <StyledTd>
                    <CheckBox
                      type="checkbox"
                      checked={check.includes(member.userId)}
                      onChange={() => handleCheckbox(member.userId)}
                    />
                  </StyledTd>
                  <StyledTd>{member.userId}</StyledTd>
                  <StyledTd>{member.email}</StyledTd>
                  <StyledTd>{member.role.split("_")[1]}</StyledTd>
                  <StyledTd>{member.status}</StyledTd>
                  <StyledTd>{member.enrollDate}</StyledTd>
                </tbody>
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
          <PageButton onClick={() => setPage(1)}>처음</PageButton>
          <PageButton ref={prevBtnRef} onClick={handlePrevPage}>
            이전
          </PageButton>
          <PageNo>{page}</PageNo>
          <PageButton ref={nextBtnRef} onClick={handleNextPage}>
            다음
          </PageButton>
          <PageButton>끝</PageButton>
        </PageDiv>

        <br />
        <Button>메일 발송</Button>
        <Button>회원 정지</Button>
        <Button>정지 해제</Button>
        <br />
        <Button onClick={findAdmin}>관리자 목록 보기</Button>
        <Button onClick={sortById}>돌아가기</Button>
      </WrapDiv>
    </>
  );
};
export default AdMember;
