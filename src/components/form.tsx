"use client";

import TermsContext from "@/contexts/termsContext";
import Select from "./select";
import { useEffect, useState } from "react";

const Form = () => {
  const [terms, setTerms] = useState<string[]>([]);

  // Fetches the terms
  useEffect(() => {
    fetch("/terms.json")
      .then((res) => res.json())
      .then((data) => setTerms(data));
  }, []);

  return (
    <div>
      <TermsContext value={terms}>
        <Select />
      </TermsContext>
    </div>
  );
};

export default Form;
