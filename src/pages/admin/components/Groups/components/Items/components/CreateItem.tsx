import { ICreateItem } from "@/services/functions/Group/CreateItem";
import React, { useState } from "react";

interface CreateItemProps {
  onSave: (item: ICreateItem) => void;
  onClose?: () => void;
}

const CreateItem: React.FC<CreateItemProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState<{ key: string; value: any }[]>(
    [],
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const handleChangeAttribute = (index: number, key: string, value: any) => {
    const newAttrs = [...attributes];
    newAttrs[index] = { key, value };
    setAttributes(newAttrs);
  };

  const validate = () => {
    const newErrors: string[] = [];

    if (name.trim().length < 1) {
      newErrors.push("O campo Nome é obrigatório.");
    }

    // Valida se todos os campos estão preenchidos
    attributes.forEach((attr, i) => {
      if (!attr.key.trim()) {
        newErrors.push(`A chave do atributo ${i + 1} é obrigatória.`);
      }
      if (!attr.value.trim()) {
        newErrors.push(`O valor do atributo ${i + 1} é obrigatório.`);
      }
    });

    // Valida keys duplicadas
    const keysLower = attributes.map((attr) => attr.key.toLowerCase().trim());
    const duplicatedKeys = keysLower.filter(
      (key, idx) => key && keysLower.indexOf(key) !== idx,
    );
    if (duplicatedKeys.length > 0) {
      newErrors.push("As chaves dos atributos devem ser únicas.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    // Converter tudo para lowercase antes de salvar
    const formattedName = name.toLowerCase().trim();
    const formattedAttrs = attributes.map((attr) => ({
      key: attr.key.toLowerCase().trim(),
      value: attr.value.toLowerCase().trim(),
    }));

    onSave({ name: formattedName, attributes: formattedAttrs });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          width: "420px",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            marginBottom: "16px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          Criar Item
        </h2>

        {/* Nome */}
        <input
          placeholder="Nome do item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "14px",
            fontSize: "14px",
          }}
        />

        {/* Atributos */}
        {attributes.map((attr, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Chave"
              value={attr.key}
              onChange={(e) =>
                handleChangeAttribute(i, e.target.value, attr.value)
              }
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "13px",
              }}
            />
            <input
              placeholder="Valor"
              value={attr.value}
              onChange={(e) =>
                handleChangeAttribute(i, attr.key, e.target.value)
              }
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "13px",
              }}
            />
          </div>
        ))}

        <button
          onClick={handleAddAttribute}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px dashed #888",
            background: "#f9f9f9",
            fontSize: "14px",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          ➕ Adicionar atributo
        </button>

        {/* Erros */}
        {errors.length > 0 && (
          <div
            style={{
              marginTop: "12px",
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          >
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Ações */}
        <div
          style={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          {onClose && (
            <button
              onClick={onClose}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#f5f5f5",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Cancelar
            </button>
          )}
          <button
            onClick={handleSave}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
