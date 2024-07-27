import React from "react";

import { cn } from "../utils/cn";

interface ItemProps {
  label: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ label, onClick, className, children }) => {
  return (
    <button
      title={label}
      onClick={onClick}
      className={cn(
        "group w-full h-14 flex items-center relative shrink-0 px-6 hover:bg-secondary",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Item;
