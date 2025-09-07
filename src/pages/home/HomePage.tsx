import type { JSX } from "preact";

import { HeaderGoalView, ProgressBar, MilestonesSection, mockMilestones } from "@features/goal-overview";

export function HomePage(): JSX.Element {
    const handleAddMilestone = () => {
        console.log("Add new milestone clicked");
    };

    return (
        <div className="space-y-6">
            <HeaderGoalView
                title="Read 10 books this year"
                subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
            />
            <ProgressBar title="Books Read" currentItemCount={2} totalItemCount={10} />
            <MilestonesSection 
                milestones={mockMilestones}
                onAddNew={handleAddMilestone}
            />
        </div>
    );
}
