import type { JSX } from "preact";
import type { Milestone } from "../types";
import { MilestoneStatus } from "../types";
import { MilestoneStatusIcon } from "./MilestoneStatusIcon";

type MilestoneCardProps = Readonly<{
  milestone: Milestone;
  onClick?: (milestone: Milestone) => void;
  "aria-posinset"?: number;
  "aria-setsize"?: number;
}>;

export function MilestoneCard({ 
  milestone, 
  onClick, 
  "aria-posinset": ariaPosinset,
  "aria-setsize": ariaSetsize 
}: MilestoneCardProps): JSX.Element {
  const getStatusText = (status: MilestoneStatus): string => {
    switch (status) {
      case MilestoneStatus.COMPLETED:
        return "Completed";
      case MilestoneStatus.IN_PROGRESS:
        return "In Progress";
      case MilestoneStatus.NOT_STARTED:
        return "Not Started";
      default:
        return "Unknown";
    }
  };

  const getStatusTextColor = (status: MilestoneStatus): string => {
    switch (status) {
      case MilestoneStatus.COMPLETED:
        return "text-green-600";
      case MilestoneStatus.IN_PROGRESS:
        return "text-slate-600";
      case MilestoneStatus.NOT_STARTED:
        return "text-slate-500";
      default:
        return "text-slate-500";
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(milestone);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(milestone);
    }
  };

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 ${
        onClick ? "cursor-pointer hover:shadow-md hover:border-slate-300 focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2" : ""
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : "article"}
      aria-label={onClick ? `View milestone: ${milestone.title}, status: ${getStatusText(milestone.status)}` : `Milestone: ${milestone.title}, status: ${getStatusText(milestone.status)}`}
      aria-posinset={ariaPosinset}
      aria-setsize={ariaSetsize}
    >
      <div className="flex items-start sm:items-center gap-3">
        <div className="flex-shrink-0 mt-0.5 sm:mt-0">
          <MilestoneStatusIcon status={milestone.status} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-900 break-words sm:truncate">
            {milestone.title}
          </h3>
          <p 
            className={`text-xs font-medium mt-1 ${getStatusTextColor(milestone.status)}`}
            aria-label={`Status: ${getStatusText(milestone.status)}`}
          >
            {getStatusText(milestone.status)}
          </p>
        </div>
      </div>
    </div>
  );
}