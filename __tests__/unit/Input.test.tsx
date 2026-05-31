import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/Input';

describe('Input Component — Unit Tests', () => {
  // TC-UNIT-16: Renders input element
  test('TC-UNIT-16: renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // TC-UNIT-17: Renders label when provided
  test('TC-UNIT-17: renders label when label prop is provided', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  // TC-UNIT-18: Does not render label when not provided
  test('TC-UNIT-18: does not render label when label prop is absent', () => {
    const { queryByRole } = render(<Input />);
    // No label element
    expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
  });

  // TC-UNIT-19: startIcon shifts padding to pl-12
  test('TC-UNIT-19: when startIcon is provided, input has pl-12 class', () => {
    const icon = <span data-testid="start-icon">@</span>;
    render(<Input startIcon={icon} />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('pl-12');
  });

  // TC-UNIT-20: Without startIcon, input has pl-4
  test('TC-UNIT-20: without startIcon, input has pl-4 class', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('pl-4');
  });

  // TC-UNIT-21: endIcon shifts padding to pr-12
  test('TC-UNIT-21: when endIcon is provided, input has pr-12 class', () => {
    const icon = <span data-testid="end-icon">👁</span>;
    render(<Input endIcon={icon} />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('pr-12');
  });

  // TC-UNIT-22: Without endIcon, input has pr-4
  test('TC-UNIT-22: without endIcon, input has pr-4 class', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('pr-4');
  });

  // TC-UNIT-23: Placeholder is rendered
  test('TC-UNIT-23: placeholder attribute is applied to input', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  // TC-UNIT-24: Custom className is applied
  test('TC-UNIT-24: custom className is merged into input', () => {
    render(<Input className="my-custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('my-custom-class');
  });

  // TC-UNIT-25: Forwards ref to underlying input
  test('TC-UNIT-25: ref is forwarded to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // TC-UNIT-26: displayName is set
  test('TC-UNIT-26: Input has correct displayName', () => {
    expect(Input.displayName).toBe('Input');
  });

  // TC-UNIT-27: Renders startIcon element in DOM
  test('TC-UNIT-27: startIcon element is rendered in DOM', () => {
    render(<Input startIcon={<span data-testid="si">S</span>} />);
    expect(screen.getByTestId('si')).toBeInTheDocument();
  });

  // TC-UNIT-28: Renders endIcon element in DOM
  test('TC-UNIT-28: endIcon element is rendered in DOM', () => {
    render(<Input endIcon={<span data-testid="ei">E</span>} />);
    expect(screen.getByTestId('ei')).toBeInTheDocument();
  });

  // TC-UNIT-29: Has default styling classes
  test('TC-UNIT-29: input has base border and rounded classes', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('border-2');
    expect(input.className).toContain('rounded-[16.4px]');
  });

  // TC-UNIT-30: containerClassName applies to wrapper div
  test('TC-UNIT-30: containerClassName is applied to the wrapper div', () => {
    const { container } = render(<Input containerClassName="wrapper-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('wrapper-class');
  });
});
