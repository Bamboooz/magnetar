import React from "react";
import { cn } from "../../util";
import { PageType } from "../../types";

interface NavigationButtonProps {
  id: PageType;
  label: string;
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

export default function NavigationButton({
  id,
  label,
  page,
  setPage,
}: NavigationButtonProps) {
  return (
    <button
      onClick={() => setPage(id)}
      className="flex flex-col gap-1 px-3 py-1"
    >
      <p
        className={cn(
          "text-lg",
          page === id ? "text-foreground" : "text-foreground-secondary"
        )}
      >
        {label}
      </p>
      <div
        className={cn("w-full h-1 rounded-full", page === id && "bg-accent")}
      />
    </button>
  );
}
