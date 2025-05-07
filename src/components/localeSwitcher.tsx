"use client";

import { useRouter } from "@/i18n/navigation";
import { Locale, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { ChangeEvent } from "react";

const LocaleSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;
    router.replace("/", { locale: newLocale });
  };

  return (
    <select
      className="inline-flex uppercase text-neutral"
      defaultValue={locale}
      // disabled={isPending}
      onChange={onSelectChange}
    >
      {routing.locales.map((locale) => (
        <option key={`${locale}`}>{locale}</option>
      ))}
    </select>
  );
};

export default LocaleSwitcher;
