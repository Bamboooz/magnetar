import React from "react";

interface HeaderButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center justify-center text-xl text-neutral-400 hover:text-neutral-300"
    >
      {icon}
    </button>
  );
};

export default HeaderButton;
