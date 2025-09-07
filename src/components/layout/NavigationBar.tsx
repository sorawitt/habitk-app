import type { JSX } from 'preact'

interface NavigationBarProps {
    title: string
    enableBack: boolean
}

export function NavigationBar({ title, enableBack }: NavigationBarProps): JSX.Element {
    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="mx-auto max-w-md px-4 h-14 flex items-center justify-between">
                {enableBack ? (
                    <button aria-label="Go back" className="text-slate-700">←</button>
                ) : (
                    <div />
                )}
                <div className="font-semibold">{title}</div>
                <button className="text-slate-700">⋯</button>
            </div>
        </div>
    );
}