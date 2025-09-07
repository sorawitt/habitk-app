# agent.md — Preact + TypeScript + Tailwind + Vite (Final, Pragmatic)

## 🎯 Objective
- โค้ดอ่านง่าย ดูแลง่าย สเกลง่าย
- TypeScript strict พอเหมาะ ใช้ IDE/AI review ได้เต็มที่
- Tailwind utility-first จริง ใช้ CSS แยกเฉพาะจำเป็น
- มีกติกาชัดเจน กระชับ ครอบคลุม โดยไม่ over-engineer

---

## 📂 Folder Structure
```
src/
├─ app/                  # App shell, providers, router
├─ pages/                # Route-level composers
│  └─ Home/
│     ├─ HomePage.tsx
│     └─ index.ts
├─ features/             # domain/use-case (self-contained)
│  └─ overview/
│     ├─ components/
│     │  ├─ HeaderGoal.tsx
│     │  ├─ ProgressBar.tsx
│     │  └─ index.ts
│     ├─ types.ts
│     └─ index.ts
├─ components/           # shared UI primitives
│  └─ layout/
│     ├─ NavigationBar.tsx
│     ├─ TabBar.tsx
│     └─ index.ts
├─ lib/                  # utils/helpers
├─ styles/               # tailwind.css, globals.css
├─ assets/               # images/icons
└─ main.tsx
```

**Rules**
- `pages/` = compose หน้า + layout
- `features/` = domain logic + UI self-contained
- `components/` = shared UI
- สร้างโฟลเดอร์ใหม่เมื่อ “จำเป็นจริง”

---

## 🛣️ Path Aliases
**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@pages/*": ["src/pages/*"],
      "@features/*": ["src/features/*"],
      "@components/*": ["src/components/*"],
      "@lib/*": ["src/lib/*"]
    },
    "strict": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true
  }
}
```
**vite.config.ts**
```ts
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@pages": "/src/pages",
      "@features": "/src/features",
      "@components": "/src/components",
      "@lib": "/src/lib"
    }
  }
});
```

---

## 📦 Export / Import
- ใช้ **named export** เป็นมาตรฐาน
- Barrel (`index.ts`) เฉพาะเมื่อมีหลายไฟล์
- `pages/*/index.ts` อนุญาต default export เพื่อ import สั้น

```ts
// features/overview/components/HeaderGoal.tsx
export function HeaderGoal() { ... }

// features/overview/components/index.ts
export { HeaderGoal } from "./HeaderGoal";
export { ProgressBar } from "./ProgressBar";

// pages/Home/HomePage.tsx
export function HomePage() { ... }

// pages/Home/index.ts
export { HomePage } from "./HomePage";
export default HomePage;
```

---

## 🧠 TypeScript & JSX
- `import type { JSX } from "preact";`
- Return type ของ component = `JSX.Element`
- Props ใช้ `Readonly<...>`; optional ใช้ `?`
- JSX ใช้ `className`

```tsx
import type { JSX } from "preact";

type HeaderProps = Readonly<{ title: string; subtitle?: string }>;

export function Header({ title, subtitle }: HeaderProps): JSX.Element {
  return (
    <header>
      <h1 className="text-xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </header>
  );
}
```

---

## 🎨 Tailwind
- Utility-first จริง, CSS แยกเฉพาะพิเศษ
- คลาส order: layout → spacing → typography → color → effects

```tsx
const p = Math.max(0, Math.min(100, (current / Math.max(total, 1)) * 100));
<div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden" role="progressbar">
  <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${p}%` }} />
</div>
```

---

## 📱 Layout
```tsx
<div className="flex flex-col min-h-screen bg-slate-50">
  <NavigationBar title="Home" />
  <main className="flex-1 px-4 py-4 pb-[calc(80px+env(safe-area-inset-bottom))] space-y-6">
    {/* sections */}
  </main>
  <TabBar />
</div>
```

---

## ♿ Accessibility
- Icon-only button ต้องมี `aria-label`
- ใช้ semantic tags (`header`, `main`, `nav`, `section`)
- รูป/ไอคอน → `alt` หรือ `aria-hidden`

---

## 🔧 Tooling
ติดตั้ง:  
```
eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-tailwindcss prettier eslint-config-prettier -D
```
`.eslintrc.cjs`
```js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "jsx-a11y", "tailwindcss"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "tailwindcss/classnames-order": "warn"
  }
};
```
`.prettierrc`
```json
{ "semi": true, "singleQuote": false, "printWidth": 100, "trailingComma": "all" }
```

---

## 🧾 Commits & PR
- ใช้ Conventional Commits (`chore:`, `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `style:`)
- Example:
```
chore: init project with vite + preact + tailwind
feat(overview): add HeaderGoal and ProgressBar
fix(layout): add safe-area bottom padding to TabBar
```

**PR Checklist**
- [ ] โฟลเดอร์ถูกเลเยอร์ (pages/features/components)
- [ ] Named exports + barrel
- [ ] Alias import consistent
- [ ] JSX ใช้ className, import type { JSX }
- [ ] Icon-only มี aria-label
- [ ] ProgressBar clamp 0–100
- [ ] Build & lint ผ่าน

---

## 📚 Learning Log Guideline
> ทุกครั้งที่มีการแก้หรือรีวิวโค้ด ต้องเพิ่ม Learning Log

### Structure
1. **What you wrote** — โค้ด/ไอเดียเดิม  
2. **Issue / Improvement** — ปัญหาหรือสิ่งที่ควรปรับ  
3. **Lesson learned** — บทเรียนสั้น ๆ ที่ควรจำ

### Checklist
- [ ] อย่างน้อย 1 log ต่อการแก้/รีวิว
- [ ] ใช้โครงสร้าง 3 ส่วนนี้
- [ ] เน้น bullet + code snippet สั้น
- [ ] Commit `LEARNING_LOG.md` พร้อมโค้ด

### Template
```md
### Case: <หัวข้อสั้นๆ>

**What you wrote**
```tsx
<โค้ดเดิม>
```

**Issue / Improvement**
- ปัญหาแบบ bullet
- อ้างอิงกฎจาก agent.md เมื่อจำเป็น

**Lesson learned**
- สรุปสั้น ๆ จำง่าย
```

---

## 🤖 AI Reviewer Mode
เมื่อ AI/IDE review หรือแก้โค้ด:
1. ตรวจ rules: exports, alias, JSX, Tailwind, a11y
2. เสนอ Issues → Fixes (with code)
3. อัปเดต `LEARNING_LOG.md` ด้วย Template ด้านบน และ commit พร้อมโค้ด
