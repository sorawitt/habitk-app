import type { JSX } from "preact";

import { HeaderGoalView, ProgressBar } from "@features/goal-overview";

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
