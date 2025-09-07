import type { JSX } from 'preact'

interface ProgressBarProps {
    title: string
    currentItemCount: number
    totalItemCount: number
}

export function ProgressBar({ title, currentItemCount, totalItemCount }: ProgressBarProps): JSX.Element {
    const percent = Math.min(100, (currentItemCount / totalItemCount) * 100);
    return (
        <>
            <div class="flex items-center justify-between mt-6">
                <span class="text-slate-700 font-medium">{title}</span>
                <span class="text-slate-500 font-semibold">{currentItemCount}/{totalItemCount}</span>
            </div>
            <div class="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-2">
                <div
                    class="h-full bg-indigo-500"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </>
    )
}