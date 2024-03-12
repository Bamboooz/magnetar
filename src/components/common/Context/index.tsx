import React, { useRef, useState, useEffect } from "react";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { cn } from "../../../utils/tw";

interface ContextProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    className: string;
    children?: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ x, y, closeContextMenu, className, children }) => {
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: y, left: x });

    useOnClickOutside(contextMenuRef, closeContextMenu);

    useEffect(() => {
        // FIXME: sometimes randomly going up when its not meant to
        const updatePosition = () => {
            if (contextMenuRef.current) {
                const rect = contextMenuRef.current.getBoundingClientRect();
                const { innerWidth, innerHeight } = window;
    
                const spaceAbove = y;
                const spaceBelow = innerHeight - y;
                const spaceLeft = x;
                const spaceRight = innerWidth - x;
                
                const newTop = spaceAbove > spaceBelow ? Math.max(0, y - rect.height) : y;
                const newLeft = spaceLeft > spaceRight ? Math.max(0, x - rect.width) : x;
    
                setPosition({ top: newTop, left: newLeft });
            }
        };
    
        updatePosition();
    }, [x, y]);

    return (
        <>
            <div ref={contextMenuRef} className={cn("fixed z-30", className)} style={position}>
                {children}
            </div>
        </>
    );
};

export default Context;
