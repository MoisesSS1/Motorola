import React, { useState } from "react";
import styled from "styled-components";
import Users from "./components/Users/Users";
import Groups from "./components/Groups/Groups";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavButton = styled.button<{ active?: boolean }>`
  text-align: left;
  padding: 10px 15px;
  border: none;
  background: ${({ active }) => (active ? "#eee" : "transparent")};
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    background: #eee;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 30px;
`;

const AdminDashboard = () => {
  const [view, setView] = useState<"users" | "groups">("groups");

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>Admin</SidebarTitle>
        <Nav>
          <NavButton
            active={view === "groups"}
            onClick={() => setView("groups")}
          >
            Grupos
          </NavButton>

          <NavButton active={view === "users"} onClick={() => setView("users")}>
            Usuários
          </NavButton>

          <NavButton>Relatórios</NavButton>
          <NavButton>Sair</NavButton>
        </Nav>
      </Sidebar>

      <Main>
        {view === "users" && <Users />}
        {view === "groups" && <Groups />}
      </Main>
    </Container>
  );
};

export default AdminDashboard;
