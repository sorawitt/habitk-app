import type { JSX } from "preact";

export function TabBar(): JSX.Element {
  return (
    <div className="sticky bottom-0">
      <div className="flex gap-2 border-t border-slate-200 bg-white px-4 pb-3 pt-2">
        <a className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-primary-600 py-2" href="#">
          <span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>
          <p className="text-xs font-bold leading-normal">Today</p>
        </a>
        <a className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 py-2" href="#">
          <span className="material-symbols-outlined" aria-hidden="true">bar_chart</span>
          <p className="text-xs font-medium leading-normal">Stats</p>
        </a>
        <a className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 py-2" href="#">
          <span className="material-symbols-outlined" aria-hidden="true">history</span>
          <p className="text-xs font-medium leading-normal">History</p>
        </a>
        <a className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 py-2" href="#">
          <span className="material-symbols-outlined" aria-hidden="true">settings</span>
          <p className="text-xs font-medium leading-normal">Settings</p>
        </a>
      </div>
    </div>
  );
}