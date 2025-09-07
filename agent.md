# agent.md — Preact + TypeScript + Tailwind + Vite Standards (v2.0)

> **Battle-tested coding standards** for scalable, maintainable, and accessible web applications

## 🎯 Core Philosophy

### Development Principles
- **Developer Experience First**: โค้ดที่ AI/IDE ช่วยได้เต็มที่ ลด cognitive load
- **Type Safety Without Overhead**: TypeScript strict แต่ไม่ซับซ้อนเกินไป
- **Performance by Design**: Bundle size, runtime performance, และ UX เป็นหนึ่งเดียว
- **Accessibility is Non-Negotiable**: A11y ไม่ใช่ afterthought แต่เป็น first-class citizen
- **Mobile-First Reality**: ออกแบบสำหรับ mobile แล้วขยายไป desktop
- **Maintainability Over Cleverness**: โค้ดที่อ่านง่ายชนะโค้ดที่ฉลาด

### Quality Gates
- **Zero Runtime Errors**: Handle edge cases, null checks, type safety
- **100% Accessibility**: WCAG 2.1 AA compliance minimum
- **Performance Budget**: < 100kb initial bundle, < 3s LCP
- **Code Consistency**: Automated formatting, linting, type checking
- **Documentation**: Self-documenting code + Learning Log

---

## 📂 Architecture & Folder Structure

### Layered Architecture
```
src/
├─ app/                     # 🏗️ Application Shell
│  ├─ App.tsx              # Root component with providers
│  ├─ router.tsx           # Route definitions
│  └─ providers/           # Context providers, error boundaries
├─ pages/                   # 📄 Route-Level Composers
│  └─ Home/
│     ├─ HomePage.tsx      # Page component (composition only)
│     ├─ HomePage.test.tsx # Page-level tests
│     └─ index.ts          # Barrel export
├─ features/                # 🎯 Domain-Driven Features
│  └─ goal-tracking/
│     ├─ components/       # Feature-specific UI
│     ├─ hooks/           # Feature-specific logic
│     ├─ services/        # API calls, business logic
│     ├─ types.ts         # Domain types
│     ├─ constants.ts     # Feature constants
│     └─ index.ts         # Public API
├─ components/              # 🧩 Shared UI Primitives
│  ├─ ui/                 # Basic components (Button, Input)
│  ├─ layout/             # Layout components
│  ├─ forms/              # Form-specific components
│  └─ feedback/           # Loading, Error, Empty states
├─ lib/                     # 🛠️ Utilities & Helpers
│  ├─ utils/              # Pure functions
│  ├─ hooks/              # Shared custom hooks
│  ├─ constants/          # App-wide constants
│  └─ types/              # Global type definitions
├─ styles/                  # 🎨 Styling
│  ├─ globals.css         # Global styles
│  └─ tailwind.css        # Tailwind imports
├─ assets/                  # 📁 Static Assets
│  ├─ images/             # Optimized images
│  ├─ icons/              # SVG icons
│  └─ fonts/              # Custom fonts
└─ main.tsx                # 🚀 Application entry point
```

### Architectural Rules
- **Pages**: Pure composition, no business logic
- **Features**: Self-contained domains with clear boundaries
- **Components**: Reusable, stateless when possible
- **Lib**: Framework-agnostic utilities
- **Single Responsibility**: Each folder has one clear purpose
- **Dependency Direction**: Features → Components → Lib (never reverse)

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Folders**: kebab-case for features, camelCase for others
- **Types**: PascalCase with descriptive suffixes (`UserProfile`, `ApiResponse`)
- **Constants**: SCREAMING_SNAKE_CASE for app constants

---

## 🛣️ Path Aliases Configuration

**⚠️ Critical**: Path aliases ต้องกำหนดใน **ทั้ง 3 ที่** เพื่อให้ทำงานได้ถูกต้อง

### 1. tsconfig.app.json (สำคัญที่สุด)
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
    }
  }
}
```

### 2. vite.config.ts
```ts
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@features": path.resolve(__dirname, "src/features"),
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib")
    }
  }
});
```

### 3. Root tsconfig.json
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
    }
  }
}
```

**Troubleshooting Path Aliases:**
- ❌ กำหนดแค่ root tsconfig → TypeScript compiler ไม่เจอ
- ❌ กำหนดแค่ vite config → IDE ไม่เจอ
- ❌ Missing `baseUrl` → Relative paths ไม่ทำงาน
- ✅ ต้องกำหนดครบทั้ง 3 ที่ + restart IDE

---

## 📦 Export / Import Patterns

### Standard Patterns
```ts
// ✅ Named exports (preferred)
export function HeaderGoal() { ... }
export type HeaderGoalProps = Readonly<{ ... }>;

// ✅ Barrel exports for multiple items
// features/goal-tracking/components/index.ts
export { HeaderGoal } from "./HeaderGoal";
export { ProgressBar } from "./ProgressBar";
export type { HeaderGoalProps, ProgressBarProps } from "./types";

// ✅ Pages can have both named + default
// pages/Home/index.ts
export { HomePage } from "./HomePage";
export default HomePage; // For lazy loading
```

### Import Hierarchy
```ts
// ✅ Correct import order
import type { JSX } from "preact";           // 1. Framework types
import { useState, useEffect } from "preact/hooks"; // 2. Framework hooks
import { clsx } from "clsx";                 // 3. External libraries

import type { User } from "@lib/types";      // 4. Internal types
import { formatDate } from "@lib/utils";     // 5. Internal utilities
import { Button } from "@components/ui";     // 6. Internal components
import { useAuth } from "@features/auth";    // 7. Feature hooks/services
```

### Anti-Patterns to Avoid
```ts
// ❌ Default exports for regular components
export default function Header() { ... }

// ❌ Mixed export styles in same file
export function Header() { ... }
export default Header;

// ❌ Deep relative imports
import { utils } from "../../../lib/utils";

// ❌ Circular dependencies
// features/auth/index.ts imports from features/profile
// features/profile/index.ts imports from features/auth
```

---

## 🧠 TypeScript & JSX Standards

### Type Definitions
```tsx
import type { JSX } from "preact";

// ✅ Always use type + Readonly for props
type ButtonProps = Readonly<{
  variant: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: JSX.Element | string;
  onClick?: (event: MouseEvent) => void;
}>;

// ✅ Extend HTML attributes when needed
type InputProps = Readonly<{
  label: string;
  error?: string;
}> & Omit<JSX.HTMLAttributes<HTMLInputElement>, "children">;

// ❌ Avoid interface for props
interface ButtonProps {
  variant: string; // Too loose
  onClick: Function; // Too generic
}
```

### Component Patterns
```tsx
// ✅ Standard component structure
export function Button({ 
  variant = "primary", 
  size = "md", 
  disabled = false,
  children,
  onClick,
  ...props 
}: ButtonProps): JSX.Element {
  const handleClick = (event: MouseEvent) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
        },
        {
          "px-2 py-1 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        {
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Advanced Type Patterns
```tsx
// ✅ Discriminated unions for complex props
type AlertProps = Readonly<{
  title: string;
}> & (
  | { type: "success"; message: string }
  | { type: "error"; error: Error }
  | { type: "loading" }
);

// ✅ Generic components
type ListProps<T> = Readonly<{
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  keyExtractor: (item: T) => string;
}>;

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>): JSX.Element {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
```

---

## 🎨 Tailwind CSS Mastery

### Class Ordering System
**Always** follow this order for consistency and maintainability:

1. **Layout & Display**: `flex`, `grid`, `block`, `inline`, `hidden`
2. **Positioning**: `relative`, `absolute`, `fixed`, `sticky`, `inset-*`
3. **Sizing**: `w-*`, `h-*`, `min-*`, `max-*`
4. **Spacing**: `p-*`, `m-*`, `space-*`, `gap-*`
5. **Typography**: `text-*`, `font-*`, `leading-*`, `tracking-*`
6. **Colors**: `bg-*`, `text-*`, `border-*`
7. **Borders**: `border`, `rounded-*`
8. **Effects**: `shadow-*`, `opacity-*`, `blur-*`
9. **Transitions**: `transition-*`, `duration-*`, `ease-*`
10. **Interactions**: `hover:*`, `focus:*`, `active:*`, `disabled:*`

### Responsive Design Patterns
```tsx
// ✅ Mobile-first responsive design
<div className="
  flex flex-col                    // Mobile: stack vertically
  md:flex-row                      // Tablet+: horizontal layout
  lg:gap-8                         // Desktop: larger gaps
  
  p-4                              // Mobile: small padding
  md:p-6                           // Tablet: medium padding
  lg:p-8                           // Desktop: large padding
  
  text-sm                          // Mobile: small text
  md:text-base                     // Tablet: normal text
  lg:text-lg                       // Desktop: large text
">

// ✅ Container patterns
<div className="
  w-full                           // Full width base
  max-w-sm mx-auto                 // Mobile: small centered
  md:max-w-2xl                     // Tablet: medium width
  lg:max-w-4xl                     // Desktop: large width
  xl:max-w-6xl                     // XL: extra large
">

// ✅ Grid responsive patterns
<div className="
  grid grid-cols-1                 // Mobile: single column
  sm:grid-cols-2                   // Small: 2 columns
  md:grid-cols-3                   // Medium: 3 columns
  lg:grid-cols-4                   // Large: 4 columns
  gap-4 md:gap-6 lg:gap-8          // Responsive gaps
">
```

### Component-Specific Patterns
```tsx
// ✅ Button variants with proper ordering
const buttonVariants = {
  primary: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",
  
  secondary: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
};

// ✅ Progress bar with proper calculations
const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / Math.max(total, 1)) * 100));
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
      <div 
        className="h-full bg-blue-600 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
```

### When to Use Custom CSS
```css
/* ✅ Complex animations */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shimmer {
  animation: shimmer 2s infinite;
}

/* ✅ Component-specific styles that can't be utilities */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full hover:bg-gray-400;
}
```

---

## 📱 Mobile-First Layout & UX

### Standard App Layout
```tsx
// ✅ Complete mobile app structure
export function AppLayout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with safe area */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 pt-[env(safe-area-inset-top)]">
        <NavigationBar />
      </header>
      
      {/* Main content with proper spacing */}
      <main className="
        flex-1 
        px-4 py-4 
        pb-[calc(80px+env(safe-area-inset-bottom))]
        space-y-6
        overflow-y-auto
      ">
        {children}
      </main>
      
      {/* Bottom navigation with safe area */}
      <footer className="sticky bottom-0 z-40 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
        <TabBar />
      </footer>
    </div>
  );
}
```

### Safe Area & Device Considerations
```tsx
// ✅ iPhone notch and home indicator
<div className="pt-[env(safe-area-inset-top)]">Header content</div>
<div className="pb-[env(safe-area-inset-bottom)]">Footer content</div>
<div className="pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">Landscape content</div>

// ✅ Touch targets (minimum 44px)
<button className="min-h-[44px] min-w-[44px] flex items-center justify-center">
  <Icon className="w-6 h-6" />
</button>

// ✅ Scroll behavior
<div className="overflow-y-auto overscroll-y-contain">
  {/* Prevent overscroll bounce on iOS */}
</div>
```

### Performance Optimizations
```tsx
// ✅ Lazy loading images
<img 
  src={imageSrc} 
  alt={altText}
  loading="lazy"
  className="w-full h-auto"
  onLoad={() => setImageLoaded(true)}
/>

// ✅ Virtual scrolling for long lists
import { VirtualList } from "@lib/components";

<VirtualList
  items={items}
  itemHeight={60}
  renderItem={({ item, index }) => <ListItem key={item.id} item={item} />}
/>
```

---

## ♿ Accessibility Excellence

### WCAG 2.1 AA Compliance
```tsx
// ✅ Semantic HTML structure
<main role="main" aria-labelledby="page-title">
  <h1 id="page-title">Page Title</h1>
  
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/home" aria-current="page">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
  
  <section aria-labelledby="content-heading">
    <h2 id="content-heading">Content Section</h2>
    {/* Content */}
  </section>
</main>

// ✅ Form accessibility
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        required
        aria-describedby="email-error"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {emailError && (
        <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
          {emailError}
        </p>
      )}
    </div>
  </div>
</form>
```

### Interactive Elements
```tsx
// ✅ Button accessibility
<button
  type="button"
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
  onClick={handleClose}
  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <XIcon className="w-5 h-5" aria-hidden="true" />
</button>

// ✅ Modal/Dialog accessibility
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  className="fixed inset-0 z-50 flex items-center justify-center"
>
  <div className="fixed inset-0 bg-black/50" onClick={onClose} />
  <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
    <h2 id="dialog-title" className="text-lg font-semibold">
      Confirm Action
    </h2>
    <p id="dialog-description" className="mt-2 text-gray-600">
      Are you sure you want to proceed?
    </p>
    <div className="mt-4 flex gap-2 justify-end">
      <button onClick={onClose}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  </div>
</div>

// ✅ Loading states
<button disabled={isLoading} aria-describedby="loading-status">
  {isLoading ? "Loading..." : "Submit"}
</button>
{isLoading && (
  <div id="loading-status" className="sr-only" aria-live="polite">
    Processing your request, please wait.
  </div>
)}
```

### Screen Reader Support
```tsx
// ✅ Skip links
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
  Skip to main content
</a>

// ✅ Live regions for dynamic content
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {statusMessage}
</div>

// ✅ Progress indicators
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Upload progress: ${progress}%`}
>
  <div style={{ width: `${progress}%` }} />
</div>
```

---

## 🚀 Performance & Error Handling

### Safe Calculations & Edge Cases
```tsx
// ✅ Always handle division by zero
const percentage = Math.max(0, Math.min(100, (current / Math.max(total, 1)) * 100));

// ✅ Safe array operations
const items = data?.items ?? [];
const firstItem = items.at(0) ?? null;
const lastItem = items.at(-1) ?? null;

// ✅ Null-safe object access
const userName = user?.profile?.name ?? "Anonymous";
const userEmail = user?.contact?.email ?? "";

// ✅ Safe number parsing
const parseNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
```

### Error Boundaries & Fallbacks
```tsx
// ✅ Error boundary component
export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps): JSX.Element {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
      setError(new Error(event.message));
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback ? fallback(error) : (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-800 font-medium">Something went wrong</h3>
        <p className="text-red-600 text-sm mt-1">
          {error?.message ?? "An unexpected error occurred"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

// ✅ Async error handling
const useAsyncOperation = <T,>(operation: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [operation]);

  return { data, error, loading, execute };
};
```

### Performance Patterns
```tsx
// ✅ Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return items.reduce((sum, item) => sum + item.value, 0);
}, [items]);

// ✅ Debounced search
const useDebouncedSearch = (query: string, delay: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return debouncedQuery;
};

// ✅ Virtual scrolling for large lists
const VirtualList = ({ items, itemHeight, renderItem }: VirtualListProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 400; // Fixed height
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return (
    <div 
      className="overflow-auto" 
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🔧 Development Tooling

### ESLint Configuration
```js
// .eslintrc.cjs
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import",
    "jsx-a11y",
    "tailwindcss",
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  rules: {
    // TypeScript
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    
    // Imports
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external", 
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "pathGroups": [
        {
          "pattern": "@/**",
          "group": "internal",
          "position": "before"
        }
      ],
      "alphabetize": { "order": "asc" }
    }],
    
    // Accessibility
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    
    // Tailwind
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": "warn",
    
    // React/Preact
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  }
};
```

### Prettier Configuration
```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 100,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]"]
  ]
}
```

---

## 🧾 Git & Deployment

### Conventional Commits
```bash
# Format: <type>(<scope>): <description>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting, etc.)
refactor: # Code refactoring
perf:     # Performance improvements
test:     # Adding or updating tests
chore:    # Maintenance tasks
ci:       # CI/CD changes

# Examples:
feat(auth): add social login with Google OAuth
fix(ui): resolve button focus state in Safari
docs(readme): update installation instructions
refactor(api): extract user service into separate module
perf(images): implement lazy loading for gallery
test(utils): add unit tests for date formatting
chore(deps): update dependencies to latest versions
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md,json}": [
      "prettier --write"
    ]
  }
}
```

### Build & Bundle Analysis
```ts
// vite.config.ts
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    preact(),
    // Analyze bundle size
    process.env.ANALYZE && analyzer()
  ],
  build: {
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["preact", "preact/hooks"],
          ui: ["clsx", "tailwindcss"]
        }
      }
    },
    // Performance budgets
    chunkSizeWarningLimit: 1000
  }
});
```

---

## 🔍 Code Review & Quality Assurance

### Pre-Commit Checklist
- [ ] **Architecture**: Proper folder structure and separation of concerns
- [ ] **TypeScript**: `type` + `Readonly<...>` for all props, no `any` types
- [ ] **JSX**: `className` (not `class`), proper imports, semantic HTML
- [ ] **Exports**: Named exports + barrel patterns, consistent import paths
- [ ] **Path Aliases**: Using aliases consistently, no deep relative imports
- [ ] **Accessibility**: ARIA attributes, semantic HTML, keyboard navigation
- [ ] **Tailwind**: Proper class ordering, responsive design, utility-first
- [ ] **Mobile**: Safe-area padding, touch targets, responsive breakpoints
- [ ] **Performance**: Edge case handling, memoization, lazy loading
- [ ] **Error Handling**: Try-catch blocks, fallback UI, user feedback
- [ ] **Testing**: Unit tests for utilities, integration tests for features

### Code Review Guidelines
```tsx
// ❌ Common anti-patterns to flag
interface Props { data: any }                    // Loose typing
<div class="container">                          // Wrong JSX attribute
import { utils } from "../../../lib/utils"       // Deep relative import
<button>⚙️</button>                             // Missing accessibility
const percent = current / total * 100           // No edge case handling
export default function Component() {}          // Default export for regular component

// ✅ Patterns to approve
type Props = Readonly<{ data: UserProfile }>;   // Strict typing
<div className="container">                     // Correct JSX
import { utils } from "@lib/utils";             // Path alias
<button aria-label="Settings">⚙️</button>      // Accessible
const p = Math.max(0, Math.min(100, (current / Math.max(total, 1)) * 100)); // Safe calculation
export function Component() {}                  // Named export
```

### Automated Quality Checks
```yaml
# .github/workflows/quality.yml
name: Quality Checks
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run type-check    # TypeScript compilation
      - run: npm run lint          # ESLint
      - run: npm run test          # Unit tests
      - run: npm run build         # Production build
      - run: npm run lighthouse    # Performance audit
```

---

## 📚 Learning & Documentation

### Learning Log Template
```md
### Case: <Descriptive Title>

**What you wrote**
```tsx
// Original code with issues
const Component = ({ data }) => {
  return <div class="container">{data.name}</div>;
};
```

**Issue / Improvement**
- Missing TypeScript types for props
- Using `class` instead of `className` in JSX
- No null safety for `data.name`
- Missing accessibility considerations

**Lesson learned**
- Always define prop types with `Readonly<...>`
- JSX attributes use `className`, not `class`
- Handle null/undefined cases with optional chaining
- Consider screen readers and keyboard navigation
- Reference: agent.md TypeScript & JSX Standards section

**Fixed code**
```tsx
type ComponentProps = Readonly<{
  data: { name?: string } | null;
}>;

export function Component({ data }: ComponentProps): JSX.Element {
  return (
    <div className="container">
      {data?.name ?? "No name available"}
    </div>
  );
}
```
```

### Documentation Standards
- **README**: Clear setup instructions, architecture overview
- **Component docs**: Props interface, usage examples, accessibility notes
- **API docs**: Request/response types, error handling, rate limits
- **Learning Log**: Updated with every significant change or learning
- **Architecture Decision Records**: For major technical decisions

---

## 🤖 AI-Assisted Development

### AI Reviewer Checklist
When using AI for code review or generation:

1. **Systematic Validation**: Check every rule in this document
2. **Context Awareness**: Provide relevant code context and requirements
3. **Incremental Changes**: Make small, focused changes rather than large rewrites
4. **Documentation**: Update Learning Log with AI-assisted changes
5. **Human Review**: Always review AI-generated code for logic and edge cases

### Effective AI Prompts
```
// ✅ Good prompt
"Create a TypeScript component for a progress bar following our agent.md standards:
- Use type + Readonly for props
- Handle edge cases (division by zero)
- Include accessibility attributes
- Use proper Tailwind class ordering
- Add smooth transitions"

// ❌ Poor prompt
"Make a progress bar component"
```

### AI Code Review Process
1. **Pre-Review**: Run automated checks (lint, type-check, test)
2. **AI Review**: Use AI to identify patterns and potential issues
3. **Human Review**: Verify business logic, UX, and edge cases
4. **Documentation**: Update Learning Log with findings
5. **Integration**: Merge with confidence

---

## 🎯 Success Metrics

### Code Quality KPIs
- **Type Coverage**: > 95% TypeScript coverage
- **Accessibility Score**: 100% Lighthouse accessibility
- **Performance**: < 3s LCP, < 100ms FID, < 0.1 CLS
- **Bundle Size**: < 100kb initial, < 50kb per route
- **Test Coverage**: > 80% for utilities, > 60% for components
- **Lint Warnings**: 0 errors, < 5 warnings per 1000 lines

### Developer Experience Metrics
- **Build Time**: < 30s for development, < 2min for production
- **Hot Reload**: < 200ms for component changes
- **IDE Response**: < 100ms for autocomplete and type checking
- **Onboarding Time**: New developers productive within 1 day
- **Code Review Time**: < 30min average review time

---

## 🚀 Conclusion

This document represents battle-tested standards for building scalable, maintainable, and accessible web applications. Every rule has been validated through real-world development and is designed to:

- **Reduce Cognitive Load**: Consistent patterns mean less thinking about "how" and more focus on "what"
- **Prevent Common Bugs**: Type safety and edge case handling eliminate entire classes of errors
- **Ensure Accessibility**: Built-in a11y patterns make inclusive design the default
- **Optimize Performance**: Performance considerations are baked into every pattern
- **Enable Team Collaboration**: Clear standards reduce code review time and onboarding friction

**Remember**: These standards evolve with our understanding. Update this document and the Learning Log as we discover better patterns and practices.

---

**Version**: 2.0  
**Last Updated**: 2025-01-09  
**Next Review**: 2025-04-09