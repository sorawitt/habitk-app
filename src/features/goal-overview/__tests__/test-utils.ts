// Test utilities และ helpers สำหรับ goal-overview tests

import { render, type RenderOptions } from "@testing-library/preact";
import type { JSX } from "preact";
import { MilestoneStatus, type Milestone } from "../types";
import { vi, expect } from "vitest";

// Helper function สำหรับสร้าง mock milestones
export const createMockMilestone = (overrides: Partial<Milestone> = {}): Milestone => ({
    id: `milestone-${Math.random().toString(36).substr(2, 9)}`,
    title: "Test Milestone",
    status: MilestoneStatus.NOT_STARTED,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

// Helper function สำหรับสร้าง array ของ mock milestones
export const createMockMilestones = (count: number, overrides: Partial<Milestone> = {}): Milestone[] => {
    return Array.from({ length: count }, (_, index) =>
        createMockMilestone({
            id: `milestone-${index}`,
            title: `Milestone ${index + 1}`,
            status: index % 3 === 0 ? MilestoneStatus.COMPLETED :
                index % 3 === 1 ? MilestoneStatus.IN_PROGRESS :
                    MilestoneStatus.NOT_STARTED,
            ...overrides,
        })
    );
};

// Custom render function with common providers
export const renderWithProviders = (
    ui: JSX.Element,
    options?: Omit<RenderOptions, 'wrapper'>
) => {
    return render(ui, {
        ...options,
    });
};

// Performance measurement helper
export const measureRenderTime = (renderFn: () => void): number => {
    const startTime = performance.now();
    renderFn();
    const endTime = performance.now();
    return endTime - startTime;
};

// Common test data
export const testMilestones = {
    completed: createMockMilestone({
        id: "completed-milestone",
        title: "Completed Milestone",
        status: MilestoneStatus.COMPLETED,
    }),
    inProgress: createMockMilestone({
        id: "in-progress-milestone",
        title: "In Progress Milestone",
        status: MilestoneStatus.IN_PROGRESS,
    }),
    notStarted: createMockMilestone({
        id: "not-started-milestone",
        title: "Not Started Milestone",
        status: MilestoneStatus.NOT_STARTED,
    }),
};

// Common assertions
export const expectElementToHaveAccessibleName = (element: HTMLElement, name: string) => {
    expect(element).toHaveAttribute('aria-label', name);
};

export const expectElementToBeKeyboardAccessible = (element: HTMLElement) => {
    expect(element).toHaveAttribute('tabIndex');
    expect(element).toHaveAttribute('role');
};

// Mock handlers
export const createMockHandlers = () => ({
    onAddMilestone: vi.fn(),
    onMilestoneClick: vi.fn(),
    onMilestoneUpdate: vi.fn(),
    onMilestoneDelete: vi.fn(),
});

// Re-export commonly used testing utilities
export { render, screen, fireEvent, waitFor, act } from "@testing-library/preact";
export { vi, expect, describe, it, beforeEach, afterEach } from "vitest";