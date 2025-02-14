// CustomModal.jsx
import React from "react";
import { ModalOverlay, ModalContainer } from "./CustomModalStyles";

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // isOpen이 false이면 렌더링하지 않음

  return (
    <>
      {/* ModalOverlay를 클릭하면 onClose 핸들러를 호출하여 Modal을 닫습니다. */}
      <ModalOverlay onClick={onClose} />
      <ModalContainer>{children}</ModalContainer>
    </>
  );
};

export default CustomModal;
