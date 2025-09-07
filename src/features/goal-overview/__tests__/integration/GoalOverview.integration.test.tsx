import { HeaderGoalView } from "../../components/HeaderGoal";
import { ProgressBar } from "../../components/ProgressBar";
import { MilestonesSection } from "../../components/MilestonesSection";
import { mockMilestones } from "../../types";
import { render, screen, describe, it, expect, vi } from '../test-utils';

describe("Goal Overview Integration", () => {
  it("should render all components together with consistent styling", () => {
    const handleAddMilestone = vi.fn();

    render(
      <div className="space-y-6">
        <HeaderGoalView
          title="Read 10 books this year"
          subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
        />
        <ProgressBar title="Books Read" currentItemCount={2} totalItemCount={10} />
        <MilestonesSection 
          milestones={mockMilestones}
          onAddNew={handleAddMilestone}
        />
      </div>
    );

    // Verify HeaderGoal is rendered
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Read 10 books this year");
    expect(screen.getByText("Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal.")).toBeInTheDocument();

    // Verify ProgressBar is rendered
    expect(screen.getByText("Books Read")).toBeInTheDocument();
    expect(screen.getByText("2/10")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Verify MilestonesSection is rendered
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Milestones");
    expect(screen.getByRole("button", { name: /add new milestone/i })).toBeInTheDocument();
    
    // Verify milestone cards are rendered
    expect(screen.getByText("Read 3 books by March")).toBeInTheDocument();
    expect(screen.getByText("Read 6 books by June")).toBeInTheDocument();
    expect(screen.getByText("Read 10 books by December")).toBeInTheDocument();
  });

  it("should maintain consistent typography hierarchy", () => {
    const handleAddMilestone = vi.fn();

    render(
      <div className="space-y-6">
        <HeaderGoalView
          title="Read 10 books this year"
          subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
        />
        <ProgressBar title="Books Read" currentItemCount={2} totalItemCount={10} />
        <MilestonesSection 
          milestones={mockMilestones}
          onAddNew={handleAddMilestone}
        />
      </div>
    );

    // Check typography hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    
    expect(h1).toHaveClass("text-xl", "font-bold");
    expect(h2).toHaveClass("text-lg", "font-semibold");
  });

  it("should have consistent spacing and layout", () => {
    const handleAddMilestone = vi.fn();

    const { container } = render(
      <div className="space-y-6">
        <HeaderGoalView
          title="Read 10 books this year"
          subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
        />
        <ProgressBar title="Books Read" currentItemCount={2} totalItemCount={10} />
        <MilestonesSection 
          milestones={mockMilestones}
          onAddNew={handleAddMilestone}
        />
      </div>
    );

    // Verify the container has proper spacing
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("space-y-6");

    // Verify milestone cards have consistent spacing
    const milestonesList = screen.getByRole("list");
    expect(milestonesList).toHaveClass("space-y-3");
  });

  it("should maintain color consistency across components", () => {
    const handleAddMilestone = vi.fn();

    render(
      <div className="space-y-6">
        <HeaderGoalView
          title="Read 10 books this year"
          subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
        />
        <ProgressBar title="Books Read" currentItemCount={2} totalItemCount={10} />
        <MilestonesSection 
          milestones={mockMilestones}
          onAddNew={handleAddMilestone}
        />
      </div>
    );

    // Check consistent use of slate colors for secondary text
    const subtitle = screen.getByText("Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal.");
    expect(subtitle).toHaveClass("text-slate-500");

    // Check progress bar uses consistent slate colors
    const progressCount = screen.getByText("2/10");
    expect(progressCount).toHaveClass("text-slate-500");

    // Check milestone section header uses consistent slate colors
    const milestonesHeading = screen.getByRole("heading", { level: 2 });
    expect(milestonesHeading).toHaveClass("text-slate-900");
  });

  it("should work with empty milestones", () => {
    const handleAddMilestone = vi.fn();

    render(
      <div className="space-y-6">
        <HeaderGoalView
          title="Read 10 books this year"
          subtitle="Track your progress towards reading 10 books this year. Stay motivated and achieve your reading goal."
        />
        <ProgressBar title="Books Read" currentItemCount={0} totalItemCount={10} />
        <MilestonesSection 
          milestones={[]}
          onAddNew={handleAddMilestone}
        />
      </div>
    );

    // Verify empty state is shown
    expect(screen.getByText("No milestones yet")).toBeInTheDocument();
    expect(screen.getByText("Click \"Add New\" to create your first milestone")).toBeInTheDocument();

    // Verify other components still work
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Read 10 books this year");
    expect(screen.getByText("0/10")).toBeInTheDocument();
  });
});