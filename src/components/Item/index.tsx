import React from "react";

interface ItemProps {
    title: string;
    onClick: () => void;
    onContextMenu?: () => void;
    children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ title, onClick, onContextMenu, children }) => {
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();

        if (onContextMenu) {
            onContextMenu();
        }
    };

    return (
        <>
            <button title={title} onClick={onClick} onContextMenu={handleContextMenu} className="w-full h-12 flex shrink-0 pl-6 pr-5 items-center justify-between hover:bg-item-hover">
                {children}
            </button>
        </>
    );
};

export default Item;
