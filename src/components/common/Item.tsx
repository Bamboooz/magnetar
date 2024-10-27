import React from "react";
import { cn } from "../../utils/cn";

interface ItemProps {
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({
  onClick,
  onContextMenu,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
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
