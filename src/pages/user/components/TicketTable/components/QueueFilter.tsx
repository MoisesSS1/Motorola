import React from "react";
import styled, { keyframes } from "styled-components";
import { FiX } from "react-icons/fi";

// Animação de entrada
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
`;

const Modal = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 80%;
  max-height: 80vh;
  border-radius: 12px;
  padding: 24px 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  position: relative;
  animation: ${fadeIn} 0.3s ease;
`;

const Title = styled.h2`
  margin: 0 0 20px;
  font-size: 20px;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #999;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #e74c3c;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  color: #444;
  cursor: pointer;

  input {
    margin-right: 8px;
    cursor: pointer;
  }

  &:hover {
    color: #000;
  }
`;

const Footer = styled.div`
  margin-top: 24px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

// Botão fixo para selecionar todas
const FixedSelectAll = styled(ActionButton)`
  position: absolute;
  top: 16px;
  right: 52px; // deixa espaço para o close
  z-index: 10;
  padding: 6px 12px;
  font-size: 13px;
`;

function QueueFilterModal({ queues, selected, onChange, onClose }: any) {
  const handleCheck = (id: string) => {
    let updated: string[];
    if (selected.includes(id)) {
      updated = selected.filter((s: any) => s !== id);
    } else {
      updated = [...selected, id];
    }
    onChange(updated);
  };

  const toggleAll = () => {
    if (selected.length === queues.length) {
      onChange([]);
    } else {
      onChange(queues.map((q: any) => q._id));
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <CloseButton onClick={onClose} aria-label="Fechar modal">
          <FiX />
        </CloseButton>

        {/* Botão fixo para selecionar todas */}
        <FixedSelectAll onClick={toggleAll}>
          {selected.length === queues.length
            ? "Desmarcar todas"
            : "Selecionar todas"}
        </FixedSelectAll>

        <Title>Selecione as filas</Title>

        {queues.map((queue: any) => (
          <CheckboxLabel key={queue._id}>
            <input
              type="checkbox"
              checked={selected.includes(queue._id)}
              onChange={() => handleCheck(queue._id)}
            />
            {queue.name}
          </CheckboxLabel>
        ))}

        <Footer>
          <ActionButton onClick={onClose}>Fechar</ActionButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}

export default QueueFilterModal;
