import React from "react";
import { PageType } from "../../types";
import { cn } from "../../utils/cn";

interface PageProps {
  id: PageType;
  page: PageType;
  className?: string;
  children?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ id, page, className, children }) => {
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

export default Page;
