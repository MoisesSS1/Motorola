import Loading from "@/components/Loading/Loading";
import { GetGroupsUser } from "@/services/functions/Group/Group";
import { GetAllQueuesForUser } from "@/services/functions/Queue/GetAllQueue";
import { GetAllTickets } from "@/services/functions/Ticket/GetTickets";
import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import DataTicket from "./components/DataTicket";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: 12px 16px;
  background: #f5f5f5;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #ddd;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  margin-top: 4px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Row = styled.tr`
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 4px 8px;
  margin-top: 4px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #555;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
  color: ${({ status }) =>
    status === "open"
      ? "#0d6efd"
      : status === "in_progress"
      ? "#ffc107"
      : "#198754"};
  background: ${({ status }) =>
    status === "open"
      ? "rgba(13,110,253,0.1)"
      : status === "in_progress"
      ? "rgba(255,193,7,0.1)"
      : "rgba(25,135,84,0.1)"};
`;

/* ---- Estilização especial para o select de filas ---- */
const QueueSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  margin-top: 4px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ccc;
  max-height: 220px;
  overflow-y: auto;
`;

const QueueOption = styled.option<{ isParent?: boolean }>`
  font-weight: ${({ isParent }) => (isParent ? "bold" : "normal")};
  color: ${({ isParent }) => (isParent ? "#0d47a1" : "#333")};
  background: ${({ isParent }) => (isParent ? "rgba(13,71,161,0.08)" : "#fff")};
`;

// Helper para detectar se fila é pai (não tem "›" no nome)
const isParentQueue = (name: string) => !name.includes("›");

type Ticket = {
  _id: string;
  ticketId: string;
  name: string;
  itemId: string;
  groupId: string;
  queueId: string;
  status: "open" | "in_progress" | "closed" | string;
  externalTickets: { key: string; value: string }[];
  notes?: { text: string; createdAt: string; name: string }[];
};

// Função auxiliar para achatar filas e subfilas
const flattenQueues = (queues: any[], prefix = ""): any[] => {
  return queues.flatMap((q) => {
    const current = {
      _id: q._id,
      name: prefix ? `${prefix} › ${q.name}` : q.name,
    };
    return [current, ...flattenQueues(q.subQueues || [], current.name)];
  });
};

const TicketTable = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [queue, setQueue] = useState<any>([]);
  const [queueForDelegate, setQueueForDelegate] = useState<any>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState({
    ticketId: "",
    status: "",
    name: "",
    itemId: "",
    groupId: "",
    queueId: "",
    externalTickets: "",
  });

  // Atualiza filtro
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  //busca chamados
  useEffect(() => {
    async function main() {
      const res = await GetAllTickets();
      if (res.type === "error") {
        alert(res.message);
      } else {
        setTickets(res.data.data);
      }
      setLoading(false);
    }
    main();
  }, []);

  //busca grupos
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

  //busca filas
  useEffect(() => {
    async function main() {
      const res = await GetAllQueuesForUser("");
      if (res.type === "error") {
        alert(res.message);
      } else {
        setQueueForDelegate(res.data.data);
        setQueue(flattenQueues(res.data.data));
      }
      setLoading(false);
    }
    main();
  }, []);

  // Filtra os tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t: Ticket) => {
      const matchTicketId = t.ticketId
        .toLowerCase()
        .includes(filters.ticketId.toLowerCase());
      const matchName = t.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchItem = t.itemId
        .toLowerCase()
        .includes(filters.itemId.toLowerCase());
      const matchGroup = t.groupId
        .toLowerCase()
        .includes(filters.groupId.toLowerCase());
      const matchQueue = filters.queueId ? t.queueId === filters.queueId : true;
      const matchStatus = filters.status ? t.status === filters.status : true;
      const matchExternal =
        filters.externalTickets === ""
          ? true
          : t.externalTickets.some(
              (ext) =>
                ext.key
                  .toLowerCase()
                  .includes(filters.externalTickets.toLowerCase()) ||
                ext.value
                  .toLowerCase()
                  .includes(filters.externalTickets.toLowerCase()),
            );
      return (
        matchTicketId &&
        matchName &&
        matchItem &&
        matchGroup &&
        matchQueue &&
        matchStatus &&
        matchExternal
      );
    });
  }, [tickets, filters, queue]);

  async function onConfirm(res: string) {
    console.log(res);
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>
                  ID
                  <FilterInput
                    placeholder="Filtrar"
                    value={filters.ticketId}
                    onChange={(e) =>
                      handleFilterChange("ticketId", e.target.value)
                    }
                  />
                </Th>
                <Th>
                  Status
                  <FilterSelect
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="">Todos</option>
                    <option value="open">Aberto</option>
                    <option value="in_progress">Em andamento</option>
                    <option value="closed">Fechado</option>
                  </FilterSelect>
                </Th>
                <Th>
                  Nome
                  <FilterInput
                    placeholder="Filtrar"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                  />
                </Th>
                <Th>
                  Grupo
                  <FilterInput
                    placeholder="Filtrar"
                    value={filters.groupId}
                    onChange={(e) =>
                      handleFilterChange("groupId", e.target.value)
                    }
                  />
                </Th>
                <Th>
                  Fila
                  <QueueSelect
                    value={filters.queueId}
                    onChange={(e) =>
                      handleFilterChange("queueId", e.target.value)
                    }
                  >
                    <option value="">Todas</option>
                    {queue.map((q: any) => (
                      <QueueOption
                        key={q._id}
                        value={q._id}
                        isParent={isParentQueue(q.name)}
                      >
                        {q.name}
                      </QueueOption>
                    ))}
                  </QueueSelect>
                </Th>
                <Th>
                  Externos
                  <FilterInput
                    placeholder="Filtrar"
                    value={filters.externalTickets}
                    onChange={(e) =>
                      handleFilterChange("externalTickets", e.target.value)
                    }
                  />
                </Th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket: Ticket) => {
                const queueName =
                  queue.find((q: any) => q._id === ticket.queueId)?.name ||
                  ticket.queueId;

                return (
                  <Row
                    key={ticket.ticketId}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <Td>{ticket.ticketId}</Td>
                    <Td>
                      <StatusBadge status={ticket.status}>
                        {ticket.status}
                      </StatusBadge>
                    </Td>
                    <Td>{ticket.name}</Td>
                    <Td>{ticket.groupId}</Td>
                    <Td>{queueName}</Td>
                    <Td>
                      {ticket.externalTickets.length > 0
                        ? ticket.externalTickets.map((ext, i) => (
                            <div key={i}>
                              <strong>{ext.key}:</strong> {ext.value}
                            </div>
                          ))
                        : "—"}
                    </Td>
                  </Row>
                );
              })}
            </tbody>
          </Table>

          {/* DataTicket aberto sobre a lista */}
          {selectedTicket && (
            <DataTicket
              queues={queueForDelegate}
              onDelegate={onConfirm}
              key={selectedTicket._id}
              ticket={selectedTicket}
              onCloseTicket={() => setSelectedTicket(null)}
              onAddNote={() => console.log("a")}
              onClose={() => setSelectedTicket(null)}
            />
          )}
        </TableWrapper>
      )}
    </>
  );
};

export default TicketTable;
