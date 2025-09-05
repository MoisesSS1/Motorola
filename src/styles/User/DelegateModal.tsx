import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* -------------------- estilos do modal de delegação em camadas -------------------- */
export const DelegateModalContainer = styled(ModalContainer)`
  width: 500px;
  gap: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  resize: none;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const QueueLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const QueueButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #0d6efd;
  background: ${({ selected }) => (selected ? "#0d6efd" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #0d6efd;
    color: #fff;
  }
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 10px;
`;

export const SaveButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? "#6c757d" : "#198754")};
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) => (disabled ? "#6c757d" : "#157347")};
  }
`;

export const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #aaa;
  }
`;
