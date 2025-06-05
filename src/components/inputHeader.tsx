import React, { ReactNode } from "react";

interface InputHeaderProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const InputHeader: React.FC<InputHeaderProps> = ({
  title,
  icon,
  description,
}) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-lg font-medium">{title}</p>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default InputHeader;
