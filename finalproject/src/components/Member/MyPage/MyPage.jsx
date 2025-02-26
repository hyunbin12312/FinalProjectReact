import {
  StyledDiv,
  CommonContainer,
  Title,
  Form,
  Input,
  Btn,
  Label,
  StyledP,
  StyledSpan,
} from "./MyPage.styles";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MyPage = () => {
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  const { auth } = useContext(AuthContext);

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Title>마이페이지</Title>
          <StyledP>
            '<StyledSpan>{auth.username}</StyledSpan>'님 안녕하세요
          </StyledP>
          <Btn>내가 만든 리스트(X)</Btn>
          <Btn onClick={() => goTo("/updateInfo")}>정보 수정</Btn>
          <Btn>회원 탈퇴(X)</Btn>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};

export default MyPage;
