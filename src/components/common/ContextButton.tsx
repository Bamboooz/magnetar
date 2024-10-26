import React from "react";
import { cn } from "../../utils/cn";

interface ContextButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  className: string;
}

const ContextButton: React.FC<ContextButtonProps> = ({
  title,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-4 py-3 text-md",
        className
      )}
    >
      {icon}
      <p className="whitespace-nowrap">{title}</p>
    </button>
  );
};

export default ContextButton;
