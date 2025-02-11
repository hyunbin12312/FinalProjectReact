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
import { useState } from "react";

const MyPage = () => {
  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Title>내 정보</Title>
          <Input placeholder="ID" disabled></Input>
          <Input placeholder="EMail" disabled></Input>
          <Btn>정보 수정</Btn>
          <Btn>회원 탈퇴</Btn>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};

export default MyPage;
