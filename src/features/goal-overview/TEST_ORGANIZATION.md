# การจัดระเบียบ Test Files

## ปัญหาเดิม
- Test files กระจัดกระจายอยู่ใน `components/` folder
- ยากต่อการจัดการและค้นหา
- ไม่มีการแยกประเภท tests ที่ชัดเจน
- Import paths ยาวและซับซ้อน

## โครงสร้างใหม่

```
src/features/goal-overview/
├── components/                    # Production code เท่านั้น
│   ├── AddMilestoneButton.tsx
│   ├── MilestoneCard.tsx
│   ├── MilestoneStatusIcon.tsx
│   ├── MilestonesSection.tsx
│   ├── HeaderGoal.tsx
│   ├── ProgressBar.tsx
│   └── index.ts
├── __tests__/                     # Test files ทั้งหมด
│   ├── components/                # Unit tests
│   │   ├── AddMilestoneButton.test.tsx
│   │   ├── MilestoneCard.test.tsx
│   │   ├── MilestoneStatusIcon.test.tsx
│   │   └── MilestonesSection.test.tsx
│   ├── integration/               # Integration tests
│   │   ├── GoalOverview.integration.test.tsx
│   │   └── VisualConsistency.test.tsx
│   ├── performance/               # Performance tests
│   │   └── MilestonesSection.performance.test.tsx
│   ├── accessibility/             # Accessibility tests
│   │   └── MilestonesSection.accessibility.test.tsx
│   ├── test-utils.ts             # Test utilities และ helpers
│   ├── index.ts                  # Test exports
│   └── README.md                 # Test documentation
├── types.ts
└── index.ts
```

## ประโยชน์ของโครงสร้างใหม่

### 🎯 **ชัดเจนและเป็นระเบียบ**
- แยก production code และ test code ออกจากกัน
- จัดกลุม tests ตามประเภท
- ง่ายต่อการค้นหาและจัดการ

### 🚀 **ง่ายต่อการรัน Tests**
```bash
# รัน tests ทั้งหมด
npm run test:goal-overview

# รัน tests เฉพาะประเภท
npm run test:components
npm run test:integration
npm run test:performance
npm run test:accessibility
```

### 🛠️ **Test Utilities ที่ใช้ร่วมกัน**
- `test-utils.ts` มี helpers และ utilities ที่ใช้ร่วมกัน
- `createMockMilestone()`, `createMockMilestones()` functions
- Common assertions และ mock handlers
- Re-export testing libraries ที่ใช้บ่อย

### 📝 **Import Paths ที่สั้นและชัดเจน**
```typescript
// เดิม
import { MilestoneCard } from './MilestoneCard'

// ใหม่
import { MilestoneCard } from '../../components/MilestoneCard'
import { render, screen, describe, it, expect, vi } from '../test-utils'
```

## การใช้งาน Test Utilities

### สร้าง Mock Data
```typescript
import { createMockMilestone, createMockMilestones } from '../test-utils'

// สร้าง milestone เดียว
const milestone = createMockMilestone({
  title: "Custom Title",
  status: MilestoneStatus.COMPLETED
})

// สร้าง array ของ milestones
const milestones = createMockMilestones(10)
```

### ใช้ Common Assertions
```typescript
import { expectElementToHaveAccessibleName } from '../test-utils'

expectElementToHaveAccessibleName(button, "Add new milestone")
```

### Performance Testing
```typescript
import { measureRenderTime } from '../test-utils'

const renderTime = measureRenderTime(() => {
  render(<MyComponent />)
})
expect(renderTime).toBeLessThan(100)
```

## Best Practices

### 1. **การตั้งชื่อ Test Files**
- `ComponentName.test.tsx` - Unit tests
- `FeatureName.integration.test.tsx` - Integration tests
- `ComponentName.performance.test.tsx` - Performance tests
- `ComponentName.accessibility.test.tsx` - Accessibility tests

### 2. **การจัดกลุ่ม Tests**
```typescript
describe("ComponentName", () => {
  describe("Rendering", () => {
    // rendering tests
  })
  
  describe("User Interactions", () => {
    // interaction tests
  })
  
  describe("Edge Cases", () => {
    // edge case tests
  })
})
```

### 3. **การใช้ Test Utilities**
- ใช้ `test-utils.ts` สำหรับ common functions
- สร้าง mock data ด้วย helper functions
- ใช้ common assertions เพื่อความสอดคล้อง

### 4. **การรัน Tests**
- รัน tests เฉพาะที่เกี่ยวข้องขณะ develop
- รัน tests ทั้งหมดก่อน commit
- ใช้ watch mode ขณะเขียน tests

## สถิติ Tests

- **Total Tests**: 78 tests
- **Component Tests**: 56 tests (72%)
- **Integration Tests**: 18 tests (23%)
- **Performance Tests**: 4 tests (5%)
- **Accessibility Tests**: 9 tests (12%)

## การ Migrate Tests อื่นๆ

หากมี features อื่นๆ ที่ต้องการจัดระเบียบ tests สามารถใช้โครงสร้างเดียวกันนี้:

```bash
src/features/[feature-name]/
├── components/
├── __tests__/
│   ├── components/
│   ├── integration/
│   ├── performance/
│   ├── accessibility/
│   ├── test-utils.ts
│   ├── index.ts
│   └── README.md
└── ...
```

โครงสร้างนี้ทำให้ tests มีความเป็นระเบียบ ง่ายต่อการจัดการ และสามารถ scale ได้ดีเมื่อโปรเจคใหญ่ขึ้น