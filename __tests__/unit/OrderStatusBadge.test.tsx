import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

describe('OrderStatusBadge Component — Unit Tests', () => {
  // TC-UNIT-86: 'dikonfirmasi' renders correct label
  test('TC-UNIT-86: dikonfirmasi status shows "Dikonfirmasi" label', () => {
    render(<OrderStatusBadge status="dikonfirmasi" />);
    expect(screen.getByText('Dikonfirmasi')).toBeInTheDocument();
  });

  // TC-UNIT-87: 'dikonfirmasi' has green background color
  test('TC-UNIT-87: dikonfirmasi status has green background class', () => {
    const { container } = render(<OrderStatusBadge status="dikonfirmasi" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-[#ecfdf5]');
  });

  // TC-UNIT-88: 'dikonfirmasi' has green text color on inner element
  test('TC-UNIT-88: dikonfirmasi status has green text applied to inner elements', () => {
    const { container } = render(<OrderStatusBadge status="dikonfirmasi" />);
    const greenTextElements = container.querySelectorAll('[class*="text-[#007a55]"]');
    expect(greenTextElements.length).toBeGreaterThan(0);
  });

  // TC-UNIT-89: 'pending' renders correct label
  test('TC-UNIT-89: pending status shows "Pending" label', () => {
    render(<OrderStatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  // TC-UNIT-90: 'pending' has yellow background color
  test('TC-UNIT-90: pending status has yellow background class', () => {
    const { container } = render(<OrderStatusBadge status="pending" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-[#fffbeb]');
  });

  // TC-UNIT-91: 'pending' has amber text on inner elements
  test('TC-UNIT-91: pending status has amber text applied to inner elements', () => {
    const { container } = render(<OrderStatusBadge status="pending" />);
    const amberElements = container.querySelectorAll('[class*="text-[#bb4d00]"]');
    expect(amberElements.length).toBeGreaterThan(0);
  });

  // TC-UNIT-92: 'dibatalkan' renders correct label
  test('TC-UNIT-92: dibatalkan status shows "Dibatalkan" label', () => {
    render(<OrderStatusBadge status="dibatalkan" />);
    expect(screen.getByText('Dibatalkan')).toBeInTheDocument();
  });

  // TC-UNIT-93: 'dibatalkan' has red background color
  test('TC-UNIT-93: dibatalkan status has red background class', () => {
    const { container } = render(<OrderStatusBadge status="dibatalkan" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-[#fef2f2]');
  });

  // TC-UNIT-94: 'dibatalkan' has red text on inner elements
  test('TC-UNIT-94: dibatalkan status has red text applied to inner elements', () => {
    const { container } = render(<OrderStatusBadge status="dibatalkan" />);
    const redElements = container.querySelectorAll('[class*="text-[#c10007]"]');
    expect(redElements.length).toBeGreaterThan(0);
  });

  // TC-UNIT-95: Badge renders as a div container
  test('TC-UNIT-95: badge renders as a container div element', () => {
    const { container } = render(<OrderStatusBadge status="dikonfirmasi" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  // TC-UNIT-96: Badge has rounded-full class for pill shape
  test('TC-UNIT-96: all badges have rounded-full pill shape class', () => {
    const { container } = render(<OrderStatusBadge status="pending" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('rounded-full');
  });

  // TC-UNIT-97: Badge contains an SVG icon
  test('TC-UNIT-97: badge includes an SVG icon element', () => {
    const { container } = render(<OrderStatusBadge status="dikonfirmasi" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
