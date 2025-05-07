"use client";

import { useRouter } from "@/i18n/navigation";
import { Locale, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

const LocaleSwitcher = () => {
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
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: "none",
          backgroundColor: "transparent",
        }),
      }}
    />
  );
};

export default LocaleSwitcher;
