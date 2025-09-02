import React from "react";
import styled from "styled-components";

interface Attribute {
  key: string;
  value: any;
}

interface IItem {
  _id: string;
  name: string;
  attributes: Attribute[];
}

interface ItemsTableProps {
  items: IItem[];
}

const Container = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  min-width: 600px;
  width: 100%;
  font-size: 14px;
  color: #374151;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 2;
`;

const Th = styled.th`
  padding: 12px 16px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  text-align: left;
  border: 1px solid #d1d5db;
  font-weight: 600;
  white-space: nowrap;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }

  &:hover {
    background: #eef2ff;
    transition: background 0.2s ease;
  }
`;

const Td = styled.td`
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 20px;
  font-size: 15px;
`;

const ItemsTable: React.FC<ItemsTableProps> = ({ items }) => {
  if (!items.length)
    return (
      <Container>
        <EmptyState>Nenhum item disponível.</EmptyState>
      </Container>
    );

  // Pega todas as chaves únicas das attributes
  const attributeKeys = Array.from(
    new Set(items.flatMap((item) => item.attributes.map((attr) => attr.key))),
  );

  return (
    <Container>
      <ScrollWrapper>
        <Table>
          <Thead>
            <tr>
              <Th>Nome</Th>
              {attributeKeys.map((key) => (
                <Th key={key}>{key}</Th>
              ))}
            </tr>
          </Thead>
          <tbody>
            {items.map((item) => (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                {attributeKeys.map((key) => {
                  const attr = item.attributes.find((a) => a.key === key);
                  return <Td key={key}>{attr ? attr.value : "-"}</Td>;
                })}
              </Tr>
            ))}
          </tbody>
        </Table>
      </ScrollWrapper>
    </Container>
  );
};

export default ItemsTable;
