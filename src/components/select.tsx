"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import TermsContext from "@/contexts/termsContext";
import CreatableSelect from "react-select/creatable";

interface Option {
  label: string;
  value: string;
}

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

  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = React.useState<readonly Option[]>([]);

  // Atualiza os termos selecionados
  useEffect(() => {
    const selectedTerms = value.map((item) => item.value);
    onChange(selectedTerms);
  }, [onChange, value]);

  useEffect(() => {
    setOptions(
      terms
        .map((t) => {
          return { value: t, label: t };
        })
        .slice(0, 10)
    );
  }, [terms]);

  return (
    <div className="w-full my-2 flex flex-col items-start justify-center gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-lg font-medium">{title}</p>
      </div>
      <p className="text-sm">{description}</p>
      <CreatableSelect
        className="w-full"
        isMulti
        isClearable
        placeholder={placeholder}
        options={options}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export default Select;
