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
} from "./AdMember.styles";
import axios from "axios";
import { useEffect, useState } from "react";

const AdMember = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/admin/findMembers", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        console.log(response);
        setMembers([...members, ...response.data]);
      })
      .catch((error) => {
        alert(error);
      });
  }, [page]);

  return (
    <>
      <AdLayout />
      <WrapDiv>
        <h4>*회원 관리</h4>
        <MemberTable>
          <thead>
            <StyledTh>선택</StyledTh>
            <StyledTh>회원ID↕</StyledTh>
            <StyledTh>E-Mail↕</StyledTh>
            <StyledTh>등급↕</StyledTh>
            <StyledTh>활동상태↕</StyledTh>
            <StyledTh>가입일↕</StyledTh>
          </thead>

          {members.map((member) => (
            <tbody key={member.userId}>
              <StyledTd>
                <input type="checkbox" />
              </StyledTd>
              <StyledTd>{member.userId}</StyledTd>
              <StyledTd>{member.email}</StyledTd>
              <StyledTd>{member.role}</StyledTd>
              <StyledTd>{member.status}</StyledTd>
              <StyledTd>{member.enrollDate}</StyledTd>
            </tbody>
          ))}
        </MemberTable>

        <PageDiv>
          <PageButton disabled>이전</PageButton>
          <PageNo>1</PageNo>
          <PageButton disabled>다음</PageButton>
        </PageDiv>

        <br />
        <br />
        <h6>*다중 선택 가능합니다.</h6>
        <Button>메일 발송</Button>
        <Button>회원 정지</Button>
        <Button>정지 해제</Button>
      </WrapDiv>
    </>
  );
};
export default AdMember;
