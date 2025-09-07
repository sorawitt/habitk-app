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
  },
  {
    id: '3',
    title: 'Third milestone',
    status: MilestoneStatus.NOT_STARTED,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]

describe('MilestonesSection', () => {
  it('renders section with proper heading', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const heading = screen.getByRole('heading', { name: 'Milestones' })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'milestones-heading')
  })

  it('renders all milestone cards when milestones are provided', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    expect(screen.getByText('First milestone')).toBeInTheDocument()
    expect(screen.getByText('Second milestone')).toBeInTheDocument()
    expect(screen.getByText('Third milestone')).toBeInTheDocument()
  })

  it('renders empty state when no milestones are provided', () => {
    render(<MilestonesSection milestones={[]} />)
    
    expect(screen.getByText('No milestones yet')).toBeInTheDocument()
    expect(screen.getByText('Click "Add New" to create your first milestone')).toBeInTheDocument()
  })

  it('renders AddMilestoneButton', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const addButton = screen.getByRole('button', { name: 'Add new milestone' })
    expect(addButton).toBeInTheDocument()
  })

  it('calls onAddNew when AddMilestoneButton is clicked', async () => {
    const user = userEvent.setup()
    const handleAddNew = vi.fn()
    
    render(<MilestonesSection milestones={mockMilestones} onAddNew={handleAddNew} />)
    
    const addButton = screen.getByRole('button', { name: 'Add new milestone' })
    await user.click(addButton)
    
    expect(handleAddNew).toHaveBeenCalledTimes(1)
  })

  it('renders without onAddNew handler', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const addButton = screen.getByRole('button', { name: 'Add new milestone' })
    expect(addButton).toBeInTheDocument()
  })

  it('has proper section accessibility attributes', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby', 'milestones-heading')
  })

  it('renders milestones with proper spacing', () => {
    const { container } = render(<MilestonesSection milestones={mockMilestones} />)
    
    // Find the div with space-y-3 class that contains the milestone cards
    const milestonesList = container.querySelector('.space-y-3')
    expect(milestonesList).toHaveClass('space-y-3')
  })

  it('renders header with proper layout', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const header = screen.getByRole('heading', { name: 'Milestones' }).parentElement
    expect(header).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'sm:items-center', 'sm:justify-between', 'gap-3', 'sm:gap-0', 'mb-4')
  })

  it('renders milestone cards with unique keys', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    // All milestone titles should be present (testing that keys work properly)
    mockMilestones.forEach(milestone => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument()
    })
  })

  it('handles single milestone correctly', () => {
    const singleMilestone = [mockMilestones[0]]
    render(<MilestonesSection milestones={singleMilestone} />)
    
    expect(screen.getByText('First milestone')).toBeInTheDocument()
    expect(screen.queryByText('Second milestone')).not.toBeInTheDocument()
    expect(screen.queryByText('Third milestone')).not.toBeInTheDocument()
  })

  it('has proper section styling', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('w-full')
  })

  it('renders heading with correct styling', () => {
    render(<MilestonesSection milestones={mockMilestones} />)
    
    const heading = screen.getByRole('heading', { name: 'Milestones' })
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-slate-900')
  })

  it('renders empty state with proper styling', () => {
    render(<MilestonesSection milestones={[]} />)
    
    const emptyState = screen.getByText('No milestones yet').parentElement
    expect(emptyState).toHaveClass('text-center', 'py-8', 'text-slate-500')
    
    const mainText = screen.getByText('No milestones yet')
    expect(mainText).toHaveClass('text-sm')
    
    const subText = screen.getByText('Click "Add New" to create your first milestone')
    expect(subText).toHaveClass('text-xs', 'mt-1')
  })
})