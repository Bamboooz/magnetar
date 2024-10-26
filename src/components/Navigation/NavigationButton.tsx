import React from "react";
import { cn } from "../../utils/cn";
import { Page } from "../../enums/page";

interface NavigationButtonProps {
  id: Page;
  label: string;
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
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
