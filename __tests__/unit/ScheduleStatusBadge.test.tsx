import React from 'react';
import { render, screen } from '@testing-library/react';
import ScheduleStatusBadge from '@/components/admin/ScheduleStatusBadge';

describe('ScheduleStatusBadge Component — Unit Tests', () => {
  // TC-UNIT-110: 'active' renders correct label
  test('TC-UNIT-110: active status renders "Aktif" label', () => {
    render(<ScheduleStatusBadge status="active" />);
    expect(screen.getByText('Aktif')).toBeInTheDocument();
  });

  // TC-UNIT-111: 'active' has emerald background
  test('TC-UNIT-111: active status has emerald background class', () => {
    const { container } = render(<ScheduleStatusBadge status="active" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-emerald-50');
  });

  // TC-UNIT-112: 'active' has emerald border
  test('TC-UNIT-112: active status has emerald border class', () => {
    const { container } = render(<ScheduleStatusBadge status="active" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('border-emerald-200');
  });

  // TC-UNIT-113: 'active' text color is on the span inside the badge
  test('TC-UNIT-113: active status icon div has emerald text class', () => {
    const { container } = render(<ScheduleStatusBadge status="active" />);
    // The textColor class is applied to inner div and span elements
    const allElements = container.querySelectorAll('[class*="text-emerald"]');
    expect(allElements.length).toBeGreaterThan(0);
  });

  // TC-UNIT-114: 'inactive' renders correct label
  test('TC-UNIT-114: inactive status renders "Tidak Aktif" label', () => {
    render(<ScheduleStatusBadge status="inactive" />);
    expect(screen.getByText('Tidak Aktif')).toBeInTheDocument();
  });

  // TC-UNIT-115: 'inactive' has red background
  test('TC-UNIT-115: inactive status has red background class', () => {
    const { container } = render(<ScheduleStatusBadge status="inactive" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-red-50');
  });

  // TC-UNIT-116: 'inactive' has red border
  test('TC-UNIT-116: inactive status has red border class', () => {
    const { container } = render(<ScheduleStatusBadge status="inactive" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('border-red-200');
  });

  // TC-UNIT-117: 'inactive' text color is on inner elements
  test('TC-UNIT-117: inactive status has red text applied to inner elements', () => {
    const { container } = render(<ScheduleStatusBadge status="inactive" />);
    const allElements = container.querySelectorAll('[class*="text-red"]');
    expect(allElements.length).toBeGreaterThan(0);
  });

  // TC-UNIT-118: Badge has rounded-full pill shape
  test('TC-UNIT-118: badge has rounded-full pill shape class', () => {
    const { container } = render(<ScheduleStatusBadge status="active" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('rounded-full');
  });

  // TC-UNIT-119: Badge uses inline-flex for layout
  test('TC-UNIT-119: badge uses inline-flex layout class', () => {
    const { container } = render(<ScheduleStatusBadge status="active" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('inline-flex');
  });

  // TC-UNIT-120: Active badge contains SVG icon
  test('TC-UNIT-120: active badge contains a checkmark SVG icon', () => {
    const { container } = render(<ScheduleStatusBadge status="active" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  // TC-UNIT-121: Inactive badge contains SVG icon
  test('TC-UNIT-121: inactive badge contains an X SVG icon', () => {
    const { container } = render(<ScheduleStatusBadge status="inactive" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
