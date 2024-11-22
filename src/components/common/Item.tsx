import React from "react";
import { cn } from "../../utils";

interface ItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

export default function Item({
  icon,
  title,
  description,
  onClick,
  onContextMenu,
  children,
}: ItemProps) {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(
        "w-full h-14 flex justify-between items-center px-6 gap-6",
        onClick != null ? "hover:bg-background-secondary" : "cursor-default"
      )}
    >
      <div className="w-full flex items-center gap-6  text-3xl overflow-hidden">
        {icon}

        <div className="w-full flex flex-col items-start overflow-hidden">
          <p className="text-md truncate max-w-full">{title}</p>
          <p className="text-sm text-foreground-secondary truncate max-w-full">
            {description}
          </p>
        </div>
      </div>

      {children}
    </button>
  );
}
