// components/Loading.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
};

export default Loading;

// CSS-in-JS abaixo:

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #333;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
