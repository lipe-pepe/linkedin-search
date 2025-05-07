"use client";

import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon: ReactNode;
  type: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, icon, type }: ButtonProps) => {
  return (
    <button type={type}>
      <div className="cursor-pointer flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-lg hover:bg-blue-dark">
        {icon}
        <p className="font-medium">{text}</p>
      </div>
    </button>
  );
};

export default Button;
