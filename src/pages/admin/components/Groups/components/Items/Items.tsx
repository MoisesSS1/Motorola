import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemsTable from "./components/ItemTable";
import CreateItem from "./components/CreateItem";
import {
  CreateItemCall,
  ICreateItem,
} from "@/services/functions/Group/CreateItem";
import { GetAllItems } from "@/services/functions/Group/GetAllItem";

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  margin: 0;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

interface Props {
  groupId: string;
}

const Items = ({ groupId }: Props) => {
  const [items, setItems] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  // Carrega os itens do backend
  useEffect(() => {
    async function fetchItems() {
      const res = await GetAllItems({ groupId });

      setItems(res.data.data);
      console.log(res.data);
    }

    fetchItems();
  }, [groupId]);

  async function handleSave({ attributes, name, groupId }: ICreateItem) {
    const res = await CreateItemCall({ attributes, name, groupId });

    const newItem = {
      _id: res.data._id,
      name,
      attributes,
    };

    setItems([...items, { ...newItem }]);
    setShowCreate(false);
  }

  return (
    <Container>
      <Header>
        <Title>Itens do grupo</Title>
        <Button onClick={() => setShowCreate(true)}>Criar Item</Button>
      </Header>

      <TableWrapper>
        <ItemsTable items={items} />
      </TableWrapper>

      {/* Exibe o componente de criação */}
      {showCreate && (
        <CreateItem
          onClose={() => setShowCreate(false)}
          onSave={(newItem: ICreateItem) => handleSave({ groupId, ...newItem })}
        />
      )}
    </Container>
  );
};

export default Items;
