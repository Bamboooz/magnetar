import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { cn } from "../../utils";

interface ContextProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
  children?: React.ReactNode;
}

export default function Context({
  x,
  y,
  closeContextMenu,
  children,
}: ContextProps) {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  const fit = (x: number, y: number) => {
    if (contextMenuRef.current) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = contextMenuRef.current;

      x = Math.min(x, innerWidth - offsetWidth);
      y = Math.min(y, innerHeight - offsetHeight);
    }

    return { x, y };
  };

  useOnClickOutside(contextMenuRef, closeContextMenu);

  useEffect(() => setPosition(fit(position.x, position.y)), [x, y]);

  useEffect(() => {
    const handleCloseMenu = () => closeContextMenu();

    window.addEventListener("scroll", handleCloseMenu, true);
    window.addEventListener("click", handleCloseMenu);
    window.addEventListener("blur", handleCloseMenu);

    return () => {
      window.removeEventListener("scroll", handleCloseMenu, true);
      window.removeEventListener("click", handleCloseMenu);
      window.removeEventListener("blur", handleCloseMenu);
    };
  }, [closeContextMenu]);

  return (
    <div
      ref={contextMenuRef}
      className={cn(
        "flex flex-col fixed z-50 bg-background p-1 border border-background-tertiary"
      )}
      style={{ top: position.y, left: position.x }}
    >
      {children}
    </div>
  );
}
