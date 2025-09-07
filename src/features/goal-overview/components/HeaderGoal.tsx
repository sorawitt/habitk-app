import type { JSX } from "preact";

type HeaderGoalViewProps = Readonly<{
  title: string;
  subtitle: string;
}>;

export function HeaderGoalView({ title, subtitle }: HeaderGoalViewProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold leading-tight mb-2">{title}</h1>
      <p className="text-sm text-slate-500 leading-snug">{subtitle}</p>
    </div>
  );
}