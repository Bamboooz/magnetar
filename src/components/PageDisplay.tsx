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
        page === id
          ? "w-full h-full flex flex-col justify-start items-start overflow-auto pb-3"
          : "hidden"
      )}
    >
      {children}
    </div>
  );
};

export default PageDisplay;
