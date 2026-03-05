type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
        ${checked ? "bg-primary-100" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
