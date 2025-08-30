// components/Modal.tsx
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Content = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  min-width: 400px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  float: right;
`;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <Overlay>
      <Content>
        <CloseButton onClick={onClose}>✖</CloseButton>
        {children}
      </Content>
    </Overlay>
  );
};

export default Modal;
