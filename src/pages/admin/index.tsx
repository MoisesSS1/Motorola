import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Users from "./components/Users/Users";
import Groups from "./components/Groups/Groups";
import Loading from "@/components/Loading/Loading";
import { removeToken } from "@/helpers/removeToken";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
`;

const Sidebar = styled.aside`
  width: 60px; /* largura padrão (só ícones) */
  background: #fff;
  padding: 20px 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    width: 250px; /* expande no hover */
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const NavButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: none;
  background: ${({ active }) => (active ? "#eee" : "transparent")};
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
  width: 100%;
  overflow: hidden;

  &:hover {
    background: #eee;
  }

  span {
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* Quando o sidebar está expandido no hover */
  ${Sidebar}:hover & span {
    opacity: 1;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 30px;
`;

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"users" | "groups">("groups");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  async function Logout() {
    await removeToken();

    router.push("/");
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Sidebar>
            <SidebarTitle>Admin</SidebarTitle>
            <Nav>
              <NavButton
                active={view === "groups"}
                onClick={() => setView("groups")}
              >
                📂 <span>Grupos</span>
              </NavButton>

              <NavButton
                active={view === "users"}
                onClick={() => setView("users")}
              >
                👤 <span>Usuários</span>
              </NavButton>

              <NavButton>
                📊 <span>Relatórios</span>
              </NavButton>
              <NavButton onClick={() => Logout()}>
                🚪 <span>Sair</span>
              </NavButton>
            </Nav>
          </Sidebar>

          <Main>
            {view === "users" && <Users />}
            {view === "groups" && <Groups />}
          </Main>
        </Container>
      )}
    </>
  );
};

export default AdminDashboard;
