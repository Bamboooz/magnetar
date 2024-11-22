import React, { useState } from "react";
import { LuChevronRight } from "react-icons/lu";

interface ExpanderProps {
  label: string;
  children?: React.ReactNode;
}

export default function Expander({ label, children }: ExpanderProps) {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-1">
      <button
        onClick={() => setOpened(!opened)}
        className="w-full h-8 flex items-center justify-start text-foreground-secondary text-lg gap-2 px-6"
      >
        <LuChevronRight className={opened ? "rotate-90" : ""} />
        <p>{label}</p>
      </button>

      {opened && <div className="w-full flex flex-col mb-4">{children}</div>}
    </div>
  );
}
