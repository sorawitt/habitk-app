# Design Document

## Overview

Milestones UI จะเป็นส่วนเพิ่มเติมของ Goal Overview feature ที่มีอยู่แล้ว เพื่อแสดงรายการเป้าหมายย่อยต่างๆ (milestones) พร้อมสถานะใน Home page โดยจะใช้ Preact, TypeScript และ Tailwind CSS ตามที่โปรเจคใช้อยู่ การออกแบบจะเน้นความสอดคล้องกับ HeaderGoal และ ProgressBar components ที่มีอยู่แล้ว

## Architecture

### Component Hierarchy
```
src/features/goal-overview/
├── components/
│   ├── HeaderGoal.tsx             # Existing
│   ├── ProgressBar.tsx            # Existing  
│   ├── MilestonesSection.tsx      # New - Main milestones container
│   ├── MilestoneCard.tsx          # New - Individual milestone item
│   ├── MilestoneStatusIcon.tsx    # New - Status icon component
│   ├── AddMilestoneButton.tsx     # New - Add new milestone button
│   └── index.ts                   # Updated barrel exports
├── types.ts                       # Updated with milestone types
├── hooks/                         # Existing (empty)
└── index.ts                       # Updated feature barrel export
```

### Integration Points
- จะเพิ่มเข้าไปใน `src/features/goal-overview` feature ที่มีอยู่แล้ว
- เพิ่ม MilestonesSection component ใน `src/pages/Home/HomePage.tsx` ต่อจาก ProgressBar
- ขยาย types.ts ที่มีอยู่เพื่อรองรับ milestone data structures
- อัพเดท barrel exports ใน goal-overview feature

## Components and Interfaces

### 1. MilestonesSection Component
**Purpose:** Main container ที่แสดง header และรายการ milestones

**Props:**
```typescript
type MilestonesSectionProps = Readonly<{
  milestones: Milestone[];
  onAddNew?: () => void;
}>;
```

**Features:**
- แสดง "Milestones" header พร้อม "Add New" button
- วาง MilestoneCard components ในรูปแบบ vertical list
- รองรับ responsive design

### 2. MilestoneCard Component  
**Purpose:** แสดงข้อมูล milestone แต่ละรายการ

**Props:**
```typescript
type MilestoneCardProps = Readonly<{
  milestone: Milestone;
  onClick?: (milestone: Milestone) => void;
}>;
```

**Features:**
- แสดง status icon, title, และ status text
- ใช้ card design ที่สอดคล้องกับ UI ที่มีอยู่
- รองรับ hover effects และ click interactions

### 3. MilestoneStatusIcon Component
**Purpose:** แสดง icon ตามสถานะของ milestone

**Props:**
```typescript
type MilestoneStatusIconProps = Readonly<{
  status: MilestoneStatus;
  className?: string;
}>;
```

**Features:**
- แสดง checkmark (✓) สำหรับ completed - สีเขียว
- แสดง bookmark (🔖) สำหรับ in progress - สีเทา
- แสดง clock (🕐) สำหรับ not started - สีเทา

### 4. AddMilestoneButton Component
**Purpose:** Button สำหรับเพิ่ม milestone ใหม่

**Props:**
```typescript
type AddMilestoneButtonProps = Readonly<{
  onClick?: () => void;
}>;
```

## Data Models

### Milestone Interface
```typescript
interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  createdAt: Date;
  updatedAt: Date;
}

enum MilestoneStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress', 
  COMPLETED = 'completed'
}
```

### Mock Data Structure
```typescript
const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Read 3 books by March',
    status: MilestoneStatus.COMPLETED,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '2', 
    title: 'Read 6 books by June',
    status: MilestoneStatus.IN_PROGRESS,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-04-01')
  },
  {
    id: '3',
    title: 'Read 10 books by December', 
    status: MilestoneStatus.NOT_STARTED,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];
```

## Error Handling

### Component Error Boundaries
- ใช้ error boundaries เพื่อจัดการ errors ใน milestone components
- แสดง fallback UI เมื่อเกิด error ในการ render milestones
- Log errors สำหรับ debugging

### Data Validation
- Validate milestone data structure ก่อน render
- Handle missing หรือ invalid milestone properties
- Provide default values สำหรับ optional fields

## Testing Strategy

### Unit Tests
- Test individual components (MilestoneCard, MilestoneStatusIcon, etc.)
- Test milestone data transformations และ validations
- Test component props และ event handlers

### Integration Tests  
- Test MilestonesSection component กับ mock data
- Test interaction ระหว่าง components
- Test responsive behavior

### Visual Testing
- Test component rendering กับ different milestone statuses
- Test layout และ spacing consistency
- Test hover states และ interactions

## Styling Guidelines

### Design Tokens
- ใช้ Tailwind CSS classes ที่สอดคล้องกับ existing components
- Colors: 
  - Completed: `text-green-600`, `bg-green-100`
  - In Progress: `text-slate-600`, `bg-slate-100`  
  - Not Started: `text-slate-500`, `bg-slate-50`
- Typography: ใช้ font weights และ sizes เหมือน HeaderGoal และ ProgressBar

### Layout Patterns
- Card design: `rounded-lg border border-slate-200 bg-white p-4 shadow-sm`
- Spacing: ใช้ `space-y-3` สำหรับ milestone list
- Icons: ขนาด `w-8 h-8` พร้อม rounded background

### Responsive Design
- Mobile-first approach
- Stack milestones vertically บน mobile
- Maintain proper touch targets (minimum 44px)

## Performance Considerations

### Rendering Optimization
- ใช้ `key` props อย่างถูกต้องสำหรับ milestone lists
- Avoid unnecessary re-renders ด้วย proper prop comparisons
- Consider virtualization สำหรับ large milestone lists (future enhancement)

### Bundle Size
- Import เฉพาะ components ที่จำเป็น
- ใช้ tree shaking เพื่อลด bundle size
- Lazy load milestone feature หากจำเป็น