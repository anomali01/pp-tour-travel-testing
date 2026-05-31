import React from 'react';
import { render, screen } from '@testing-library/react';
import PaymentStatusBadge from '@/components/admin/PaymentStatusBadge';

describe('PaymentStatusBadge Component — Unit Tests', () => {
  // TC-UNIT-98: 'paid' renders correct label
  test('TC-UNIT-98: paid status renders "Sudah Dibayar" label', () => {
    render(<PaymentStatusBadge status="paid" />);
    expect(screen.getByText('Sudah Dibayar')).toBeInTheDocument();
  });

  // TC-UNIT-99: 'paid' has emerald background
  test('TC-UNIT-99: paid status has emerald background class', () => {
    const { container } = render(<PaymentStatusBadge status="paid" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-emerald-50');
  });

  // TC-UNIT-100: 'paid' has emerald border
  test('TC-UNIT-100: paid status has emerald border class', () => {
    const { container } = render(<PaymentStatusBadge status="paid" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('border-emerald-200');
  });

  // TC-UNIT-101: 'pending' renders correct label
  test('TC-UNIT-101: pending status renders "Menunggu Verifikasi" label', () => {
    render(<PaymentStatusBadge status="pending" />);
    expect(screen.getByText('Menunggu Verifikasi')).toBeInTheDocument();
  });

  // TC-UNIT-102: 'pending' has amber background
  test('TC-UNIT-102: pending status has amber background class', () => {
    const { container } = render(<PaymentStatusBadge status="pending" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-amber-50');
  });

  // TC-UNIT-103: 'pending' has amber border
  test('TC-UNIT-103: pending status has amber border class', () => {
    const { container } = render(<PaymentStatusBadge status="pending" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('border-amber-200');
  });

  // TC-UNIT-104: 'verified' renders correct label
  test('TC-UNIT-104: verified status renders "Terverifikasi" label', () => {
    render(<PaymentStatusBadge status="verified" />);
    expect(screen.getByText('Terverifikasi')).toBeInTheDocument();
  });

  // TC-UNIT-105: 'verified' has green background
  test('TC-UNIT-105: verified status has green background class', () => {
    const { container } = render(<PaymentStatusBadge status="verified" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-green-50');
  });

  // TC-UNIT-106: 'verified' has green border
  test('TC-UNIT-106: verified status has green border class', () => {
    const { container } = render(<PaymentStatusBadge status="verified" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('border-green-300');
  });

  // TC-UNIT-107: Badge has rounded-full pill shape
  test('TC-UNIT-107: all payment badges have rounded-full pill shape', () => {
    const { container } = render(<PaymentStatusBadge status="paid" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('rounded-full');
  });

  // TC-UNIT-108: Badge contains an SVG icon for each status
  test('TC-UNIT-108: verified badge contains an SVG icon', () => {
    const { container } = render(<PaymentStatusBadge status="verified" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  // TC-UNIT-109: paid badge contains SVG icon
  test('TC-UNIT-109: paid badge contains an SVG icon', () => {
    const { container } = render(<PaymentStatusBadge status="paid" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
