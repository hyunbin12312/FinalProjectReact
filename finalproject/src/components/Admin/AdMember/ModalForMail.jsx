import {
  Background,
  ModalContent,
  H1,
  H6,
  MailContent,
  MailTitle,
  Button,
} from "./ModalForMail.styles";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ModalForMail = ({ isOpen, onClose, reciever }) => {
  const { auth } = useContext(AuthContext);
  const [mailTitle, setMailTitle] = useState("");
  const [mailContent, setMailContent] = useState("");
  if (!isOpen) return null;

  const handleSubmit = () => {
    //console.log(reciever);
    if (window.confirm("메일을 발송하시겠어요?")) {
      if (reciever.includes("전체 메일")) {
        axios
          .post(
            "http://localhost/admin/mailForAll",
            {
              sender: auth.username,
              mailTitle: mailTitle,
              mailContent: mailContent,
            },
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          )
          .then(() => {
            alert("전체 메일 전송 성공!");
            onClose();
          })
          .catch(() => {
            alert("오류 발생, 다시 시도해주세요.");
          });
      }
      axios
        .post(
          "http://localhost/admin/mailForUser",
          {
            sender: auth.username,
            reciever: reciever,
            mailTitle: mailTitle,
            mailContent: mailContent,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then(() => {
          alert("메일 전송 성공!");
          onClose();
        })
        .catch((error) => {
          alert("오류 발생, 다시 시도해주세요(수신자 없다면 1명 이상 선택).");
        });
    }
  };

  return (
    <Background>
      <ModalContent>
        <H1>메일 발송</H1>
        <H6>
          수신인: <span>{reciever + ","}</span>
        </H6>
        <H6>
          발신인: <span>{auth.username}</span>
        </H6>
        <MailTitle
          onChange={(e) => setMailTitle(e.target.value)}
          type="text"
          placeholder="제목을 입력해주세요.(100자 이내)"
        />
        <br />
        <MailContent
          onChange={(e) => setMailContent(e.target.value)}
          type="text"
          placeholder="내용을 입력해주세요.(2000자 이내)"
        />
        <br />
        <br />
        <Button onClick={handleSubmit}>발송</Button>
        <Button onClick={onClose}>닫기</Button>
      </ModalContent>
    </Background>
  );
};
export default ModalForMail;
