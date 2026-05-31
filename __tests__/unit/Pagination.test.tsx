import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/ui/Pagination';

const mockOnPageChange = jest.fn();
const mockOnItemsPerPageChange = jest.fn();

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 50,
  itemsPerPage: 10,
  onPageChange: mockOnPageChange,
  onItemsPerPageChange: mockOnItemsPerPageChange,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Pagination Component — Unit Tests', () => {
  // TC-UNIT-71: Shows correct item range for first page
  test('TC-UNIT-71: shows correct item range text for first page', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('1-10 dari 50')).toBeInTheDocument();
  });

  // TC-UNIT-72: Shows correct item range for middle page
  test('TC-UNIT-72: shows correct item range for page 3 of 5', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    expect(screen.getByText('21-30 dari 50')).toBeInTheDocument();
  });

  // TC-UNIT-73: Shows correct item range for last page
  test('TC-UNIT-73: shows correct item range for the last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByText('41-50 dari 50')).toBeInTheDocument();
  });

  // TC-UNIT-74: Prev button disabled on page 1
  test('TC-UNIT-74: previous button is disabled when on page 1', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0]; // First button is prev
    expect(prevButton).toBeDisabled();
  });

  // TC-UNIT-75: Next button disabled on last page
  test('TC-UNIT-75: next button is disabled when on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1]; // Last button is next
    expect(nextButton).toBeDisabled();
  });

  // TC-UNIT-76: Prev button enabled on page 2
  test('TC-UNIT-76: previous button is enabled when not on first page', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toBeDisabled();
  });

  // TC-UNIT-77: Next button enabled on page 2
  test('TC-UNIT-77: next button is enabled when not on last page', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).not.toBeDisabled();
  });

  // TC-UNIT-78: Clicking prev button calls onPageChange with page-1
  test('TC-UNIT-78: clicking previous button calls onPageChange with currentPage - 1', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  // TC-UNIT-79: Clicking next button calls onPageChange with page+1
  test('TC-UNIT-79: clicking next button calls onPageChange with currentPage + 1', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  // TC-UNIT-80: Clicking a page number calls onPageChange with correct page
  test('TC-UNIT-80: clicking page 3 button calls onPageChange with 3', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const pageButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(pageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  // TC-UNIT-81: Shows ellipsis for many pages
  test('TC-UNIT-81: shows ellipsis (...) when there are many pages', () => {
    render(<Pagination {...defaultProps} totalPages={10} totalItems={100} currentPage={5} />);
    const allButtons = screen.getAllByRole('button');
    const allText = allButtons.map(b => b.textContent).join(' ');
    expect(allText).toContain('...');
  });

  // TC-UNIT-82: No ellipsis for few pages (≤5)
  test('TC-UNIT-82: shows all page numbers without ellipsis when totalPages <= 5', () => {
    render(<Pagination {...defaultProps} totalPages={4} totalItems={40} currentPage={2} />);
    // Pages 1,2,3,4 should all be visible
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
  });

  // TC-UNIT-83: Select items per page triggers callback
  test('TC-UNIT-83: changing items per page calls onItemsPerPageChange', () => {
    render(<Pagination {...defaultProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '25' } });
    expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(25);
  });

  // TC-UNIT-84: Shows total items count in text
  test('TC-UNIT-84: shows total item count in the display text', () => {
    render(<Pagination {...defaultProps} totalItems={75} />);
    expect(screen.getByText('dari 75 data')).toBeInTheDocument();
  });

  // TC-UNIT-85: startItem cannot be 0 for page 1
  test('TC-UNIT-85: startItem is 1 when on page 1', () => {
    render(<Pagination {...defaultProps} currentPage={1} itemsPerPage={10} totalItems={50} />);
    expect(screen.getByText('1-10 dari 50')).toBeInTheDocument();
  });
});
