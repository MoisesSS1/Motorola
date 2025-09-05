import { QueueAllInSubQueue } from "@/interfaces/Queue";
import {
  CancelButton,
  CloseButton,
  CloseTicketButton,
  CommentButton,
  Container,
  DelegateButton,
  Header,
  ModalButtons,
  ModalContainer,
  ModalOverlay,
  Note,
  NoteHeader,
  Notes,
  Overlay,
  SaveButton,
  TextArea,
  Title,
} from "@/styles/User/DataTicket";
import React, { useState, useEffect, useRef } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { DelegateModal } from "./DelegateModal";

/* -------------------- componente principal DataTicket -------------------- */
const DataTicket = ({
  ticket,
  queues,
  onClose,
  onAddNote,
  onDelegate,
  onCloseTicket,
}: {
  ticket: any;
  queues: QueueAllInSubQueue[];
  onClose: () => void;
  onAddNote?: (text: string) => void;
  onDelegate?: (queueId: string) => void;
  onCloseTicket?: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [showQueueModal, setShowQueueModal] = useState(false);

  const notesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket.notes, ticket.history, showModal]);

  useEffect(() => {
    if (showModal) textAreaRef.current?.focus();
  }, [showModal]);

  const handleSave = () => {
    if (!noteText.trim()) return;
    if (onAddNote) onAddNote(noteText);

    ticket.notes = ticket.notes || [];
    ticket.notes.push({
      text: noteText,
      name: "Você",
      createdBy: "me",
      createdAt: new Date().toISOString(),
    });

    setNoteText("");
    setShowModal(false);
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const combinedNotes = [
    ...(ticket.notes || []),
    ...(ticket.history || []).map((h: any) => ({
      text: `Chamado delegado para a fila ${
        h.queueId?.toString() || "desconhecida"
      }`,
      name: h.name || "Sistema",
      createdBy: "history",
      createdAt: h.changedAt,
      isHistory: true,
    })),
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <Overlay>
      <Container>
        <Header>
          <Title>{ticket.name}</Title>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>

        <Notes>
          {combinedNotes.length > 0 ? (
            combinedNotes.map((note: any, index: number) => (
              <Note
                key={index}
                isOwn={note.createdBy === "me"}
                isHistory={note.isHistory}
              >
                <NoteHeader>
                  <span>{note.name || "Usuário"}</span>
                  <span>{formatDate(note.createdAt)}</span>
                </NoteHeader>
                {note.text}
              </Note>
            ))
          ) : (
            <p>Sem notas ainda.</p>
          )}
          <div ref={notesEndRef} />
        </Notes>

        <CommentButton onClick={() => setShowModal(true)}>
          Comentar <FaRegCommentDots />
        </CommentButton>

        <DelegateButton onClick={() => setShowQueueModal(true)}>
          Delegar
        </DelegateButton>
        <CloseTicketButton onClick={onCloseTicket}>
          Fechar chamado
        </CloseTicketButton>

        {/* Modal de comentário */}
        {showModal && (
          <ModalOverlay>
            <ModalContainer>
              <TextArea
                ref={textAreaRef}
                rows={4}
                placeholder="Digite sua nota..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <ModalButtons>
                <CancelButton onClick={() => setShowModal(false)}>
                  Cancelar
                </CancelButton>
                <SaveButton onClick={handleSave}>Salvar</SaveButton>
              </ModalButtons>
            </ModalContainer>
          </ModalOverlay>
        )}

        {/* Modal de delegação */}
        {showQueueModal && (
          <DelegateModal
            queues={queues}
            ticket={ticket}
            currentQueueId={ticket.queueId}
            onClose={() => setShowQueueModal(false)}
            onConfirm={(queueId) => {
              if (onDelegate) onDelegate(queueId);
              setShowQueueModal(false);
            }}
          />
        )}
      </Container>
    </Overlay>
  );
};

export default DataTicket;
