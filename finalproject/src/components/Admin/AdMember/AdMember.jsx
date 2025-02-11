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
import { useState } from "react";

const AdMember = () => {
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
          <tbody>
            <StyledTd>
              <input type="checkbox" />
            </StyledTd>
            <StyledTd>userId</StyledTd>
            <StyledTd>user@kh.com</StyledTd>
            <StyledTd>ROLE_USER</StyledTd>
            <StyledTd>'Y'</StyledTd>
            <StyledTd>2025/02/11 15:13</StyledTd>
          </tbody>
        </MemberTable>

        <PageDiv>
          <PageButton disabled>이전</PageButton>
          <PageNo>1</PageNo>
          <PageButton>다음</PageButton>
        </PageDiv>

        <br />
        <br />
        <h6>*다중 선택 가능합니다.</h6>
        <Button>메일 발송</Button>
        <Button>정지</Button>
        <Button>정지 해제</Button>
      </WrapDiv>
    </>
  );
};
export default AdMember;
