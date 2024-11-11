import React from "react";

interface ContextButtonProps {
  label: string;
  onClick: () => void;
}

const ContextButton: React.FC<ContextButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-8 flex items-center px-4 rounded-md hover:bg-secondary"
    >
      <p className="text-neutral-400 text-md whitespace-nowrap">{label}</p>
    </button>
  );
};

export default ContextButton;
