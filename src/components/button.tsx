"use client";

import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon: ReactNode;
  type: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, icon, type }: ButtonProps) => {
  return (
    <button className="w-full max-w-64" type={type}>
      <div className="cursor-pointer flex justify-center items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-3 rounded-full text-lg">
        {icon}
        <p className="font-medium">{text}</p>
      </div>
    </button>
  );
};

export default Button;
