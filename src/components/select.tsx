/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import TermsContext from "@/contexts/termsContext";
import CreatableSelect from "react-select/creatable";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  // useContext fala para o React que esse componente quer ler o contexto TermsContext.
  // Mas para o React saber de onde pegar o TermsContext, ele tem que ser provido em algum componente
  // acima na árvore de componentes (nesse caso em Form)
  const terms = useContext(TermsContext);

  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = React.useState<readonly Option[]>([]);

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "var(--color-background)",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--color-background)",
    }),
    option: (base: any, state: { isFocused: any }) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#374151"
          : "#e5e7eb"
        : "var(--color-background)",
      color: theme === "dark" ? "#ffffff" : "#1f2937",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#ffffff" : "#1f2937",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === "dark" ? "var(--color-neutral)" : "#1f2937",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#9ca3af" : "#6b7280",
      ":hover": {
        backgroundColor: theme === "dark" ? "#4b5563" : "#d1d5db",
        color: theme === "dark" ? "#ffffff" : "#111827",
      },
    }),
  };

  useEffect(() => {
    const filteredTerms = terms
      .filter((t) => t.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10); // ainda limita a 10 resultados
    setOptions(filteredTerms.map((t) => ({ value: t, label: t })));
  }, [terms, inputValue]);

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
        onInputChange={(value) => setInputValue(value)}
        onChange={(newValue) => setValue(newValue)}
        styles={customStyles}
      />
    </div>
  );
};

export default Select;
