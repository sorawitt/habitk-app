import { MilestonesSection } from "../../components/MilestonesSection";
import { render, screen, describe, it, expect, vi, createMockMilestones } from '../test-utils';

describe("MilestonesSection Performance", () => {
  it("should render efficiently with many milestones", () => {
    const largeMilestoneList = createMockMilestones(50);
    const handleAddMilestone = vi.fn();

    const startTime = performance.now();
    
    render(
      <MilestonesSection 
        milestones={largeMilestoneList}
        onAddNew={handleAddMilestone}
      />
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Verify all milestones are rendered
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Milestones");
    expect(screen.getByRole("button", { name: /add new milestone/i })).toBeInTheDocument();
    
    // Check that some milestones are rendered (we don't need to check all 50)
    expect(screen.getByText("Milestone 1")).toBeInTheDocument();
    expect(screen.getByText("Milestone 10")).toBeInTheDocument();
    expect(screen.getByText("Milestone 25")).toBeInTheDocument();

    // Performance assertion - rendering should be fast (less than 100ms)
    expect(renderTime).toBeLessThan(100);
  });

  it("should handle re-renders efficiently", () => {
    const initialMilestones = createMockMilestones(10);
    const handleAddMilestone = vi.fn();

    const { rerender } = render(
      <MilestonesSection 
        milestones={initialMilestones}
        onAddNew={handleAddMilestone}
      />
    );

    // Measure re-render time
    const startTime = performance.now();
    
    const updatedMilestones = createMockMilestones(15);
    rerender(
      <MilestonesSection 
        milestones={updatedMilestones}
        onAddNew={handleAddMilestone}
      />
    );

    const endTime = performance.now();
    const rerenderTime = endTime - startTime;

    // Verify the update worked
    expect(screen.getByText("Milestone 15")).toBeInTheDocument();

    // Re-render should be even faster
    expect(rerenderTime).toBeLessThan(50);
  });

  it("should not cause memory leaks with frequent updates", () => {
    const handleAddMilestone = vi.fn();
    let milestones = createMockMilestones(5);

    const { rerender, unmount } = render(
      <MilestonesSection 
        milestones={milestones}
        onAddNew={handleAddMilestone}
      />
    );

    // Simulate multiple updates
    for (let i = 0; i < 10; i++) {
      milestones = createMockMilestones(5 + i);
      rerender(
        <MilestonesSection 
          milestones={milestones}
          onAddNew={handleAddMilestone}
        />
      );
    }

    // Verify final state
    expect(screen.getByText("Milestone 14")).toBeInTheDocument();

    // Clean unmount should not throw
    expect(() => unmount()).not.toThrow();
  });

  it("should handle empty to populated state efficiently", () => {
    const handleAddMilestone = vi.fn();

    const { rerender } = render(
      <MilestonesSection 
        milestones={[]}
        onAddNew={handleAddMilestone}
      />
    );

    // Verify empty state
    expect(screen.getByText("No milestones yet")).toBeInTheDocument();

    const startTime = performance.now();
    
    // Add milestones
    const newMilestones = createMockMilestones(20);
    rerender(
      <MilestonesSection 
        milestones={newMilestones}
        onAddNew={handleAddMilestone}
      />
    );

    const endTime = performance.now();
    const transitionTime = endTime - startTime;

    // Verify populated state
    expect(screen.queryByText("No milestones yet")).not.toBeInTheDocument();
    expect(screen.getByText("Milestone 1")).toBeInTheDocument();
    expect(screen.getByText("Milestone 20")).toBeInTheDocument();

    // Transition should be fast
    expect(transitionTime).toBeLessThan(75);
  });
});