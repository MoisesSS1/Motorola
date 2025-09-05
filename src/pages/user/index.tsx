import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiPlusCircle, FiList, FiUser, FiLogOut } from "react-icons/fi";

import { removeToken } from "@/helpers/removeToken";
import { useRouter } from "next/router";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import { SiDatabricks } from "react-icons/si";
import Loading from "@/components/Loading/Loading";
import TicketTable from "./components/TicketTable/TicketTable";

// ------------------ STYLES ------------------

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
`;

const Sidebar = styled.div`
  width: 70px;
  background: #1e1e2f;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
  overflow: hidden;

  &:hover {
    width: 240px;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  white-space: nowrap;
`;

const SidebarTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
`;

const NavButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.active ? "#007bff" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#ccc")};
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;

  svg {
    flex-shrink: 0;
    font-size: 20px;
  }

  span {
    opacity: 0;
    transition: opacity 0.2s ease;
    white-space: nowrap;
  }

  /* Quando a sidebar está expandida */
  ${Sidebar}:hover & span {
    opacity: 1;
  }

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const SidebarFooter = styled.div`
  padding: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
`;

// ------------------ COMPONENT ------------------

const DashboardHelpDesk = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("chamados");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
          {/* Sidebar */}
          <Sidebar>
            <div>
              <SidebarHeader>
                <SidebarTitle>M</SidebarTitle>
              </SidebarHeader>

              <Nav>
                <NavButton
                  active={activeTab === "conta"}
                  onClick={() => setActiveTab("conta")}
                >
                  <FiUser /> <span>Minha Conta</span>
                </NavButton>
                <NavButton
                  active={activeTab === "criar"}
                  onClick={() => setActiveTab("criar")}
                >
                  <FiPlusCircle /> <span>Abrir Chamado</span>
                </NavButton>

                <NavButton
                  active={activeTab === "chamados"}
                  onClick={() => setActiveTab("chamados")}
                >
                  <FiList /> <span>Chamados</span>
                </NavButton>

                <NavButton
                  active={activeTab === "historico"}
                  onClick={() => setActiveTab("historico")}
                >
                  <SiDatabricks /> <span>Histórico</span>
                </NavButton>
              </Nav>
            </div>

            <SidebarFooter>
              <NavButton onClick={() => Logout()}>
                <FiLogOut /> <span>Sair</span>
              </NavButton>
            </SidebarFooter>
          </Sidebar>

          {/* Conteúdo principal */}
          <MainContent>
            {activeTab === "chamados" && (
              <>
                <TicketTable />
              </>
            )}

            {activeTab === "criar" && <CreateTicket />}

            {activeTab === "conta" && (
              <>
                <Title>Minha Conta</Title>
                <p>
                  <strong>Nome:</strong> João da Silva
                </p>
                <p>
                  <strong>Email:</strong> joao@email.com
                </p>
                <p>
                  <strong>Setor:</strong> Suporte
                </p>
              </>
            )}
          </MainContent>
        </Container>
      )}
    </>
  );
};

export default DashboardHelpDesk;
