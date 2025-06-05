import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface RadioProps {
  options: Option[];
}

const Radio: React.FC<RadioProps> = ({ options }: RadioProps) => {
  const [selected, setSelected] = useState(options[0].value);

  const handleSelect = (opt: Option) => {
    setSelected(opt.value);
  };

  return (
    <div className="flex flex-col gap-4">
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

          <p
            className={`text-lg ${selected === opt.value ? "font-medium" : ""}`}
          >
            {opt.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Radio;
