import userEvent from '@testing-library/user-event'
import { AddMilestoneButton } from '../../components/AddMilestoneButton'
import { render, screen, describe, it, expect, vi } from '../test-utils'

describe('AddMilestoneButton', () => {
  it('renders button with correct text and icon', () => {
    render(<AddMilestoneButton />)
    
    const button = screen.getByRole('button', { name: 'Add new milestone' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Add New')
    expect(button).toHaveTextContent('+')
  })

  it('has proper accessibility attributes', () => {
    render(<AddMilestoneButton />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Add new milestone')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('has correct styling classes', () => {
    render(<AddMilestoneButton />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'gap-2',
      'px-3',
      'py-2',
      'text-sm',
      'font-medium',
      'text-slate-700',
      'bg-white',
      'border',
      'border-slate-200',
      'rounded-lg',
      'hover:bg-slate-50',
      'hover:border-slate-300',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-slate-500',
      'focus:ring-offset-2',
      'transition-all',
      'duration-200'
    )
  })

  it('calls onClick when button is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<AddMilestoneButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<AddMilestoneButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<AddMilestoneButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard(' ')
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick for other keys', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<AddMilestoneButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Escape}')
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('works without onClick handler', async () => {
    const user = userEvent.setup()
    
    render(<AddMilestoneButton />)
    
    const button = screen.getByRole('button')
    
    // Should not throw error when clicked without handler
    await user.click(button)
    expect(button).toBeInTheDocument()
  })

  it('has correct icon styling', () => {
    render(<AddMilestoneButton />)
    
    const icon = screen.getByText('+')
    expect(icon).toHaveClass('w-4', 'h-4', 'flex', 'items-center', 'justify-center', 'text-slate-500')
  })

  it('has correct text styling', () => {
    render(<AddMilestoneButton />)
    
    const text = screen.getByText('Add New')
    expect(text.tagName).toBe('SPAN')
  })

  it('prevents default behavior on keyboard events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<AddMilestoneButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    button.focus()
    
    // Test that preventDefault is called (indirectly by ensuring onClick is called)
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})