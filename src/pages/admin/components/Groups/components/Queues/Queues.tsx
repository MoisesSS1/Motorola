import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateQueueComponent from "./Components/CreateQueue";
import ShowQueueTree from "./Components/ShowQueueTree";
import { CreateQueue } from "@/services/functions/Queue/CreateQueue";
import { GetAllQueues } from "@/services/functions/Queue/GetAllQueue";
import Loading from "@/components/Loading/Loading";

const Container = styled.div`
  max-width: 80vw;
  padding: 20px;
  overflow-x: auto;
  white-space: nowrap;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    background: #0056b3;
  }
`;

interface ISubQueue {
  _id: string;
  description?: string;
  name: string;
  groupId: string;
  parentQueueId: string | null;
  idAdmin: string;
  subQueues: ISubQueue[];
}

interface IQueue extends ISubQueue {}

interface QueuesProps {
  groupId: string;
}

const Queues: React.FC<QueuesProps> = ({ groupId }) => {
  const [loading, setLoading] = useState(true);
  const [reloadQueue, setReloadQueue] = useState(false);
  const [queues, setQueues] = useState<IQueue[]>([]);
  const [selectedRootQueueId, setSelectedRootQueueId] = useState<string | null>(
    null,
  );
  const [showCreateQueueModal, setShowCreateQueueModal] = useState(false);
  const [parentForNewQueue, setParentForNewQueue] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function main() {
      setLoading(true);
      const res = await GetAllQueues(groupId);

      if (res.type === "error") {
        alert(res.message);
      } else {
        setQueues(res.data.data);
      }

      setLoading(false);
    }

    main();
  }, [selectedRootQueueId, reloadQueue]);

  const handleCreateQueue = async (data: {
    name: string;
    description?: string;
  }) => {
    const res = await CreateQueue({
      description: data.description || "",
      groupId,
      name: data.name.toUpperCase(),
      parentQueueId: parentForNewQueue,
    });

    if (res.type === "error") {
      alert(res.message);
    } else {
      setReloadQueue(!reloadQueue);
    }

    setShowCreateQueueModal(false);
    setParentForNewQueue(null);
  };

  const openCreateQueueModal = (parentId: string | null = null) => {
    setParentForNewQueue(parentId);
    setShowCreateQueueModal(true);
  };

  const rootQueues = queues.filter((q) => q.parentQueueId === null);
  const selectedQueue = queues.find((q) => q._id === selectedRootQueueId);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {/* Botão para criar fila principal */}

          <h3>Filas Principais</h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button onClick={() => openCreateQueueModal(null)}>
              Criar Fila
            </Button>
            {rootQueues.map((queue) => (
              <Button
                key={queue._id}
                onClick={() => setSelectedRootQueueId(queue._id)}
              >
                {queue.name}
              </Button>
            ))}
          </div>

          {/* Renderiza árvore da fila selecionada */}
          {selectedQueue && (
            <div style={{ marginTop: 20 }}>
              <ShowQueueTree
                queue={selectedQueue}
                onAddSubQueue={(parentId) => openCreateQueueModal(parentId)}
              />
            </div>
          )}

          {/* Modal de criação de fila/subfila */}
          {showCreateQueueModal && (
            <CreateQueueComponent
              groupId={groupId}
              parentQueueId={parentForNewQueue}
              onCreate={handleCreateQueue}
              onClose={() => setShowCreateQueueModal(false)}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default Queues;
