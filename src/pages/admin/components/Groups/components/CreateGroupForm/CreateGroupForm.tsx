import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const FormContainer = styled.div`
  width: 400px;
  max-width: 90%;
  padding: 25px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ cancel?: boolean }>`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  font-size: 0.95rem;
  cursor: pointer;
  background: ${(props) => (props.cancel ? "#ccc" : "#007bff")};
  color: ${(props) => (props.cancel ? "#000" : "#fff")};

  &:hover {
    background: ${(props) => (props.cancel ? "#999" : "#0056b3")};
  }
`;

interface CreateGroupFormProps {
  onCreate: (name: string, description: string) => void;
  onCancel: () => void;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  onCreate,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name, description);
    setName("");
    setDescription("");
  };

  return (
    <Overlay>
      <FormContainer>
        <h2>Criar Novo Grupo</h2>
        <Input
          placeholder="Nome do grupo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          placeholder="Descrição do grupo"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={handleSubmit}>Criar Grupo</Button>
          <Button cancel onClick={onCancel}>
            Cancelar
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Overlay>
  );
};

export default CreateGroupForm;
