"use client";
import { AlertContainer } from "@/styles/AlertStyles";
import React, { useEffect, useState } from "react";

export interface AlertProps {
  type: null | "error" | "success";
  message: string | null;
  key?: any;
}

const AlertMessage = ({ message, type, key }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message && type) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [message, type]);

  if (!visible || !message || !type) return null;

  return (
    <AlertContainer key={key} type={type}>
      {message}
    </AlertContainer>
  );
};

export default AlertMessage;
