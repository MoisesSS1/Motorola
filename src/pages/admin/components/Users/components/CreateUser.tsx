import { GetAllGroups } from "@/services/functions/Group/Group";
import { CreateUserCall } from "@/services/functions/User/CreateUser";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0px;
  padding: 10px;
  padding-right: 40px; // espaço pro ícone
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #555;
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
  idAdmin?: string;
  name: string;
  login: string;
  password: string;
  permissions: ["see", "delegate", "comment", "create", "close"] | any;
  sector: string;
  groupsId: string[];
}

const CreateUser = ({ groups, setReloadUsers }: any) => {
  const [user, setUser] = useState<IUser>({
    name: "",
    login: "",
    password: "",
    permissions: ["see", "delegate", "comment", "create", "close"],
    sector: "",
    groupsId: [],
  });

  const [showPassword, setShowPassword] = useState(false);

  const permissionsList: string[] = [
    "see",
    "delegate",
    "comment",
    "create",
    "close",
  ];

  const handlePermissionChange = (perm: any) => {
    if (user.permissions.includes(perm)) {
      setUser({
        ...user,
        permissions: user.permissions.filter((p: any) => p !== perm),
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await CreateUserCall({
      groupsId: user.groupsId,
      login: user.login,
      name: user.name,
      password: user.password,
      permissions: user.permissions,
    });

    if (res.type === "error") {
      alert(res.message);
    } else {
      setReloadUsers(Date.now());
      setUser({
        name: "",
        login: "",
        password: "",
        permissions: ["see", "delegate", "comment", "create", "close"],
        sector: "",
        groupsId: [],
      });
    }
  };

  return (
    <Container>
      <Title>Novo Usuário</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome - Setor"
          value={user.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, name: e.target.value })
          }
          required
        />

        <Input
          type="text"
          placeholder="Login"
          value={user.login}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, login: e.target.value })
          }
          required
        />

        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={user.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, password: e.target.value })
            }
            required
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </EyeIcon>
        </InputWrapper>

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
          {groups.map((group: any) => (
            <CheckboxLabel key={group._id}>
              <input
                type="checkbox"
                checked={user.groupsId.includes(group._id)}
                onChange={() => handleGroupChange(group._id)}
              />
              {group.name}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>

        <Button type="submit">Criar Usuário</Button>
      </form>
    </Container>
  );
};

export default CreateUser;
