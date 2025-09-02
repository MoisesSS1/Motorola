import React, { useState } from "react";
import { MdOutlineDeleteForever, MdEdit } from "react-icons/md";
import styled from "styled-components";

const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px;
`;

const NodeCard = styled.div`
  min-width: 160px;
  padding: 10px 14px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  strong {
    font-size: 15px;
    color: #222;
  }

  .desc {
    font-size: 13px;
    color: #555;
    margin-top: 4px;
  }
`;

const Button = styled.button`
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  cursor: pointer;
  margin-top: 8px;
  font-size: 14px;
  transition: 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #004095);
    transform: scale(1.03);
  }
`;

const IconButton = styled.span`
  position: absolute;
  top: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const DeleteIcon = styled(IconButton)`
  right: 10px;
  color: #dc3545;

  &:hover {
    color: #a71d2a;
  }
`;

const EditIcon = styled(IconButton)`
  right: 36px;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    width: 2px;
    height: 20px;
    background: #ccc;
  }
`;

/* Modal */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  h3 {
    margin-bottom: 16px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 8px;
  }

  .save {
    background: #007bff;
    color: white;

    &:hover {
      background: #0056b3;
    }
  }

  .cancel {
    background: #6c757d;
    color: white;

    &:hover {
      background: #495057;
    }
  }
`;

export interface IQueue {
  _id: string;
  name: string;
  description?: string;
  subQueues: IQueue[];
}

interface ShowQueueTreeProps {
  queue: IQueue;
  onAddSubQueue: (parentId: string) => void;
  onDeleteQueue: (queueId: string) => void;
  onEditQueue: (
    queueId: string,
    data: { name: string; description?: string },
  ) => void;
}

const ShowQueueTree: React.FC<ShowQueueTreeProps> = ({
  queue,
  onAddSubQueue,
  onDeleteQueue,
  onEditQueue,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(queue.name);
  const [editDescription, setEditDescription] = useState(
    queue.description || "",
  );

  const handleSave = () => {
    onEditQueue(queue._id, { name: editName, description: editDescription });
    setIsEditing(false);
  };

  return (
    <NodeWrapper>
      <NodeCard>
        {/* Editar sempre aparece */}
        <EditIcon onClick={() => setIsEditing(true)}>
          <MdEdit />
        </EditIcon>

        {/* Excluir só aparece se não tiver subfilas */}
        {(!queue.subQueues || queue.subQueues.length === 0) && (
          <DeleteIcon onClick={() => onDeleteQueue(queue._id)}>
            <MdOutlineDeleteForever />
          </DeleteIcon>
        )}

        <strong>{queue.name}</strong>
        {queue.description && <div className="desc">{queue.description}</div>}

        <div style={{ marginTop: "8px" }}>
          <Button onClick={() => onAddSubQueue(queue._id)}>➕ Subfila</Button>
          {queue.subQueues && queue.subQueues.length > 0 && (
            <Button
              style={{ marginLeft: "8px", background: "#6c757d" }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "− Recolher" : "＋ Expandir"}
            </Button>
          )}
        </div>
      </NodeCard>

      {expanded && queue.subQueues && queue.subQueues.length > 0 && (
        <ChildrenWrapper>
          {queue.subQueues.map((sub) => (
            <ShowQueueTree
              key={sub._id}
              queue={sub}
              onAddSubQueue={onAddSubQueue}
              onDeleteQueue={onDeleteQueue}
              onEditQueue={onEditQueue}
            />
          ))}
        </ChildrenWrapper>
      )}

      {/* Modal de edição */}
      {isEditing && (
        <ModalOverlay>
          <ModalContent>
            <h3>Editar Fila</h3>
            <input
              type="text"
              placeholder="Nome"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <textarea
              placeholder="Descrição"
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div>
              <button className="save" onClick={handleSave}>
                Salvar
              </button>
              <button className="cancel" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </NodeWrapper>
  );
};

export default ShowQueueTree;
