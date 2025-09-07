import userEvent from '@testing-library/user-event'
import { MilestonesSection } from '../../components/MilestonesSection'
import { MilestoneStatus, type Milestone } from '../../types'
import { render, screen, describe, it, expect, vi } from '../test-utils'

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'First milestone',
    status: MilestoneStatus.COMPLETED,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Second milestone',
    status: MilestoneStatus.IN_PROGRESS,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  }
]

describe('MilestonesSection - Accessibility', () => {
  it('has proper ARIA structure for screen readers', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    // Section should be properly labeled
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby', 'milestones-heading')
    
    // Heading should have proper ID
    const heading = screen.getByRole('heading', { name: 'Milestones' })
    expect(heading).toHaveAttribute('id', 'milestones-heading')
    
    // List should have proper ARIA attributes
    const list = screen.getByRole('list')
    expect(list).toHaveAttribute('aria-label', '2 milestones')
  })

  it('provides proper list semantics for milestones', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
    
    // Each milestone card should be in a list item
    expect(screen.getByText('First milestone').closest('[role="listitem"]')).toBeInTheDocument()
    expect(screen.getByText('Second milestone').closest('[role="listitem"]')).toBeInTheDocument()
  })

  it('handles empty state with proper accessibility', () => {
    render(<MilestonesSection milestones={[]} />)
    
    const emptyState = screen.getByRole('status')
    expect(emptyState).toHaveAttribute('aria-live', 'polite')
    expect(emptyState).toBeInTheDocument()
  })

  it('supports keyboard navigation for interactive elements', async () => {
    const user = userEvent.setup()
    const handleAddNew = vi.fn()
    
    render(<MilestonesSection milestones={mockMilestones} onAddNew={handleAddNew} />)
    
    // Tab to the Add New button
    await user.tab()
    const addButton = screen.getByRole('button', { name: 'Add new milestone' })
    expect(addButton).toHaveFocus()
    
    // Press Enter to activate
    await user.keyboard('{Enter}')
    expect(handleAddNew).toHaveBeenCalledTimes(1)
  })

  it('provides descriptive ARIA labels for milestone cards', () => {
    render(
      <MilestonesSection 
        milestones={mockMilestones} 
        onAddNew={() => {}}
      />
    )
    
    // Check that milestone cards have descriptive labels
    const firstMilestone = screen.getByRole('article', { name: /First milestone/ })
    expect(firstMilestone).toHaveAttribute('aria-label', 'Milestone: First milestone, status: Completed')
  })

  it('maintains focus management for keyboard users', async () => {
    const user = userEvent.setup()
    const handleAddNew = vi.fn()
    
    render(<MilestonesSection milestones={mockMilestones} onAddNew={handleAddNew} />)
    
    // Focus should be manageable via keyboard
    await user.tab()
    const addButton = screen.getByRole('button', { name: 'Add new milestone' })
    expect(addButton).toHaveFocus()
    
    // Should be able to activate with Space key
    await user.keyboard(' ')
    expect(handleAddNew).toHaveBeenCalledTimes(1)
  })

  it('provides proper touch targets for mobile accessibility', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const addButton = screen.getByRole('button', { name: 'Add new milestone' })
    expect(addButton).toHaveClass('min-h-[44px]') // Minimum touch target size
    expect(addButton).toHaveClass('touch-manipulation') // Optimized for touch
  })

  it('uses semantic HTML elements appropriately', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    // Should use semantic section element
    expect(screen.getByRole('region')).toBeInTheDocument()
    
    // Should use proper heading hierarchy
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    
    // Should use list semantics
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('provides status information for screen readers', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    // Status icons should have proper ARIA labels
    const statusIcons = screen.getAllByRole('img')
    expect(statusIcons[0]).toHaveAttribute('aria-label', 'Completed milestone')
    expect(statusIcons[1]).toHaveAttribute('aria-label', 'In progress milestone')
  })
})