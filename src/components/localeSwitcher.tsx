/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "@/i18n/navigation";
import { Locale, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Select from "react-select";
import { useTheme } from "next-themes";

interface Option {
  value: string;
  label: string;
}

const LocaleSwitcher = () => {
  const { theme } = useTheme();

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "var(--color-background)",
      border: "none",
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
  };

  const router = useRouter();
  const locale = useLocale();

  const options: Option[] = routing.locales.map((locale) => ({
    value: locale,
    label: locale.toUpperCase(),
  }));

  const handleChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      const newLocale = selectedOption.value as Locale;
      router.replace("/", { locale: newLocale });
    }
  };

  return (
    <Select
      className="border-none"
      options={options}
      defaultValue={options.find((opt) => opt.value === locale)}
      onChange={handleChange}
      isSearchable={false}
      styles={customStyles}
    />
  );
};

export default LocaleSwitcher;
