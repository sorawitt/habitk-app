import type { JSX } from "preact";

export function TabBar(): JSX.Element {
    return (
        <div class="sticky bottom-0">
            <div class="flex gap-2 border-t border-slate-200 bg-white px-4 pb-3 pt-2">
                <a class="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-primary-600 py-2" href="#">
                    <span class="material-symbols-outlined">calendar_today</span>
                    <p class="text-xs font-bold leading-normal">Today</p>
                </a>
                <a class="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 py-2" href="#">
                    <span class="material-symbols-outlined">bar_chart</span>
                    <p class="text-xs font-medium leading-normal">Stats</p>
                </a>
                <a class="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 py-2" href="#">
                    <span class="material-symbols-outlined">history</span>
                    <p class="text-xs font-medium leading-normal">History</p>
                </a>
                <a class="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 py-2" href="#">
                    <span class="material-symbols-outlined">settings</span>
                    <p class="text-xs font-medium leading-normal">Settings</p>
                </a>
            </div>
        </div>
    )
}