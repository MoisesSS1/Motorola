import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
`;

const Button = styled.button`
  padding: 12px 18px;
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

interface IUser {
  idAdmin: string;
  name: string;
  password: string;
  permissions: string[];
  sector: string;
  groupsId: string[];
}

interface IGroup {
  id: string;
  name: string;
}

const CreateUser: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    idAdmin: "admin-001",
    name: "",
    password: "",
    permissions: [],
    sector: "",
    groupsId: [],
  });

  const [groups] = useState<IGroup[]>([
    { id: "g1", name: "Suporte" },
    { id: "g2", name: "Financeiro" },
    { id: "g3", name: "TI" },
  ]);

  const permissionsList: string[] = [
    "see",
    "delegate",
    "comment",
    "create",
    "close",
  ];

  const handlePermissionChange = (perm: string) => {
    if (user.permissions.includes(perm)) {
      setUser({
        ...user,
        permissions: user.permissions.filter((p) => p !== perm),
      });
    } else {
      setUser({ ...user, permissions: [...user.permissions, perm] });
    }
  };

  const handleGroupChange = (groupId: string) => {
    if (user.groupsId.includes(groupId)) {
      setUser({
        ...user,
        groupsId: user.groupsId.filter((id) => id !== groupId),
      });
    } else {
      setUser({ ...user, groupsId: [...user.groupsId, groupId] });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Novo usuário criado:", user);
    alert("Usuário criado! Veja o console.");
    // aqui você chamaria o backend (API POST)
  };

  return (
    <Container>
      <Title>Criar Usuário</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={user.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, name: e.target.value })
          }
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={user.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
          required
        />

        <Input
          type="text"
          placeholder="Setor"
          value={user.sector}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, sector: e.target.value })
          }
        />

        <h4>Permissões:</h4>
        <CheckboxGroup>
          {permissionsList.map((perm) => (
            <CheckboxLabel key={perm}>
              <input
                type="checkbox"
                checked={user.permissions.includes(perm)}
                onChange={() => handlePermissionChange(perm)}
              />
              {perm}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>

        <h4>Grupos:</h4>
        <CheckboxGroup>
          {groups.map((group) => (
            <CheckboxLabel key={group.id}>
              <input
                type="checkbox"
                checked={user.groupsId.includes(group.id)}
                onChange={() => handleGroupChange(group.id)}
              />
              {group.name}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>

        <Button type="submit">Salvar Usuário</Button>
      </form>
    </Container>
  );
};

export default CreateUser;
