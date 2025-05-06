"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import TermsContext from "@/contexts/termsContext";
import { MdClose } from "react-icons/md";

const substringMatches = (string: string, substring: string) => {
  const lowerStr = string.toLowerCase();
  const lowerSub = substring.toLowerCase();

  return lowerStr.startsWith(lowerSub) || lowerStr.includes(" " + lowerSub);
};

interface SelectProps {
  icon: ReactNode;
  title: string;
  description: string;
  placeholder: string;
  onChange: (value: string[]) => void;
}

const Select: React.FC<SelectProps> = ({
  icon,
  title,
  description,
  placeholder,
  onChange,
}: SelectProps) => {
  // useContext fala para o React que esse componente quer ler o contexto TermsContext.
  // Mas para o React saber de onde pegar o TermsContext, ele tem que ser provido em algum componente
  // acima na árvore de componentes (nesse caso em Form)
  const terms = useContext(TermsContext);

  const [input, setInput] = useState<string>("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInput(value);

    if (value === "") {
      setFiltered([]);
      return;
    }

    const search = value.toLowerCase();
    // O resultado serão os termos encontrados pela busca que ainda não estejam selecionados.
    const result = terms
      .filter((t) => substringMatches(t, search) && !selected.includes(t))
      .slice(0, 10);
    setFiltered(result);
  };

  const selectTerm = (term: string) => {
    setSelected((prev) => [...prev, term]);

    // Clears filtered
    setFiltered([]);
    setInput("");
  };

  const removeItem = (term: string) => {
    setSelected((prev) => prev.filter((t) => t !== term));
  };

  useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  return (
    <div className="my-2 flex flex-col items-start justify-center gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-lg font-medium">{title}</p>
      </div>
      <p className="text-sm">{description}</p>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const newTerm = input.trim();
            if (newTerm && !selected.includes(newTerm)) {
              selectTerm(newTerm);
            }
          }
        }}
        value={input}
      />
      <div className="w-full relative">
        {filtered.length > 0 && (
          <ul className="absolute bg-white border-1 border-gray px-3 py-1 rounded-lg">
            {filtered?.map((option, index) => (
              <li
                key={`${option}-${index}`}
                className="cursor-pointer hover:font-bold"
                onClick={() => selectTerm(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selected.map((term, index) => (
          <div
            key={`${term}-${index}`}
            className="border-gray-400 border-1 rounded-full px-2 inline-flex items-center gap-2 hover:bg-red-700 hover:text-white hover:border-white cursor-pointer"
            onClick={() => removeItem(term)}
          >
            <p className="text-sm">{term}</p>

            <MdClose />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
