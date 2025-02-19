import styled from "styled-components";

export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
export const ModalContent = styled.div`
  width: 55%;
  height: 70%;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: white;
  text-align: center;
`;
export const H1 = styled.h1`
  margin-top: 30px;
`;
export const H6 = styled.h6`
  margin-top: 10px;
`;
export const MailTitle = styled.input`
  margin-top: 10px;
  width: 80%;
`;
export const MailContent = styled.textarea`
  margin-top: 10px;
  width: 80%;
  height: 50%;
`;
export const Button = styled.button`
  margin: 10px;
`;
