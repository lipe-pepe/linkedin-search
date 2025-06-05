"use client";

import TermsContext from "@/contexts/termsContext";
import Select from "./select";
import { useCallback, useEffect, useState } from "react";
import { FaLightbulb, FaSearch } from "react-icons/fa";
import {
  MdOutlineAddCircleOutline,
  MdOutlineCheckBox,
  MdOutlineDoDisturb,
} from "react-icons/md";
import { generateSearchString } from "@/utils/generateSearchString";
import Button from "./button";
import { useLocale, useTranslations } from "next-intl";
import Radio from "./radio";
import Accordion from "./accordion";

const Form = () => {
  const t = useTranslations("Form");

  const pageOptions = [
    { label: t("page.option1"), value: "jobs" },
    { label: t("page.option2"), value: "posts" },
  ];

  const locale = useLocale();

  const [terms, setTerms] = useState<string[]>([]);

  const [page, setPage] = useState<string>(pageOptions[0].value);
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

  const handlePageChange = useCallback((val: string) => {
    setPage(val);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o reload da página

    localStorage.setItem("mandatory-list", JSON.stringify(mandatoryList));
    localStorage.setItem("include-list", JSON.stringify(includeList));
    localStorage.setItem("exclude-list", JSON.stringify(excludeList));

    const searchString = generateSearchString(
      mandatoryList,
      includeList,
      excludeList
    );

    // Abre nova aba com a URL
    if (page === "jobs") {
      window.open(
        `https://www.linkedin.com/jobs/search/?keywords=${searchString}`,
        "_blank"
      );
    } else if (page === "posts") {
      window.open(
        `https://www.linkedin.com/search/results/content/?keywords=${searchString}`,
        "_blank"
      );
    }
  };

  return (
    <form
      className="flex flex-col w-full items-center gap-2"
      onSubmit={handleSubmit}
    >
      <div className="w-full mb-6">
        <Radio
          icon={<FaSearch />}
          title={t("page.title")}
          description={t("page.description")}
          options={pageOptions}
          defaultOption={pageOptions[0]}
          onChange={handlePageChange}
        />
      </div>
      <TermsContext value={terms}>
        <Select
          icon={<MdOutlineCheckBox />}
          title={t("mandatory.title")}
          description={t("mandatory.description")}
          placeholder={t("mandatory.placeholder")}
          onChange={handleMandatoryChange}
          storageItem="mandatory-list"
        />
        <Select
          icon={<MdOutlineAddCircleOutline />}
          title={t("include.title")}
          description={t("include.description")}
          placeholder={t("include.placeholder")}
          onChange={handleIncludeChange}
          storageItem="include-list"
        />
        <Select
          icon={<MdOutlineDoDisturb />}
          title={t("exclude.title")}
          description={t("exclude.description")}
          placeholder={t("exclude.placeholder")}
          onChange={handleExcludeChange}
          storageItem="exclude-list"
        />
      </TermsContext>
      <div className="my-4">
        <Accordion icon={<FaLightbulb />} title={t("tip_title")}>
          <p className=" text-[var(--color-neutral)] ">{t("tip_text")}</p>
        </Accordion>
      </div>
      <Button icon={<FaSearch />} text={t("button")} type="submit" />
    </form>
  );
};

export default Form;
