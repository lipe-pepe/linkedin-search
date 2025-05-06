"use client";

import { useContext, useState } from "react";
import TermsContext from "@/contexts/termsContext";

const substringMatches = (string: string, substring: string) => {
  const lowerStr = string.toLowerCase();
  const lowerSub = substring.toLowerCase();

  return lowerStr.startsWith(lowerSub) || lowerStr.includes(" " + lowerSub);
};

const Select = () => {
  // useContext fala para o React que esse componente quer ler o contexto TermsContext.
  // Mas para o React saber de onde pegar o TermsContext, ele tem que ser provido em algum componente
  // acima na árvore de componentes (em Form)
  const terms = useContext(TermsContext);
  const [filtered, setFiltered] = useState<string[]>();

  return (
    <div>
      <input
        type="text"
        placeholder="Digite um cargo..."
        onChange={(e) => {
          const search = e.target.value.toLowerCase();
          const result = terms
            .filter((t) => substringMatches(t, search))
            .slice(0, 10);
          setFiltered(result);
        }}
      />
      <ul>
        {filtered?.map((option, index) => (
          <li key={`${option}-${index}`} className="text-white">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
