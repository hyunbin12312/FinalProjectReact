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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
        setEmail(response.data.email);
        setEnrollDate(response.data.enrollDate);
      })
      .catch(() => {
        alert("회원 정보를 찾을 수 없습니다.");
        goTo("/myPage");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://localhost/member/updateInfo",
        {
          currentPassword,
          newPassword,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then((response) => {
        setCurrentPassword(response.data.userPwd);
        setEmail(response.data.email);
        alert("수정 성공!");
        goTo("/myPage");
      })
      .catch(() => {
        setCurrentPassword("");
        setNewPassword("");
        alert("입력을 확인해주세요.");
      });
  };

  return (
    <>
      <StyledDiv>
        <CommonContainer>
          <Form onSubmit={handleSubmit}>
            <Title>정보 수정</Title>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Label>*ID(변경불가)</Label>
            <Input value={userId} type="text" disabled></Input>
            <Label>&nbsp;&nbsp;&nbsp;*PW(기존)</Label>
            <Input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              placeholder="기존 비밀번호(영문 4~20자 이내)"
              required
            ></Input>
            <Label>&nbsp;&nbsp;&nbsp;*PW(변경)</Label>
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="새 비밀번호(영문 4~20자 이내)"
              required
            ></Input>
            <Label>*E-Mail</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="@를 포함한 정확한 메일을 입력해주세요. ex: user11@test.com"
              required
            ></Input>
            <br />
            <p>가입일: {enrollDate.split(" ")[0]}</p>
            <Btn type="submit">수정 완료</Btn>
          </Form>
        </CommonContainer>
      </StyledDiv>
    </>
  );
};
export default UpdateInfo;
