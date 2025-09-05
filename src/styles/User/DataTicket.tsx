import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
  z-index: 999;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 80%;
  max-height: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 30px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const Notes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

export const Note = styled.div<{ isOwn?: boolean; isHistory?: boolean }>`
  align-self: ${({ isOwn, isHistory }) =>
    isHistory ? "center" : isOwn ? "flex-end" : "flex-start"};
  background: ${({ isOwn, isHistory }) =>
    isHistory ? "#ffc107" : isOwn ? "#0d6efd" : "#f1f1f1"};
  color: ${({ isOwn, isHistory }) =>
    isHistory ? "#000" : isOwn ? "#fff" : "#333"};
  padding: 10px 14px;
  border-radius: 12px;
  max-width: ${({ isHistory }) => (isHistory ? "80%" : "70%")};
  font-size: 14px;
  font-style: ${({ isHistory }) => (isHistory ? "italic" : "normal")};
`;

export const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
  color: #555;
`;

export const ActionButton = styled.button`
  position: fixed;
  right: 2%;
  background: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #0b5ed7;
  }
`;

export const CommentButton = styled(ActionButton)`
  top: 10%;
`;

export const DelegateButton = styled(ActionButton)`
  top: 18%;
  background: #198754;

  &:hover {
    background: #157347;
  }
`;

export const CloseTicketButton = styled(ActionButton)`
  top: 26%;
  background: #dc3545;

  &:hover {
    background: #b02a37;
  }
`;

/* -------------------- estilos do modal de comentários -------------------- */
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

/* -------------------- estilos do modal de delegação em camadas -------------------- */
export const DelegateModalContainer = styled(ModalContainer)`
  width: 500px;
  gap: 16px;
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
