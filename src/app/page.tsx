import Form from "@/components/form";
import ThemeToggle from "@/components/themeToggle";
import { FaBriefcase } from "react-icons/fa";

export default async function Home() {
  return (
    <div className="my-12 mx-8 flex flex-col justify-center items-center gap-12">
      <div className="fixed top-0 left-0">
        <ThemeToggle />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-primary">
          <FaBriefcase />
        </div>
        <p className="text-2xl font-medium">Job Searcher for LinkedIn®</p>
      </div>
      <Form />
    </div>
  );
}
