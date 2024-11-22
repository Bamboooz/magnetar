interface ContextButtonProps {
  label: string;
  onClick: () => void;
}

export default function ContextButton({ label, onClick }: ContextButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-8 flex items-center px-4 rounded-md hover:bg-background-secondary"
    >
      <p className="text-foreground-secondary text-md truncate">{label}</p>
    </button>
  );
}
