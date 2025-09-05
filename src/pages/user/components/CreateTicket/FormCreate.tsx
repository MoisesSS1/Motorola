import { GetAllQueuesForUser } from "@/services/functions/Queue/GetAllQueue";
import { ICreateTicket } from "@/services/functions/Ticket/CreateTicket";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// --- estilos
const FormWrapper = styled.div`
  max-width: 600px;
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  color: #222;
  font-weight: 600;

  strong {
    color: #007bff;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  margin-bottom: 16px;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  margin-bottom: 16px;
  resize: vertical;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button<{ secondary?: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.secondary ? "#e5e7eb" : "#007bff")};
  color: ${(props) => (props.secondary ? "#333" : "white")};
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => (props.secondary ? "#d1d5db" : "#0056b3")};
  }
`;

const ExternalTicketRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #e3342f;
  font-size: 22px;
  cursor: pointer;
  padding: 0 8px;

  &:hover {
    color: #cc1f1a;
  }
`;

// --- Tipagens
interface Item {
  _id: string;
  name: string;
  groupId: string;
}

interface ExternalTicket {
  key: string;
  value: string;
}

interface FormCreateProps {
  item: Item;
  onCancel: () => void;
  onSubmit: ({
    groupId,
    itemId,
    name,
    notes,
    queueId,
    externalTickets,
  }: ICreateTicket) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({
  item,
  onCancel,
  onSubmit,
}) => {
  const [queue, setQueue] = useState<any[]>([]);
  const [queueSelect, setQueueSelect] = useState<string>("");
  const [description, setDescription] = useState("");
  const [externalTickets, setExternalTickets] = useState<ExternalTicket[]>([]); // começa vazio

  // Busca filas pai do grupo
  useEffect(() => {
    async function main() {
      const res = await GetAllQueuesForUser(item.groupId, "group");

      if (res.type === "error") {
        alert(res.message);
      } else {
        const parentQueues = res.data.data.filter((q: any) => !q.parentQueueId);
        setQueue(parentQueues);
      }
    }

    main();
  }, [item.groupId]);

  const handleExternalChange = (
    index: number,
    field: keyof ExternalTicket,
    value: string,
  ) => {
    const updated = [...externalTickets];
    updated[index][field] = value;
    setExternalTickets(updated);
  };

  const addExternal = () => {
    setExternalTickets([...externalTickets, { key: "", value: "" }]);
  };

  const removeExternal = (index: number) => {
    setExternalTickets(externalTickets.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!queueSelect) {
      alert("Selecione uma fila inicial para o chamado.");
      return;
    }

    const formattedTickets = externalTickets.filter(
      (t) => t.key.trim() && t.value.trim(),
    );

    const newTicket: ICreateTicket = {
      name: item.name.trim(),
      itemId: item._id,
      queueId: queueSelect,
      externalTickets: formattedTickets,
      notes: description.trim(),
      groupId: item.groupId,
    };

    onSubmit(newTicket);
  };

  return (
    <FormWrapper>
      <Title>
        Criar chamado para <strong>{item.name}</strong>
      </Title>

      <form onSubmit={handleSubmit}>
        <Section>
          <Label>Descrição</Label>
          <TextArea
            rows={4}
            placeholder="Descreva o problema..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Section>

        <Section>
          <Label>Fila Inicial</Label>
          <select
            value={queueSelect}
            onChange={(e) => setQueueSelect(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              marginBottom: "16px",
            }}
          >
            <option value="">Selecione a fila</option>
            {queue.map((q) => (
              <option key={q._id} value={q._id}>
                {q.name}
              </option>
            ))}
          </select>
        </Section>

        <Section>
          <Label>Tickets Externos (opcional)</Label>

          {externalTickets.map((ext, index) => (
            <ExternalTicketRow key={index}>
              <Input
                type="text"
                placeholder="Chave (ex: EmpresaX_ID)"
                value={ext.key}
                onChange={(e) =>
                  handleExternalChange(index, "key", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Valor"
                value={ext.value}
                onChange={(e) =>
                  handleExternalChange(index, "value", e.target.value)
                }
              />
              <RemoveButton
                type="button"
                onClick={() => removeExternal(index)}
                title="Remover"
              >
                ×
              </RemoveButton>
            </ExternalTicketRow>
          ))}

          <Button type="button" secondary onClick={addExternal}>
            + Ticket externo
          </Button>
        </Section>

        <ButtonRow>
          <Button type="submit">Criar chamado</Button>
          <Button type="button" secondary onClick={onCancel}>
            Cancelar
          </Button>
        </ButtonRow>
      </form>
    </FormWrapper>
  );
};

export default FormCreate;
