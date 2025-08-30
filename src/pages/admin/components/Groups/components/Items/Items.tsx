import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-right: 8px;
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

const List = styled.ul`
  margin-top: 15px;
`;

const ListItem = styled.li`
  padding: 6px 0;
`;

interface IItem {
  id: string;
  name: string;
}

interface IGroup {
  _id: string;
  name: string;
}

interface ItemsProps {
  group: IGroup;
}

const Items: React.FC<ItemsProps> = ({ group }) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [itemName, setItemName] = useState("");

  const addItem = () => {
    if (!itemName.trim()) return;
    const newItem: IItem = { id: Date.now().toString(), name: itemName };
    setItems([...items, newItem]);
    setItemName("");
  };

  return (
    <Container>
      <Title>Itens do grupo: {group.name}</Title>

      <div>
        <Input
          placeholder="Nome do item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Button onClick={addItem}>Adicionar Item</Button>
      </div>

      <List>
        {items.map((item) => (
          <ListItem key={item.id}>{item.name}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Items;
