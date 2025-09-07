# Requirements Document

## Introduction

เพิ่ม Milestones UI component ใหม่ใน Home page ที่จะแสดงรายการเป้าหมาย (milestones) ต่างๆ พร้อมสถานะการทำงาน โดยจะวางไว้ต่อจาก Header Goal และ Progress Bar ที่มีอยู่แล้ว UI นี้จะช่วยให้ผู้ใช้เห็นภาพรวมของเป้าหมายย่อยต่างๆ และสามารถเพิ่มเป้าหมายใหม่ได้

## Requirements

### Requirement 1

**User Story:** As a user, I want to see a list of my milestones with their status, so that I can track my progress on different goals

#### Acceptance Criteria

1. WHEN the Home page loads THEN the system SHALL display a "Milestones" section with a list of milestone items
2. WHEN displaying each milestone THEN the system SHALL show the milestone title, status, and appropriate status icon
3. WHEN a milestone is completed THEN the system SHALL display a green checkmark icon and "Completed" status
4. WHEN a milestone is in progress THEN the system SHALL display a bookmark icon and "In Progress" status  
5. WHEN a milestone is not started THEN the system SHALL display a clock icon and "Not Started" status

### Requirement 2

**User Story:** As a user, I want to add new milestones, so that I can create additional goals to track

#### Acceptance Criteria

1. WHEN viewing the Milestones section THEN the system SHALL display an "Add New" button in the header
2. WHEN I click the "Add New" button THEN the system SHALL provide a way to create a new milestone
3. WHEN creating a new milestone THEN the system SHALL require a title and default to "Not Started" status

### Requirement 3

**User Story:** As a user, I want the milestones to be visually consistent with the existing design, so that the interface feels cohesive

#### Acceptance Criteria

1. WHEN displaying milestones THEN the system SHALL use consistent styling with existing components
2. WHEN showing milestone cards THEN the system SHALL use rounded corners, proper spacing, and shadow effects similar to existing UI
3. WHEN displaying the section header THEN the system SHALL use typography consistent with other section headers
4. WHEN showing status icons THEN the system SHALL use appropriate colors (green for completed, gray for others)

### Requirement 4

**User Story:** As a developer, I want the milestone components to be reusable and well-structured, so that they can be easily maintained and extended

#### Acceptance Criteria

1. WHEN implementing milestone components THEN the system SHALL follow the existing feature-based folder structure
2. WHEN creating milestone types THEN the system SHALL define proper TypeScript interfaces
3. WHEN building milestone components THEN the system SHALL separate concerns between display and data logic
4. WHEN exporting milestone components THEN the system SHALL follow the existing barrel export pattern