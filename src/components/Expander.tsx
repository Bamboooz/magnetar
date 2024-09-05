import React, { useState } from "react";
import { LuChevronRight } from "react-icons/lu";

interface ExpanderProps {
  label: string;
  children?: React.ReactNode;
}

const Expander: React.FC<ExpanderProps> = ({ label, children }) => {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-1">
      <button
        onClick={() => setOpened(!opened)}
        className="w-full h-8 flex items-center justify-start text-neutral-400 text-lg gap-2 px-6"
      >
        <LuChevronRight className={opened ? "rotate-90" : ""} />
        <p>{label}</p>
      </button>

      {opened && <div className="w-full flex flex-col mb-4">{children}</div>}
    </div>
  );
};

export default Expander;
