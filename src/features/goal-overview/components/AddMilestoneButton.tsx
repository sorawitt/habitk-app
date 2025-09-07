import type { JSX } from "preact";

type AddMilestoneButtonProps = Readonly<{
  onClick?: () => void;
}>;

export function AddMilestoneButton({ onClick }: AddMilestoneButtonProps): JSX.Element {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 active:bg-slate-100 transition-all duration-200 touch-manipulation"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Add new milestone"
      aria-describedby="add-milestone-description"
    >
      <span 
        className="w-4 h-4 flex items-center justify-center text-slate-500"
        aria-hidden="true"
      >
        +
      </span>
      <span>Add New</span>
      <span id="add-milestone-description" className="sr-only">
        Create a new milestone to track your progress
      </span>
    </button>
  );
}