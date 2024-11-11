import React from "react";
import { PageType } from "../../types";
import { cn } from "../../utils/cn";

interface PageProps {
  target: PageType;
  current: PageType;
  className?: string;
  children?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({
  target,
  current,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        className,
        current === target ? "size-full flex flex-col overflow-auto" : "hidden"
      )}
    >
      {children}
    </div>
  );
};

export default Page;
