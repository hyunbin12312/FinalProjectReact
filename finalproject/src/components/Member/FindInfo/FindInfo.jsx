import {
  StyledDiv,
  CommonContainer,
  Title,
  Form,
  Input,
  Btn,
  StyledP,
  StyledSpace,
} from "./FindInfo.styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindInfo = () => {
  const [email, setEmail] = useState("");
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/member/findInfo", {
        email: email,
      })
      .then((response) => {
        alert("ID: " + response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Title>회원 정보 찾기</Title>
          <Form onSubmit={handleSubmit}>
            <StyledP>가입 시 입력한 Email을 입력해주세요.</StyledP>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              required
              placeholder="example@test.com"
            ></Input>
            <Btn type="submit">아이디 찾기</Btn>
          </Form>
          <Btn onClick={() => goTo("/findPwd")}>비밀번호 찾기</Btn>
          <Btn onClick={() => goTo("/login")}>로그인</Btn>
          <StyledSpace></StyledSpace>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};
export default FindInfo;
