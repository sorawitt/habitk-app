import type { JSX } from "preact";

import { NavigationBar, TabBar } from "../components/layout";
import HomePage from "../pages/home";


export function App(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <NavigationBar title="Home" enableBack={false} />
      <main className="flex-1 p-6 space-y-6">
        <HomePage />
      </main>
      <TabBar />
    </div>
  );
}
