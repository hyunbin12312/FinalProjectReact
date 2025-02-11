import {
  StyledDiv,
  CommonContainer,
  Title,
  Form,
  Input,
  Btn,
  Label,
} from "./Join.styles";
import { useState } from "react";
import axios from "axios";

const Join = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/member/join", {
        userId: userId,
        userPwd: userPwd,
        email: email,
      })
      .then((response) => {
        alert(response.data);
        window.location = "/";
      })
      .catch(() => {
        setUserId("");
        setUserPwd("");
        setEmail("");
        alert("회원가입 실패, 입력을 확인해주세요.");
      });
  };

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Title>회원가입</Title>

          <Form onSubmit={handleSubmit}>
            <Label>*ID</Label>
            <br />
            <Input
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              type="text"
              placeholder="4-20자 이내 영어, 숫자 입력"
              required
            />
            <br />

            <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Password</Label>
            <br />
            <Input
              onChange={(e) => setUserPwd(e.target.value)}
              value={userPwd}
              type="password"
              placeholder="4-20자 이내 영어, 숫자 입력"
              required
            />

            <Label>&nbsp;&nbsp;&nbsp;*E-Mail</Label>
            <br />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="example@kh.com"
              required
            />

            <p>**양식에 맞게 모든 항목 입력해야 합니다.</p>
            <Btn type="submit">회원가입 완료</Btn>
          </Form>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};
export default Join;
