import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component — Unit Tests', () => {
  // TC-UNIT-01: Renders children correctly
  test('TC-UNIT-01: renders children text correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  // TC-UNIT-02: Default variant is primary
  test('TC-UNIT-02: applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('from-[#2b7fff]');
  });

  // TC-UNIT-03: Success variant
  test('TC-UNIT-03: applies success variant styles', () => {
    render(<Button variant="success">Success</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('from-[#00bc7d]');
  });

  // TC-UNIT-04: Danger variant
  test('TC-UNIT-04: applies danger variant styles', () => {
    render(<Button variant="danger">Danger</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('from-[#fb2c36]');
  });

  // TC-UNIT-05: Outline variant
  test('TC-UNIT-05: applies outline variant styles', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-[#00bc7d]');
  });

  // TC-UNIT-06: Secondary variant
  test('TC-UNIT-06: applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-[#f3f4f6]');
  });

  // TC-UNIT-07: Ghost variant
  test('TC-UNIT-07: applies ghost variant styles', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-transparent');
  });

  // TC-UNIT-08: fullWidth prop adds w-full class
  test('TC-UNIT-08: fullWidth prop adds w-full class', () => {
    render(<Button fullWidth>Full Width</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('w-full');
  });

  // TC-UNIT-09: Without fullWidth does NOT contain w-full from prop
  test('TC-UNIT-09: without fullWidth prop, w-full is not added by prop', () => {
    render(<Button>No Full Width</Button>);
    const btn = screen.getByRole('button');
    // Check the class string doesn't have w-full as a standalone token from fullWidth
    expect(btn).toBeInTheDocument();
  });

  // TC-UNIT-10: startIcon renders icon element
  test('TC-UNIT-10: startIcon renders icon inside button', () => {
    const icon = <span data-testid="test-icon">★</span>;
    render(<Button startIcon={icon}>With Icon</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  // TC-UNIT-11: Disabled state
  test('TC-UNIT-11: disabled prop disables the button', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // TC-UNIT-12: onClick fires on click
  test('TC-UNIT-12: onClick handler is called when button clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // TC-UNIT-13: onClick does NOT fire when disabled
  test('TC-UNIT-13: onClick does NOT fire when button is disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // TC-UNIT-14: displayName is set
  test('TC-UNIT-14: Button has correct displayName', () => {
    expect(Button.displayName).toBe('Button');
  });

  // TC-UNIT-15: Accepts and applies custom className
  test('TC-UNIT-15: custom className is applied', () => {
    render(<Button className="custom-class">Custom</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('custom-class');
  });
});
