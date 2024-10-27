import React from "react";
import { Page } from "../enums/page";
import { cn } from "../utils/cn";

interface PageDisplayProps {
  id: Page;
  page: Page;
  className?: string;
  children?: React.ReactNode;
}

const PageDisplay: React.FC<PageDisplayProps> = ({
  id,
  page,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        className,
        page === id ? "size-full flex flex-col overflow-auto" : "hidden"
      )}
    >
      {children}
    </div>
  );
};

export default PageDisplay;
