import type { JSX } from "preact";

type ProgressBarProps = Readonly<{
  title: string;
  currentItemCount: number;
  totalItemCount: number;
}>;

export function ProgressBar({ title, currentItemCount, totalItemCount }: ProgressBarProps): JSX.Element {
  const p = Math.max(0, Math.min(100, (currentItemCount / Math.max(totalItemCount, 1)) * 100));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-slate-700 font-medium">{title}</span>
        <span className="text-slate-500 font-semibold">{currentItemCount}/{totalItemCount}</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden" role="progressbar">
        <div
          className="h-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${p}%` }}
        />
      </div>
    </div>
  );
}