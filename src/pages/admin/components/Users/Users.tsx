import Modal from "@/components/Modal";
import React, { useState } from "react";
import styled from "styled-components";
import CreateUser from "./components/CreateUser";

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

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      idAdmin: "admin-001",
      name: "João Silva",
      password: "123456",
      permissions: ["see", "comment"],
      sector: "Suporte",
      groupsId: ["g1", "g2"],
    },
    {
      id: 2,
      idAdmin: "admin-001",
      name: "Maria Oliveira",
      password: "654321",
      permissions: ["see", "create", "close"],
      sector: "Financeiro",
      groupsId: ["g3"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Title>Usuários</Title>
      <Button onClick={() => setShowModal(true)}>Criar Usuário</Button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateUser />
        </Modal>
      )}

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Setor</Th>
            <Th>Permissões</Th>
            <Th>Grupos</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.sector}</Td>
              <Td>{user.permissions.join(", ")}</Td>
              <Td>{user.groupsId.join(", ")}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
