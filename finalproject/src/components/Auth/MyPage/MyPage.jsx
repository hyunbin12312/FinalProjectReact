import {
  StyledDiv,
  CommonContainer,
  Title,
  Form,
  Input,
  Btn,
  Label,
} from "./MyPage.styles";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  const { auth } = useContext;

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Title>마이페이지</Title>
          <Input placeholder="ID" disabled></Input>
          <Input placeholder="E-Mail" disabled></Input>
          <Btn>내가 만든 리스트</Btn>
          <Btn>정보 수정</Btn>
          <Btn>회원 탈퇴</Btn>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};

export default MyPage;
