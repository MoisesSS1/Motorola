import { QueueAllInSubQueue } from "@/interfaces/Queue";
import {
  CancelButton,
  DelegateModalContainer,
  DropdownList,
  ModalButtons,
  ModalOverlay,
  QueueButton,
  QueueLayer,
  SaveButton,
} from "@/styles/User/DelegateModal";

import { useEffect, useState } from "react";

export const DelegateModal = ({
  queues,
  currentQueueId,
  ticket,
  onClose,
  onConfirm,
}: {
  queues: QueueAllInSubQueue[];
  currentQueueId: string;
  ticket: any;
  onClose: () => void;
  onConfirm: (queueId: string) => void;
}) => {
  const [path, setPath] = useState<QueueAllInSubQueue[]>([]);
  const [openLayer, setOpenLayer] = useState<number | null>(null);
  const [filteredQueues, setFilteredQueues] = useState<QueueAllInSubQueue[]>(
    [],
  );

  const findPath = (
    all: QueueAllInSubQueue[],
    targetId: string,
    trail: QueueAllInSubQueue[] = [],
  ): QueueAllInSubQueue[] | null => {
    for (let q of all) {
      if (q._id === targetId) return [...trail, q];
      if (q.subQueues?.length) {
        const found = findPath(q.subQueues, targetId, [...trail, q]);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    // filtra uma vez e guarda no estado
    const sameGroupQueues = queues.filter(
      (q: any) => q.groupId === ticket.groupId,
    );
    setFilteredQueues(sameGroupQueues);

    const pathFound = findPath(sameGroupQueues, currentQueueId);
    if (pathFound) {
      setPath(pathFound);
    } else {
      setPath([]); // se não encontrar nada
    }
  }, [queues, currentQueueId, ticket.groupId]);

  const handleSelect = (level: number, queue: QueueAllInSubQueue) => {
    const newPath = [...path.slice(0, level - 1), queue];
    setPath(newPath);
    setOpenLayer(null);
  };

  return (
    <ModalOverlay>
      <DelegateModalContainer>
        <h3>Delegar chamado</h3>

        {Array.from({ length: path.length + 1 }).map((_, index) => {
          const parent = index === 0 ? null : path[index - 1];
          const options =
            index === 0
              ? filteredQueues.filter((q) => q.parentQueueId === null)
              : parent?.subQueues || [];

          if (options.length === 0) return null;
          const selected = path[index];

          return (
            <QueueLayer key={index}>
              <strong>Camada {index + 1}</strong>
              <QueueButton
                selected
                onClick={() => setOpenLayer(openLayer === index ? null : index)}
              >
                {selected ? selected.name : "Selecionar"}
              </QueueButton>
              {openLayer === index && (
                <DropdownList>
                  {options.map((q) => (
                    <QueueButton
                      key={q._id}
                      selected={selected?._id === q._id}
                      onClick={() => handleSelect(index + 1, q)}
                    >
                      {q.name}
                    </QueueButton>
                  ))}
                </DropdownList>
              )}
            </QueueLayer>
          );
        })}

        <ModalButtons>
          <SaveButton
            disabled={
              path.length === 0 || path[path.length - 1]._id === currentQueueId
            }
            onClick={() => {
              if (
                path.length > 0 &&
                path[path.length - 1]._id !== currentQueueId
              ) {
                onConfirm(path[path.length - 1]._id);
              }
            }}
          >
            Delegar chamado
          </SaveButton>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
        </ModalButtons>
      </DelegateModalContainer>
    </ModalOverlay>
  );
};
