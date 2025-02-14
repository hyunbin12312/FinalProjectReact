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
} from "./UpdateInfo.styles";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateInfo = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [email, setEmail] = useState("");
  const [enrollDate, setEnrollDate] = useState("");
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };

  useEffect(() => {
    axios
      .get("http://localhost/member/findUser", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        params: {
          username: auth.username,
        },
      })
      .then((response) => {
        setUserId(response.data.userId);
        setUserPwd(response.data.userPwd);
        setEmail(response.data.email);
        setEnrollDate(response.data.enrollDate);
      })
      .catch(() => {
        alert("회원 정보를 찾을 수 없습니다.");
        goTo("/myPage");
      });
  }, []);

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Form>
            <Title>정보 수정</Title>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Label>*ID(변경불가)</Label>
            <Input value={userId} type="text" disabled></Input>
            <Label>*PW</Label>
            <Input
              value={userPwd}
              onChange={(e) => setUserPwd(e.target.value)}
              type="password"
              placeholder="4~20자 이내 영문, 숫자만 입력해주세요."
              required
            ></Input>
            <Label>&nbsp;&nbsp;&nbsp;*E-Mail</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="@를 포함한 정확한 메일을 입력해주세요. ex: user11@test.com"
              required
            ></Input>
            <br />
            <p>가입일: {enrollDate.split(" ")[0]}</p>
            <Btn>수정 완료</Btn>
          </Form>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};
export default UpdateInfo;
