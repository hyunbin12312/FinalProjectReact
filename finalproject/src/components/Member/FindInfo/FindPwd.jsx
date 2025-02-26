import {
  StyledDiv,
  CommonContainer,
  Title,
  Form,
  Input,
  Btn,
  StyledP,
  StyledSpace,
  Timer,
} from "./FindInfo.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const FindPwd = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [randomNum, setRandomNum] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [timer, setTimer] = useState(9999);
  const [isSuccess, setIsSuccess] = useState(0);

  const navi = useNavigate();
  const goTo = (path) => {
    navi(path);
  };
  useEffect(() => {
    setUserId("");
    setEmail("");
    setRandomNum("");
    setNewPwd("");
    setIsSuccess(0);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      alert("입력시간 초과. 다시 진행 해주세요.");
      goTo("/");
    }
    setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/member/findPwd", {
        userId: userId,
        email: email,
      })
      .then((response) => {
        setIsSuccess(1);
        setTimer(10); // 시연을 위해 10초 초기화. 600초로 수정
        alert(response.data);
      })
      .catch(() => {
        alert("계정 정보를 찾을 수 없습니다.");
      });
  };

  const handleMatch = () => {
    axios
      .post("http://localhost/member/matchRandomNum", {
        userId: userId,
        randomNum: randomNum,
      })
      .then((response) => {
        setTimer(9999);
        setIsSuccess(2);
        alert(response.data);
      })
      .catch((error) => {
        alert("인증 번호를 확인해주세요.");
        setRandomNum("");
      });
  };

  const handleNewPwd = () => {
    axios
      .put("http://localhost/member/newPwd", {
        userId: userId,
        newPwd: newPwd,
      })
      .then((response) => {
        alert(response.data);
        goTo("/login");
      })
      .catch(() => {
        alert("비밀번호는 4~20자 이내, 영문 숫자만 입력 가능합니다.");
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
              <StyledP>Email로 받으신 인증번호를 입력해주세요.</StyledP>
              <Input
                onChange={(e) => {
                  setRandomNum(e.target.value);
                }}
                value={randomNum}
                placeholder="숫자 4자리 입력"
              ></Input>
              <Timer>입력시간(s): {timer}</Timer>

              <Btn onClick={handleMatch}>입력 완료</Btn>
            </>
          ) : (
            <>
              <StyledP>변경하실 비밀번호를 입력해주세요.</StyledP>
              <Input
                onChange={(e) => {
                  setNewPwd(e.target.value);
                }}
                value={newPwd}
                required
                placeholder="4~20자 이내 영문, 숫자만 입력해주세요."
                type="password"
              ></Input>
              <Btn onClick={handleNewPwd}>변경 완료</Btn>
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
