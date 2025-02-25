import {
  StyledDiv,
  CommonContainer,
  Title,
  Form,
  Input,
  Atag,
  Btn,
} from "./Login.styles";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const { auth, login } = useContext(AuthContext);

  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  if (auth.isAuthenticated === true) {
    goTo("/");
  }

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/member/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((response) => {
        const { username, tokens, role } = response.data;
        login(username, tokens.accessToken, tokens.refreshToken, role);
        alert(response.data);
        window.location = "/";
      })
      .catch(() => {
        alert("로그인 실패, 입력을 확인하세요");
      });
  };

  return (
    <StyledDiv>
      <CommonContainer>
        <Title>로그인</Title>
        <Form onSubmit={handleLogin}>
          <Input
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            placeholder="Id"
            type="text"
            required
          ></Input>
          <Input
            onChange={(e) => setUserPwd(e.target.value)}
            value={userPwd}
            placeholder="password"
            type="password"
            required
          ></Input>
          <br />
          <Atag onClick={() => goTo("/join")}>회원가입</Atag>
          <Atag onClick={() => goTo("/findInfo")}>ID/PW 찾기</Atag>
          <br />
          <br />
          <Btn type="submit">입력완료</Btn>
          <br />
          <br />
          <br />
          <br />
          <br />
        </Form>
      </CommonContainer>
    </StyledDiv>
  );
};
export default Login;
