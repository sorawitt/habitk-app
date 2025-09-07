import userEvent from '@testing-library/user-event'
import { MilestoneCard } from '../../components/MilestoneCard'
import { MilestoneStatus, type Milestone } from '../../types'
import { render, screen, describe, it, expect, vi } from '../test-utils'

const mockMilestone: Milestone = {
    id: '1',
    title: 'Test milestone',
    status: MilestoneStatus.IN_PROGRESS,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
}

describe('MilestoneCard', () => {
    it('renders milestone title and status', () => {
        render(<MilestoneCard milestone={mockMilestone} />)

        expect(screen.getByText('Test milestone')).toBeInTheDocument()
        expect(screen.getByText('In Progress')).toBeInTheDocument()
    })

    it('renders completed milestone with correct styling', () => {
        const completedMilestone: Milestone = {
            ...mockMilestone,
            status: MilestoneStatus.COMPLETED
        }

        render(<MilestoneCard milestone={completedMilestone} />)

        expect(screen.getByText('Completed')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toHaveClass('text-green-600')
    })

    it('renders not started milestone with correct styling', () => {
        const notStartedMilestone: Milestone = {
            ...mockMilestone,
            status: MilestoneStatus.NOT_STARTED
        }

        render(<MilestoneCard milestone={notStartedMilestone} />)

        expect(screen.getByText('Not Started')).toBeInTheDocument()
        expect(screen.getByText('Not Started')).toHaveClass('text-slate-500')
    })

    it('renders in progress milestone with correct styling', () => {
        render(<MilestoneCard milestone={mockMilestone} />)

        expect(screen.getByText('In Progress')).toBeInTheDocument()
        expect(screen.getByText('In Progress')).toHaveClass('text-slate-600')
    })

    it('handles unknown status gracefully', () => {
        const unknownStatusMilestone = {
            ...mockMilestone,
            status: 'unknown_status'
        } as unknown as Milestone

        render(<MilestoneCard milestone={unknownStatusMilestone} />)

        expect(screen.getByText('Unknown')).toBeInTheDocument()
        expect(screen.getByText('Unknown')).toHaveClass('text-slate-500')
    })

    it('renders without click handler when onClick is not provided', () => {
        render(<MilestoneCard milestone={mockMilestone} />)

        const card = screen.getByText('Test milestone').closest('div')
        expect(card).not.toHaveClass('cursor-pointer')
        expect(card).not.toHaveAttribute('tabIndex')
        expect(card).not.toHaveAttribute('role', 'button')
    })

    it('renders with click handler when onClick is provided', () => {
        const handleClick = vi.fn()
        render(<MilestoneCard milestone={mockMilestone} onClick={handleClick} />)

        const card = screen.getByRole('button')
        expect(card).toHaveClass('cursor-pointer')
        expect(card).toHaveAttribute('tabIndex', '0')
        expect(card).toHaveAttribute('aria-label', 'View milestone: Test milestone, status: In Progress')
    })

    it('calls onClick when card is clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<MilestoneCard milestone={mockMilestone} onClick={handleClick} />)

        const card = screen.getByRole('button')
        await user.click(card)

        expect(handleClick).toHaveBeenCalledTimes(1)
        expect(handleClick).toHaveBeenCalledWith(mockMilestone)
    })

    it('calls onClick when Enter key is pressed', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<MilestoneCard milestone={mockMilestone} onClick={handleClick} />)

        const card = screen.getByRole('button')
        card.focus()
        await user.keyboard('{Enter}')

        expect(handleClick).toHaveBeenCalledTimes(1)
        expect(handleClick).toHaveBeenCalledWith(mockMilestone)
    })

    it('calls onClick when Space key is pressed', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<MilestoneCard milestone={mockMilestone} onClick={handleClick} />)

        const card = screen.getByRole('button')
        card.focus()
        await user.keyboard(' ')

        expect(handleClick).toHaveBeenCalledTimes(1)
        expect(handleClick).toHaveBeenCalledWith(mockMilestone)
    })

    it('does not call onClick for other keys', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<MilestoneCard milestone={mockMilestone} onClick={handleClick} />)

        const card = screen.getByRole('button')
        card.focus()
        await user.keyboard('{Escape}')

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('includes MilestoneStatusIcon component', () => {
        render(<MilestoneCard milestone={mockMilestone} />)

        // The status icon should be present
        expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('truncates long milestone titles', () => {
        const longTitleMilestone: Milestone = {
            ...mockMilestone,
            title: 'This is a very long milestone title that should be truncated when displayed in the card'
        }

        render(<MilestoneCard milestone={longTitleMilestone} />)

        const titleElement = screen.getByText(longTitleMilestone.title)
        expect(titleElement).toHaveClass('break-words', 'sm:truncate')
    })

    it('has proper card styling', () => {
        const { container } = render(<MilestoneCard milestone={mockMilestone} />)

        // Get the outermost div which is the card container
        const card = container.firstChild as HTMLElement
        expect(card).toHaveClass(
            'rounded-lg',
            'border',
            'border-slate-200',
            'bg-white',
            'p-4',
            'shadow-sm'
        )
    })

    it('shows hover effects when clickable', () => {
        const handleClick = vi.fn()
        render(<MilestoneCard milestone={mockMilestone} onClick={handleClick} />)

        const card = screen.getByRole('button')
        expect(card).toHaveClass(
            'hover:shadow-md',
            'hover:border-slate-300',
            'transition-all',
            'duration-200'
        )
    })
})