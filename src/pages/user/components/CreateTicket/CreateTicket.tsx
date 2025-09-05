import Loading from "@/components/Loading/Loading";
import { GetItemsForUserByGroupId } from "@/services/functions/Group/GetAllItem";
import { GetGroupsUser } from "@/services/functions/Group/Group";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormCreate from "./FormCreate";
import {
  CreateTicketCall,
  ICreateTicket,
} from "@/services/functions/Ticket/CreateTicket";

// --- Estilos
const Container = styled.div`
  padding: 20px;
`;

const GroupsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
`;

const GroupButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: ${(props: any) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props: any) => (props.active ? "white" : "black")};
  cursor: pointer;
  white-space: nowrap;
  transition: 0.2s;
  &:hover {
    background: ${(props: any) => (props.active ? "#0056b3" : "#e5e5e5")};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  margin-top: 16px;
`;
const Th = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: 600;
  background: #f5f5f5;
  border: none;
`;

const Td = styled.td`
  padding: 14px 18px;
  border: none;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 4px 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ItemRow = styled.tr`
  cursor: pointer;
  transition: 0.2s;
  background: #fff;

  &:hover {
    background: #f9f9f9;
    transform: scale(1.01);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
  }
`;

// --- Componente de sucesso
const SuccessWrapper = styled.div`
  padding: 40px;
  text-align: center;
  background: #e6ffed;
  border: 1px solid #a3f5b0;
  border-radius: 12px;
  color: #2b7a2b;
`;

interface SuccessProps {
  ticketId: string;
  onClose: () => void;
}

const Success: React.FC<SuccessProps> = ({ ticketId, onClose }) => {
  return (
    <SuccessWrapper>
      <h2>Chamado criado com sucesso!</h2>
      <p>
        O ID do seu chamado é: <strong>{ticketId}</strong>
      </p>
      <p>Para acompanhar, vá em “Chamados” e busque pelo ID acima.</p>
      <button
        onClick={onClose}
        style={{
          marginTop: 20,
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
        }}
      >
        Fechar
      </button>
    </SuccessWrapper>
  );
};

// --- Componente principal
const CreateTicket = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  // filtros dinâmicos
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleBack = () => {
    setSelectedItem(null);
  };

  //pega os grupos que o usuário faz parte
  useEffect(() => {
    async function main() {
      const res = await GetGroupsUser();
      if (res.type === "error") {
        alert(res.message);
      } else {
        setGroups(res.data.data);
      }
      setLoading(false);
    }
    main();
  }, []);

  //busca os itens dos grupos
  useEffect(() => {
    async function main() {
      if (!selectedGroup?._id) return;
      setLoading(true);
      const res = await GetItemsForUserByGroupId({
        groupId: selectedGroup._id,
      });
      if (res.type === "error") {
        alert(res.message);
      } else {
        setItems(res.data.data);
      }
      setLoading(false);
    }
    if (selectedGroup?._id) main();
  }, [selectedGroup]);

  const filteredItems = items.filter((item) => {
    const attrs = item.attributes.slice(0, 4);
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "name") {
        return item.name.toLowerCase().includes(value.toLowerCase());
      }
      const attr = attrs.find((a: any) => a.key === key);
      return attr?.value
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });

  async function handleSubmit({
    groupId,
    itemId,
    name,
    notes,
    queueId,
    externalTickets,
  }: ICreateTicket) {
    const res = await CreateTicketCall({
      groupId,
      itemId,
      name,
      notes,
      queueId,
      externalTickets,
    });

    if (res.type === "error") {
      alert(res.message);
    } else {
      // Exibe componente de sucesso
      setCreatedTicketId(res.data.data.ticketId);
      setSelectedItem(null); // fecha formulário
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : createdTicketId ? (
        <Success
          ticketId={createdTicketId}
          onClose={() => setCreatedTicketId(null)}
        />
      ) : !selectedItem ? (
        <>
          {/* Grupos */}
          <GroupsWrapper>
            {groups.map((group: any, index) => (
              <GroupButton
                key={index}
                active={selectedGroup?._id === group._id ? true : false}
                onClick={() => setSelectedGroup(group)}
              >
                {group.name}
              </GroupButton>
            ))}
          </GroupsWrapper>

          {/* Itens em tabela */}
          {items.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <Th>
                    Nome
                    <FilterInput
                      placeholder="Filtrar..."
                      value={filters["name"] || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, name: e.target.value })
                      }
                    />
                  </Th>
                  {items[0].attributes.slice(0, 4).map((attr: any) => (
                    <Th key={attr.key}>
                      {attr.key}
                      <FilterInput
                        placeholder="Filtrar..."
                        value={filters[attr.key] || ""}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            [attr.key]: e.target.value,
                          })
                        }
                      />
                    </Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item: any) => (
                  <ItemRow key={item._id} onClick={() => setSelectedItem(item)}>
                    <Td>{item.name}</Td>
                    {item.attributes.slice(0, 4).map((attr: any) => (
                      <Td key={attr.key}>{attr.value ?? ""}</Td>
                    ))}
                  </ItemRow>
                ))}
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <FormCreate
          item={selectedItem}
          onCancel={handleBack} // volta para a lista de itens
          onSubmit={handleSubmit}
          key={Date.now()} // força re-render quando abrir outro item
        />
      )}
    </Container>
  );
};

export default CreateTicket;
