import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface AccordionProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  icon,
  title,
  children,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      if (isOpen) {
        const scrollHeight = contentEl.scrollHeight;
        setHeight(`${scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen, children]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-[var(--color-neutral)] cursor-pointer hover:font-medium"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <FaChevronDown
          className={`w-3 h-3 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className="my-2"
        ref={contentRef}
        style={{
          height,
          transition: "height 0.4s ease",
          overflow: "hidden",
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
