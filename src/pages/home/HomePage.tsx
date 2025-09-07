import { h } from "preact";
import type { JSX } from "preact";

// ไม่มี alias:
// import { HeaderGoal, ProgressBar } from "../../features/goal-overview";
import { HeaderGoalView, ProgressBar } from "../../features/goal-overview";

// มี alias:
// import { HeaderGoal, ProgressBar } from "@features/goal-overview";

export function HomePage(): JSX.Element {
    return (
        <>
            <HeaderGoalView
                title="Read 10 books this year"
                subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
            />
            <ProgressBar title="Books Read" currentItemCount={2} totalItemCount={10} />
        </>
    );
}
