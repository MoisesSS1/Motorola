import styled from "styled-components";

export const AlertContainer = styled.div<{ type: "error" | "success" }>`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
  z-index: 20004;
  min-width: 300px;
  background-color: ${({ type }) => (type === "error" ? "#F87171" : "#34D399")};
  color: ${({ type }) => (type === "error" ? "#7F1D1D" : "#064E3B")};

  @media (max-width: 600px) {
    min-width: 90%;
  }
`;
