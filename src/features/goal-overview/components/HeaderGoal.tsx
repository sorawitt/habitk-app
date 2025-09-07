import type { JSX } from 'preact';

interface HeaderGoalViewProps {
    title: string
    subtitle: string
}

export function HeaderGoalView({ title, subtitle }: HeaderGoalViewProps): JSX.Element {
    return (
        <div class="flex flex-col">
            <h1 class="text-xl font-bold leading-tight mb-2">{title}</h1>
            <p class="text-sm text-slate-500 leading-snug">{subtitle}</p>
        </div>
    )
}