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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FindPwd = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(0);
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  useEffect(() => {
    setIsSuccess(0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/member/findPwd", {
        userId: userId,
        email: email,
      })
      .then(() => {
        setIsSuccess(1);
        // 타이머 설정
        // id랑 email 일치하지 않으면 에러
        // submit 시 메일 인증
      });
  };

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Title>비밀번호 변경</Title>
          {isSuccess === 0 ? (
            <Form onSubmit={handleSubmit}>
              <StyledP>ID를 입력 해주세요.</StyledP>
              <Input
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                value={userId}
                type="text"
                required
                placeholder="4~20자 이내 영문, 숫자만 입력해주세요."
              ></Input>
              <StyledP>가입 시 입력한 Email을 입력해주세요.</StyledP>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="text"
                required
                placeholder="example@test.com"
              ></Input>
              <Btn type="submit">비밀번호 변경</Btn>
            </Form>
          ) : isSuccess === 1 ? (
            <>
              <p>메일인증~</p>
            </>
          ) : (
            <>
              <StyledP>변경하실 비밀번호를 입력해주세요.</StyledP>
              <Input></Input>
              <Btn>변경 완료</Btn>
            </>
          )}

          <Btn onClick={() => goTo("/login")}>로그인</Btn>
          <StyledSpace></StyledSpace>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};
export default FindPwd;
