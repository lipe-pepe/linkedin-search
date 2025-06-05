import Form from "@/components/form";
import { FaBriefcase } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Link from "next/link";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl px-6 sm:px-8 lg:px-12 pt-4">
        <Header />
      </div>
      <div className="flex-1 w-full max-w-3xl px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center gap-12">
        <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
          <div className="text-primary">
            <FaBriefcase />
          </div>
          <p className="text-2xl font-medium">{t("title")}</p>
        </div>
        <p>{t("about")}</p>
        <Form />
      </div>
      <footer className="w-full max-w-3xl px-4 sm:px-6 lg:px-12 py-4 text-center text-sm text-[var(--color-neutral)]">
        {t("developed")}{" "}
        <Link
          className="underline "
          target="_blank"
          href={"https://felipepepe.dev"}
        >
          Felipe Pêpe
        </Link>
      </footer>
    </main>
  );
}
