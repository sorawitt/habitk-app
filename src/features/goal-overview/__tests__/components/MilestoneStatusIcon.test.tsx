import { MilestoneStatusIcon } from '../../components/MilestoneStatusIcon'
import { MilestoneStatus } from '../../types'
import { render, screen, describe, it, expect } from '../test-utils'

describe('MilestoneStatusIcon', () => {
  it('renders completed status with checkmark icon', () => {
    render(<MilestoneStatusIcon status={MilestoneStatus.COMPLETED} />)
    
    const icon = screen.getByRole('img', { name: 'Completed milestone' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('bg-green-100', 'text-green-600')
    expect(icon).toHaveTextContent('✓')
  })

  it('renders in progress status with bookmark icon', () => {
    render(<MilestoneStatusIcon status={MilestoneStatus.IN_PROGRESS} />)
    
    const icon = screen.getByRole('img', { name: 'In progress milestone' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('bg-slate-100', 'text-slate-600')
    expect(icon).toHaveTextContent('🔖')
  })

  it('renders not started status with clock icon', () => {
    render(<MilestoneStatusIcon status={MilestoneStatus.NOT_STARTED} />)
    
    const icon = screen.getByRole('img', { name: 'Not started milestone' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('bg-slate-50', 'text-slate-500')
    expect(icon).toHaveTextContent('🕐')
  })

  it('applies custom className when provided', () => {
    render(<MilestoneStatusIcon status={MilestoneStatus.COMPLETED} className="custom-class" />)
    
    const icon = screen.getByRole('img')
    expect(icon).toHaveClass('custom-class')
  })

  it('handles unknown status gracefully', () => {
    // @ts-expect-error Testing invalid status
    render(<MilestoneStatusIcon status="invalid_status" />)
    
    const icon = screen.getByRole('img', { name: 'Unknown milestone status' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('bg-slate-50', 'text-slate-500')
    expect(icon).toHaveTextContent('🕐')
  })

  it('has proper accessibility attributes', () => {
    render(<MilestoneStatusIcon status={MilestoneStatus.COMPLETED} />)
    
    const icon = screen.getByRole('img')
    expect(icon).toHaveAttribute('aria-label', 'Completed milestone')
    expect(icon).toHaveAttribute('role', 'img')
  })

  it('has correct base styling classes', () => {
    render(<MilestoneStatusIcon status={MilestoneStatus.COMPLETED} />)
    
    const icon = screen.getByRole('img')
    expect(icon).toHaveClass('w-8', 'h-8', 'rounded-full', 'flex', 'items-center', 'justify-center')
  })
})