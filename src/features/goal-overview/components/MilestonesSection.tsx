import type { JSX } from "preact";
import type { Milestone } from "../types";
import { MilestoneCard } from "./MilestoneCard";
import { AddMilestoneButton } from "./AddMilestoneButton";

type MilestonesSectionProps = Readonly<{
  milestones: Milestone[];
  onAddNew?: () => void;
}>;

export function MilestonesSection({ milestones, onAddNew }: MilestonesSectionProps): JSX.Element {
  return (
    <section className="w-full" aria-labelledby="milestones-heading">
      {/* Header with title and Add New button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
        <h2 
          id="milestones-heading"
          className="text-lg font-semibold text-slate-900 order-1 sm:order-none"
        >
          Milestones
        </h2>
        <div className="order-2 sm:order-none">
          <AddMilestoneButton onClick={onAddNew} />
        </div>
      </div>

      {/* Milestones list */}
      <div 
        className="space-y-3"
        role="list"
        aria-label={`${milestones.length} milestone${milestones.length !== 1 ? 's' : ''}`}
      >
        {milestones.length > 0 ? (
          milestones.map((milestone, index) => (
            <div key={milestone.id} role="listitem">
              <MilestoneCard
                milestone={milestone}
                aria-posinset={index + 1}
                aria-setsize={milestones.length}
              />
            </div>
          ))
        ) : (
          <div 
            className="text-center py-8 px-4 text-slate-500"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm">No milestones yet</p>
            <p className="text-xs mt-1">Click "Add New" to create your first milestone</p>
          </div>
        )}
      </div>
    </section>
  );
}