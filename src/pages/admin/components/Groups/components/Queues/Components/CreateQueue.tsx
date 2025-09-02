import React, { useState } from "react";
import styled from "styled-components";

interface CreateQueueProps {
  groupId: string;
  parentQueueId?: string | null;
  onCreate?: (data: QueueData) => void;
  onClose?: () => void;
}

interface QueueData {
  name: string;
  groupId: string;
  parentQueueId?: string | null;
  description?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Wrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 600px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.25s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  background: #f5f7fa;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #222;
`;

const Content = styled.div`
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 6px rgba(0, 123, 255, 0.35);
  }
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 0.95rem;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 6px rgba(0, 123, 255, 0.35);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
`;

const Button = styled.button<{ cancel?: boolean }>`
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  background: ${({ cancel }) => (cancel ? "#e0e0e0" : "#007bff")};
  color: ${({ cancel }) => (cancel ? "#333" : "white")};
  transition: background 0.25s ease;

  &:hover {
    background: ${({ cancel }) => (cancel ? "#cfcfcf" : "#0056b3")};
  }
`;

const CreateQueueComponent: React.FC<CreateQueueProps> = ({
  groupId,
  parentQueueId = null,
  onCreate,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQueue: QueueData = {
      name,
      groupId,
      parentQueueId,
      description: description || undefined,
    };

    if (onCreate) onCreate(newQueue);
    if (onClose) onClose();
    setName("");
    setDescription("");
  };

  return (
    <Overlay>
      <Wrapper>
        <Header>
          <Title>
            {parentQueueId ? "Criar Subfila" : "Criar Fila Principal"}
          </Title>
        </Header>
        <Content>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label>Nome</Label>
              <Input
                type="text"
                placeholder="Digite o nome da fila"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Descrição (opcional)</Label>
              <TextArea
                placeholder="Ex: Fila destinada ao atendimento de clientes VIP..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <ButtonGroup>
              <Button type="submit">
                {parentQueueId ? "Adicionar Subfila" : "Adicionar Fila"}
              </Button>
              <Button type="button" cancel onClick={onClose}>
                Cancelar
              </Button>
            </ButtonGroup>
          </Form>
        </Content>
      </Wrapper>
    </Overlay>
  );
};

export default CreateQueueComponent;
