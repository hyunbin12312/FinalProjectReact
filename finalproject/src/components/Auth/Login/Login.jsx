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

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/member/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((response) => {
        const { username, tokens } = response.data;
        login(username, tokens.accessToken, tokens.refreshToken);
        alert("로그인 성공!");
        window.location = "/";
      })
      .catch((error) => {
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
          <Atag>회원가입</Atag>
          <Atag>ID/PW 찾기</Atag>
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
