import type { JSX } from "preact";
import { MilestoneStatus } from "../types";

type MilestoneStatusIconProps = Readonly<{
  status: MilestoneStatus;
  className?: string;
}>;

export function MilestoneStatusIcon({ status, className = "" }: MilestoneStatusIconProps): JSX.Element {
  const getIconContent = () => {
    switch (status) {
      case MilestoneStatus.COMPLETED:
        return {
          icon: "✓",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          ariaLabel: "Completed milestone"
        };
      case MilestoneStatus.IN_PROGRESS:
        return {
          icon: "🔖",
          bgColor: "bg-slate-100",
          textColor: "text-slate-600",
          ariaLabel: "In progress milestone"
        };
      case MilestoneStatus.NOT_STARTED:
        return {
          icon: "🕐",
          bgColor: "bg-slate-50",
          textColor: "text-slate-500",
          ariaLabel: "Not started milestone"
        };
      default:
        return {
          icon: "🕐",
          bgColor: "bg-slate-50",
          textColor: "text-slate-500",
          ariaLabel: "Unknown milestone status"
        };
    }
  };

  const { icon, bgColor, textColor, ariaLabel } = getIconContent();

  return (
    <div
      className={`w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full flex items-center justify-center ${bgColor} ${textColor} ${className}`}
      aria-label={ariaLabel}
      role="img"
      title={ariaLabel}
    >
      <span 
        className="text-sm font-medium select-none"
        aria-hidden="true"
      >
        {icon}
      </span>
    </div>
  );
}