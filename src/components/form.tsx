"use client";

import TermsContext from "@/contexts/termsContext";
import Select from "./select";
import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  MdOutlineAddCircleOutline,
  MdOutlineCheckBox,
  MdOutlineDoDisturb,
} from "react-icons/md";
import { generateSearchString } from "@/utils/generateSearchString";
import Button from "./button";
import { useLocale, useTranslations } from "next-intl";

const Form = () => {
  const t = useTranslations("Form");
  const locale = useLocale();

  const [terms, setTerms] = useState<string[]>([]);

  const [mandatoryList, setMandatoryList] = useState<string[]>([]);
  const [includeList, setIncludeList] = useState<string[]>([]);
  const [excludeList, setExcludeList] = useState<string[]>([]);

  // Fetches the terms
  useEffect(() => {
    fetch(`/terms/${locale}.json`)
      .then((res) => res.json())
      .then((data) => setTerms(data));
  }, [locale]);

  const handleMandatoryChange = useCallback((val: string[]) => {
    setMandatoryList(val);
  }, []);

  const handleIncludeChange = useCallback((val: string[]) => {
    setIncludeList(val);
  }, []);

  const handleExcludeChange = useCallback((val: string[]) => {
    setExcludeList(val);
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
    <form
      className="flex flex-col w-full items-center gap-2"
      onSubmit={handleSubmit}
    >
      <TermsContext value={terms}>
        <Select
          icon={<MdOutlineCheckBox />}
          title={t("mandatory.title")}
          description={t("mandatory.description")}
          placeholder={t("mandatory.placeholder")}
          onChange={handleMandatoryChange}
        />
        <Select
          icon={<MdOutlineAddCircleOutline />}
          title={t("include.title")}
          description={t("include.description")}
          placeholder={t("include.placeholder")}
          onChange={handleIncludeChange}
        />
        <Select
          icon={<MdOutlineDoDisturb />}
          title={t("exclude.title")}
          description={t("exclude.description")}
          placeholder={t("exclude.placeholder")}
          onChange={handleExcludeChange}
        />
      </TermsContext>
      <div className="h-8" />
      <Button icon={<FaSearch />} text={t("button")} type="submit" />
    </form>
  );
};

export default Form;
