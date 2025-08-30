import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "@/components/Modal";
import Queues from "./components/Queues/Queues";
import Items from "./components/Items/Items";
import { GetAllGroups } from "../../../../services/functions/Group/Group";
import Loading from "@/components/Loading/Loading";
import { GrTableAdd } from "react-icons/gr";
import CreateGroupForm from "./components/CreateGroupForm/CreateGroupForm";
import {
  CreateGroupCall,
  ICreateGroup,
} from "@/services/functions/Group/CreateGroup";
import AlertMessage, {
  AlertProps,
} from "@/components/AlertMessage/AlertMessage";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActiveGroupBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  cursor: pointer;
  background: #f9f9f9;

  &:hover {
    background: #f1f1f1;
  }
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupName = styled.h3`
  margin: 0;
`;

const GroupDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
`;

const Button = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: ${(props) => (props.active ? "#007bff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#007bff")};
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  border: 1px solid #007bff;

  &:hover {
    background: ${(props) => (props.active ? "#0056b3" : "#e6f0ff")};
  }
`;

interface IGroup {
  _id: string;
  name: string;
  description: string;
}

const Groups: React.FC = () => {
  const [dataAlert, setDataAlert] = useState<AlertProps>({
    type: null,
    message: null,
  });
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [activeGroup, setActiveGroup] = useState<IGroup | null>(null);

  const [modalType, setModalType] = useState<"chooseGroup" | null>(null);

  // controle de aba selecionada
  const [activeTab, setActiveTab] = useState<"queues" | "items">("queues");

  // controle de exibição do form de criação
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    async function getGroups() {
      const res = await GetAllGroups();

      if (res.type !== "error") {
        setGroups(res.data.data);
        setActiveGroup(res.data.data[0]); // Define o primeiro grupo como padrão
      }

      setLoading(false);
    }

    getGroups();
  }, []);

  const selectQueues = () => setActiveTab("queues");
  const selectItems = () => setActiveTab("items");

  const chooseGroup = (group: IGroup) => {
    setActiveGroup(group);
    setModalType(null); // Fecha modal
    setActiveTab("queues"); // Ao trocar de grupo, sempre exibe filas
  };

  const closeModal = () => setModalType(null);

  const toggleCreateForm = () => setShowCreateForm(!showCreateForm);

  async function handleNewGroup({ name, description }: ICreateGroup) {
    const res = await CreateGroupCall({ description, name });

    if (res.type === "error") {
      setDataAlert({
        type: "error",
        message: res.message,
        key: new Date(),
      });
    } else {
      const newGroup = {
        _id: res.data.createGroup._id,
        name: res.data.createGroup.name,
        description,
      };
      setGroups([...groups, newGroup]);
      setActiveTab("queues"); // exibe filas automaticamente
      setActiveGroup(newGroup);
      setShowCreateForm(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <AlertMessage {...dataAlert} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title>Grupos</Title>
            <GrTableAdd size={24} cursor="pointer" onClick={toggleCreateForm} />
          </div>

          {showCreateForm && (
            <CreateGroupForm
              onCreate={(name, description) =>
                handleNewGroup({ name, description })
              }
              onCancel={() => setShowCreateForm(false)}
            />
          )}

          {/* Grupo ativo fixo no topo */}
          {activeGroup && (
            <ActiveGroupBar onClick={() => setModalType("chooseGroup")}>
              <GroupInfo>
                <GroupName>{activeGroup.name}</GroupName>
                <GroupDescription>{activeGroup.description}</GroupDescription>
              </GroupInfo>
              <span>▼</span>
            </ActiveGroupBar>
          )}

          {/* Botões de seleção */}
          {activeGroup && (
            <div>
              <Button active={activeTab === "queues"} onClick={selectQueues}>
                Filas
              </Button>
              <Button active={activeTab === "items"} onClick={selectItems}>
                Itens
              </Button>
            </div>
          )}

          {/* Renderização direta */}
          {activeGroup && activeTab === "queues" && (
            <Queues group={activeGroup} />
          )}
          {activeGroup && activeTab === "items" && (
            <Items group={activeGroup} />
          )}

          {/* Modal apenas para troca de grupo */}
          {modalType === "chooseGroup" && (
            <Modal onClose={closeModal}>
              <div>
                <h2>Escolher Grupo</h2>
                {groups.map((group) => (
                  <div
                    key={group._id}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => chooseGroup(group)}
                  >
                    <strong>{group.name}</strong>
                    <p style={{ margin: "5px 0" }}>{group.description}</p>
                  </div>
                ))}
              </div>
            </Modal>
          )}
        </Container>
      )}
    </>
  );
};

export default Groups;
