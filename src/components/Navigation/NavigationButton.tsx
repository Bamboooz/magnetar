import React from "react";
import { cn } from "../../utils/cn";
import { PageType } from "../../types";

interface NavigationButtonProps {
  id: PageType;
  label: string;
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  id,
  label,
  page,
  setPage,
}) => {
  return (
    <button
      onClick={() => setPage(id)}
      className="flex flex-col items-center justify-center gap-1"
    >
      {label}
      <div
        className={cn(
          "w-full h-1 rounded-full",
          page === id ? "bg-accent" : "bg-transparent"
        )}
      />
    </button>
  );
};

export default NavigationButton;
