import Form from "@/components/form";
import { FaBriefcase } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <div className="mt-2 mx-6 flex flex-col justify-center items-center gap-12">
      <Header />
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-primary">
          <FaBriefcase />
        </div>
        <p className="text-2xl font-medium">{t("title")}</p>
      </div>
      <p>{t("about")}</p>
      <Form />
    </div>
  );
}
