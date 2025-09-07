import type { JSX } from "preact";

import { NavigationBar, TabBar } from "@components/layout";
import { HomePage } from "@pages/Home";

export function App(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <NavigationBar title="Home" enableBack={false} />
      <main className="flex-1 px-4 py-4 pb-[calc(80px+env(safe-area-inset-bottom))] space-y-6">
        <HomePage />
      </main>
      <TabBar />
    </div>
  );
}
