import { HeaderGoalView } from "../../components/HeaderGoal";
import { ProgressBar } from "../../components/ProgressBar";
import { MilestonesSection } from "../../components/MilestonesSection";
import { MilestoneCard } from "../../components/MilestoneCard";
import { AddMilestoneButton } from "../../components/AddMilestoneButton";
import { MilestoneStatusIcon } from "../../components/MilestoneStatusIcon";
import { mockMilestones, MilestoneStatus } from "../../types";
import { render, screen, describe, it, expect } from '../test-utils';

describe("Visual Consistency", () => {
  describe("Typography Consistency", () => {
    it("should use consistent font weights across components", () => {
      render(
        <div>
          <HeaderGoalView
            title="Test Goal"
            subtitle="Test subtitle"
          />
          <ProgressBar title="Progress" currentItemCount={5} totalItemCount={10} />
          <MilestonesSection milestones={mockMilestones} />
        </div>
      );

      // Check main heading uses bold
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveClass("font-bold");

      // Check section heading uses semibold
      const sectionHeading = screen.getByRole("heading", { level: 2 });
      expect(sectionHeading).toHaveClass("font-semibold");

      // Check progress title uses medium
      const progressTitle = screen.getByText("Progress");
      expect(progressTitle).toHaveClass("font-medium");
    });

    it("should use consistent text sizes", () => {
      render(
        <div>
          <HeaderGoalView
            title="Test Goal"
            subtitle="Test subtitle"
          />
          <MilestonesSection milestones={mockMilestones} />
        </div>
      );

      // Check main heading size
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveClass("text-xl");

      // Check section heading size
      const sectionHeading = screen.getByRole("heading", { level: 2 });
      expect(sectionHeading).toHaveClass("text-lg");

      // Check subtitle size
      const subtitle = screen.getByText("Test subtitle");
      expect(subtitle).toHaveClass("text-sm");
    });
  });

  describe("Color Consistency", () => {
    it("should use consistent slate colors for secondary text", () => {
      render(
        <div>
          <HeaderGoalView
            title="Test Goal"
            subtitle="Test subtitle"
          />
          <ProgressBar title="Progress" currentItemCount={5} totalItemCount={10} />
        </div>
      );

      // Check subtitle uses slate-500
      const subtitle = screen.getByText("Test subtitle");
      expect(subtitle).toHaveClass("text-slate-500");

      // Check progress count uses slate-500
      const progressCount = screen.getByText("5/10");
      expect(progressCount).toHaveClass("text-slate-500");
    });

    it("should use consistent primary text colors", () => {
      render(
        <div>
          <HeaderGoalView
            title="Test Goal"
            subtitle="Test subtitle"
          />
          <ProgressBar title="Progress" currentItemCount={5} totalItemCount={10} />
          <MilestonesSection milestones={mockMilestones} />
        </div>
      );

      // Check section heading uses slate-900
      const sectionHeading = screen.getByRole("heading", { level: 2 });
      expect(sectionHeading).toHaveClass("text-slate-900");

      // Check progress title uses slate-700
      const progressTitle = screen.getByText("Progress");
      expect(progressTitle).toHaveClass("text-slate-700");
    });

    it("should use consistent status colors", () => {
      render(
        <div>
          <MilestoneStatusIcon status={MilestoneStatus.COMPLETED} />
          <MilestoneStatusIcon status={MilestoneStatus.IN_PROGRESS} />
          <MilestoneStatusIcon status={MilestoneStatus.NOT_STARTED} />
        </div>
      );

      const icons = screen.getAllByRole("img");
      
      // Check completed status uses green
      expect(icons[0]).toHaveClass("bg-green-100", "text-green-600");
      
      // Check in progress uses slate
      expect(icons[1]).toHaveClass("bg-slate-100", "text-slate-600");
      
      // Check not started uses slate
      expect(icons[2]).toHaveClass("bg-slate-50", "text-slate-500");
    });
  });

  describe("Spacing Consistency", () => {
    it("should use consistent card spacing", () => {
      render(
        <MilestonesSection milestones={mockMilestones} />
      );

      // Check milestone list uses space-y-3
      const milestonesList = screen.getByRole("list");
      expect(milestonesList).toHaveClass("space-y-3");
    });

    it("should use consistent internal padding", () => {
      render(
        <MilestoneCard milestone={mockMilestones[0]} />
      );

      // Check milestone card uses p-4
      const milestoneCard = screen.getByRole("article");
      expect(milestoneCard).toHaveClass("p-4");
    });

    it("should use consistent button padding", () => {
      render(
        <AddMilestoneButton />
      );

      // Check button uses consistent padding
      const button = screen.getByRole("button");
      expect(button).toHaveClass("px-3", "py-2");
    });
  });

  describe("Border and Shadow Consistency", () => {
    it("should use consistent border styles", () => {
      render(
        <div>
          <MilestoneCard milestone={mockMilestones[0]} />
          <AddMilestoneButton />
        </div>
      );

      // Check milestone card border
      const milestoneCard = screen.getByRole("article");
      expect(milestoneCard).toHaveClass("border", "border-slate-200");

      // Check button border
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border", "border-slate-200");
    });

    it("should use consistent rounded corners", () => {
      render(
        <div>
          <MilestoneCard milestone={mockMilestones[0]} />
          <AddMilestoneButton />
          <MilestoneStatusIcon status={MilestoneStatus.COMPLETED} />
        </div>
      );

      // Check milestone card rounded corners
      const milestoneCard = screen.getByRole("article");
      expect(milestoneCard).toHaveClass("rounded-lg");

      // Check button rounded corners
      const button = screen.getByRole("button");
      expect(button).toHaveClass("rounded-lg");

      // Check icon rounded corners (there are multiple icons, so get all)
      const icons = screen.getAllByRole("img");
      icons.forEach(icon => {
        expect(icon).toHaveClass("rounded-full");
      });
    });

    it("should use consistent shadow styles", () => {
      render(
        <MilestoneCard milestone={mockMilestones[0]} />
      );

      // Check milestone card shadow
      const milestoneCard = screen.getByRole("article");
      expect(milestoneCard).toHaveClass("shadow-sm");
    });
  });

  describe("Responsive Design Consistency", () => {
    it("should use consistent responsive breakpoints", () => {
      render(
        <MilestonesSection milestones={mockMilestones} />
      );

      // Check responsive flex direction
      const header = screen.getByRole("heading", { level: 2 }).parentElement;
      expect(header).toHaveClass("flex", "flex-col", "sm:flex-row");
    });

    it("should maintain consistent touch targets", () => {
      render(
        <AddMilestoneButton />
      );

      // Check minimum touch target size
      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-h-[44px]");
    });
  });
});