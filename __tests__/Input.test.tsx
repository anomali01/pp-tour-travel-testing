import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../components/ui/Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders startIcon and endIcon', () => {
    render(
      <Input 
        startIcon={<span data-testid="start-icon">S</span>} 
        endIcon={<span data-testid="end-icon">E</span>} 
      />
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('applies focus styles correctly', () => {
    render(<Input placeholder="Focus me" />);
    const input = screen.getByPlaceholderText('Focus me');
    expect(input).toHaveClass('focus:border-[#00bc7d]');
  });
});
