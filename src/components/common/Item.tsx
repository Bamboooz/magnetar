import React from "react";

interface ItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({
  icon,
  title,
  description,
  onClick,
  onContextMenu,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className="w-full h-14 flex justify-between items-center px-6 hover:bg-secondary"
    >
      <div className="w-[80%] flex items-center gap-6 text-neutral-300 text-3xl">
        <div className="shrink-0">{icon}</div>

        <div className="flex flex-col items-start truncate">
          <p className="text-md">{title}</p>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>

      {children}
    </button>
  );
};

export default Item;
