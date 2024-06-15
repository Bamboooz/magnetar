import React from "react";

import { cn } from "../../utils/cn";

interface ItemProps {
    title: string;
    onClick: () => void;
    className?: string;
    onContextMenu?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ title, onClick, className, onContextMenu, children }) => {
    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (onContextMenu) {
            onContextMenu(e);
        }
    };

    return (
        <>
            <button title={title} onClick={onClick} onContextMenu={handleContextMenu} className={cn("group w-full flex items-center relative shrink-0 pl-6 pr-5 py-1 hover:bg-item-hover", className)}>
                {children}
            </button>
        </>
    );
};

export default Item;
