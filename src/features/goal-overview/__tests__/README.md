# Goal Overview Tests

โครงสร้าง test files ที่จัดระเบียบแล้ว สำหรับ goal-overview feature

## โครงสร้างโฟลเดอร์

```
__tests__/
├── components/           # Unit tests สำหรับแต่ละ component
│   ├── AddMilestoneButton.test.tsx
│   ├── MilestoneCard.test.tsx
│   ├── MilestoneStatusIcon.test.tsx
│   └── MilestonesSection.test.tsx
├── integration/          # Integration tests และ visual consistency
│   ├── GoalOverview.integration.test.tsx
│   └── VisualConsistency.test.tsx
├── performance/          # Performance tests
│   └── MilestonesSection.performance.test.tsx
├── accessibility/        # Accessibility tests
│   └── MilestonesSection.accessibility.test.tsx
├── index.ts             # Test exports
└── README.md            # Documentation นี้
```

## ประเภทของ Tests

### 🧩 Component Tests (`components/`)
- **Unit tests** สำหรับแต่ละ component
- ทดสอบ props, events, rendering
- ทดสอบ user interactions
- ทดสอบ edge cases

### 🔗 Integration Tests (`integration/`)
- ทดสอบการทำงานร่วมกันของ components
- ทดสอบ visual consistency
- ทดสอบ data flow ระหว่าง components

### ⚡ Performance Tests (`performance/`)
- ทดสอบ rendering performance
- ทดสอบ memory usage
- ทดสอบ large dataset handling

### ♿ Accessibility Tests (`accessibility/`)
- ทดสอบ ARIA attributes
- ทดสอบ keyboard navigation
- ทดสอบ screen reader compatibility

## การรัน Tests

```bash
# รัน tests ทั้งหมด
npm test

# รัน tests เฉพาะ component
npm test -- components/

# รัน tests เฉพาะ integration
npm test -- integration/

# รัน tests เฉพาะ performance
npm test -- performance/

# รัน tests เฉพาะ accessibility
npm test -- accessibility/
```

## Test Coverage

- **Total Tests**: 78 tests
- **Component Tests**: 56 tests
- **Integration Tests**: 18 tests
- **Performance Tests**: 4 tests
- **Accessibility Tests**: 9 tests

## Best Practices

1. **Component tests** ควรอยู่ใกล้กับ component ที่ทดสอบ
2. **Integration tests** ทดสอบการทำงานร่วมกันของหลาย components
3. **Performance tests** ควรมี realistic data sets
4. **Accessibility tests** ควรครอบคลุม WCAG guidelines
5. ใช้ descriptive test names ที่อธิบายสิ่งที่ทดสอบ
6. Group related tests ด้วย `describe` blocks
7. ใช้ `beforeEach` และ `afterEach` สำหรับ setup/cleanup