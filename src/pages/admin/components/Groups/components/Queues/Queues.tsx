import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;

  &:hover {
    background: #0056b3;
  }
`;

const List = styled.ul`
  margin-top: 15px;
`;

const ListItem = styled.li`
  padding: 6px 0;
`;

const SubList = styled.ul`
  margin-left: 20px;
  margin-top: 4px;
`;

interface ISubQueue {
  id: string;
  name: string;
}

interface IQueue {
  id: string;
  name: string;
  subQueues: ISubQueue[];
}

interface IGroup {
  _id: string;
  name: string;
}

interface QueuesProps {
  group: IGroup;
}

const Queues: React.FC<QueuesProps> = ({ group }) => {
  const [queues, setQueues] = useState<IQueue[]>([]);
  const [queueName, setQueueName] = useState("");
  const [subQueueName, setSubQueueName] = useState("");

  const addQueue = () => {
    if (!queueName.trim()) return;
    const newQueue: IQueue = {
      id: Date.now().toString(),
      name: queueName,
      subQueues: [],
    };
    setQueues([...queues, newQueue]);
    setQueueName("");
  };

  const addSubQueue = (queueId: string) => {
    if (!subQueueName.trim()) return;
    setQueues(
      queues.map((q) =>
        q.id === queueId
          ? {
              ...q,
              subQueues: [
                ...q.subQueues,
                { id: Date.now().toString(), name: subQueueName },
              ],
            }
          : q,
      ),
    );
    setSubQueueName("");
  };

  return (
    <Container>
      <Title>Filas do grupo: {group.name}</Title>

      {/* Adicionar fila */}
      <div>
        <Input
          placeholder="Nome da fila"
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
        />
        <Button onClick={addQueue}>Adicionar Fila</Button>
      </div>

      {/* Listagem de filas */}
      <List>
        {queues.map((queue) => (
          <ListItem key={queue.id}>
            <strong>Fila: {queue.name}</strong>

            {/* Adicionar subfila */}
            <div style={{ marginTop: "4px", marginBottom: "4px" }}>
              <Input
                placeholder="Nome da subfila"
                value={subQueueName}
                onChange={(e) => setSubQueueName(e.target.value)}
              />
              <Button onClick={() => addSubQueue(queue.id)}>
                Adicionar Subfila
              </Button>
            </div>

            {/* Listar subfilas */}
            {queue.subQueues.length > 0 && (
              <SubList>
                {queue.subQueues.map((sub) => (
                  <li key={sub.id}>{sub.name}</li>
                ))}
              </SubList>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Queues;
