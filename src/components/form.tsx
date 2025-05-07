"use client";

import TermsContext from "@/contexts/termsContext";
import Select from "./select";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  MdOutlineAddCircleOutline,
  MdOutlineCheckBox,
  MdOutlineDoDisturb,
} from "react-icons/md";
import { generateSearchString } from "@/utils/generateSearchString";
import Button from "./button";

const Form = () => {
  const [terms, setTerms] = useState<string[]>([]);

  const [mandatoryList, setMandatoryList] = useState<string[]>([]);
  const [includeList, setIncludeList] = useState<string[]>([]);
  const [excludeList, setExcludeList] = useState<string[]>([]);

  // Fetches the terms
  useEffect(() => {
    fetch("/terms.json")
      .then((res) => res.json())
      .then((data) => setTerms(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o reload da página
    const searchString = generateSearchString(
      mandatoryList,
      includeList,
      excludeList
    );

    // Abre nova aba com a URL
    window.open(
      `https://www.linkedin.com/jobs/search/?keywords=${searchString}`,
      "_blank"
    );
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <TermsContext value={terms}>
        <Select
          icon={<MdOutlineCheckBox />}
          title="Obrigatórios"
          description="Selecione termos obrigatórios. Só aparecerão resultados que necessariamente contêm esses termos"
          placeholder="Digite o termo..."
          onChange={(x) => setMandatoryList(x)}
        />
        <Select
          icon={<MdOutlineAddCircleOutline />}
          title="Opcionais"
          description="Selecione termos opcionais. Os resultados podem ou não conter esses termos"
          placeholder="Digite o termo..."
          onChange={(x) => setIncludeList(x)}
        />
        <Select
          icon={<MdOutlineDoDisturb />}
          title="Excluir"
          description="Selecione termos para excluir. Só aparecerão resultados que não contêm nenhum desses termos"
          placeholder="Digite o termo..."
          onChange={(x) => setExcludeList(x)}
        />
      </TermsContext>
      <div className="h-8" />
      <Button icon={<FaSearch />} text="Buscar" type="submit" />
    </form>
  );
};

export default Form;
