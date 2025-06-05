import { ReactNode, useState } from "react";
import InputHeader from "./inputHeader";

interface Option {
  label: string;
  value: string;
}

interface RadioProps {
  icon: ReactNode;
  title: string;
  description: string;
  options: Option[];
  defaultOption: Option;
  onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  icon,
  title,
  description,
  options,
  onChange,
}: RadioProps) => {
  const [selected, setSelected] = useState(options[0].value);

  const handleSelect = (opt: Option) => {
    setSelected(opt.value);
    onChange(opt.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <InputHeader icon={icon} title={title} description={description} />
      {options.map((opt, index) => (
        <div key={`radio option ${index}`} className="flex items-center gap-3">
          <span
            className={`w-4 h-4 rounded-full relative   ${
              selected === opt.value
                ? "border-6 border-[var(--color-primary)]"
                : "border-2 border-[var(--color-neutral)] cursor-pointer"
            }`}
            onClick={() => {
              handleSelect(opt);
            }}
          />

          <p className={`${selected === opt.value ? "font-medium" : ""}`}>
            {opt.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Radio;
