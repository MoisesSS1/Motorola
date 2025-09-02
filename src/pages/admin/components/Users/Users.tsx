import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateUser from "./components/CreateUser";
import { GetAllUsers } from "@/services/functions/User/GetAllUsers";
import { GetAllGroups } from "@/services/functions/Group/Group";

const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #f0f0f0;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;
interface IGroup {
  id: string;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function main() {
      const res = await GetAllUsers();

      if (res.type === "error") {
        alert(res.message);
      } else {
        setUsers(res.data.data);
      }
    }

    main();
  }, [reloadUsers]);

  useEffect(() => {
    async function main() {
      const res = await GetAllGroups();

      if (res.type === "error") {
        alert(res.message);
      } else {
        setGroups(res.data.data);
      }
    }

    main();
  }, []);

  return (
    <Container>
      <Title>Usuários</Title>
      <Button onClick={() => setShowModal(true)}>Criar Usuário</Button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateUser setReloadUsers={setReloadUsers} groups={groups} />
        </Modal>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Login</Th>
            <Th>Permissões</Th>
            <Th>Grupos</Th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any) => (
              <tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.login}</Td>
                <Td>{user.permissions.join(", ")}</Td>
                <Td>
                  {user.groupsId
                    .map((id: string) => {
                      const group = groups.find(
                        (g: any) => g.id === id || g._id === id,
                      );
                      return group ? group.name : id;
                    })
                    .join(", ")}
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
