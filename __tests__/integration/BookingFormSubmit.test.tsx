import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import BookingForm from '@/components/ui/BookingForm';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
  error: jest.fn(),
  success: jest.fn(),
}));

import toast from 'react-hot-toast';

const getFutureDate = (daysAhead: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

const defaultProps = {
  packagePrice: 'Rp 2.500.000',
  packageTitle: 'Bali Tour Package',
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /pesan sekarang/i }));
};

describe('BookingForm Submit Flow — Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // TC-INT-01: Renders all required form fields
  test('TC-INT-01: all required form fields are rendered on mount', () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('Masukkan nama lengkap')).toBeInTheDocument();
    expect(document.querySelector('input[type="date"]')).toBeTruthy();
    expect(document.querySelector('input[type="number"]')).toBeTruthy();
    expect(screen.getByPlaceholderText('email@domain.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('08123456789')).toBeInTheDocument();
  });

  // TC-INT-02: Submitting empty form shows all validation errors
  test('TC-INT-02: submitting empty form displays multiple validation error messages', async () => {
    render(<BookingForm {...defaultProps} />);
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Nama pemesan wajib diisi')).toBeInTheDocument();
    });
    expect(screen.getByText('Tanggal keberangkatan wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Email wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nomor WhatsApp wajib diisi')).toBeInTheDocument();
  });

  // TC-INT-03: Toast error fires on invalid form submission
  test('TC-INT-03: toast.error is called when submitting invalid form', async () => {
    render(<BookingForm {...defaultProps} />);
    submitForm();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Mohon lengkapi semua field yang wajib diisi');
    });
  });

  // TC-INT-04: Invalid email shows email format error
  test('TC-INT-04: invalid email format shows email validation error', async () => {
    render(<BookingForm {...defaultProps} />);

    // Fill all fields except use invalid email
    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), {
      target: { value: 'Budi Santoso' },
    });
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getFutureDate(7) } });
    const numberInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: '10' } });
    // Set invalid email format — has @ but no TLD (passes HTML5 type=email minimally but fails our regex)
    fireEvent.change(screen.getByPlaceholderText('email@domain.com'), {
      target: { value: 'user@domain' },
    });
    fireEvent.change(screen.getByPlaceholderText('08123456789'), {
      target: { value: '08123456789' },
    });

    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Format email tidak valid')).toBeInTheDocument();
    });
    // Name, date, pax, whatsapp should be valid — no errors for them
    expect(screen.queryByText('Nama pemesan wajib diisi')).not.toBeInTheDocument();
    expect(screen.queryByText('Tanggal keberangkatan wajib diisi')).not.toBeInTheDocument();
  });

  // TC-INT-05: Correcting a field clears its error (reactive error clearing)
  test('TC-INT-05: typing in name field after error clears the name error', async () => {
    render(<BookingForm {...defaultProps} />);
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Nama pemesan wajib diisi')).toBeInTheDocument();
    });

    // Now type in the name field — error should clear
    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), {
      target: { value: 'B' },
    });

    await waitFor(() => {
      expect(screen.queryByText('Nama pemesan wajib diisi')).not.toBeInTheDocument();
    });
  });

  // TC-INT-06: Short name (< 3 chars) shows min length error
  test('TC-INT-06: name with fewer than 3 characters shows min length error', async () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), {
      target: { value: 'AB' },
    });
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Nama minimal 3 karakter')).toBeInTheDocument();
    });
  });

  // TC-INT-07: WhatsApp too short shows format error
  test('TC-INT-07: WhatsApp with fewer than 10 digits shows format error', async () => {
    render(<BookingForm {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('08123456789'), {
      target: { value: '081234' },
    });
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Nomor WhatsApp tidak valid (10-15 digit)')).toBeInTheDocument();
    });
  });

  // TC-INT-08: Submit button shows "Memproses..." during submission
  test('TC-INT-08: submit button shows loading text during form submission', async () => {
    render(<BookingForm {...defaultProps} />);

    // Fill all valid fields
    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), {
      target: { value: 'Budi Santoso' },
    });
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getFutureDate(7) } });
    const numberInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('email@domain.com'), {
      target: { value: 'budi@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('08123456789'), {
      target: { value: '08123456789' },
    });

    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Memproses...')).toBeInTheDocument();
    });
  });

  // TC-INT-09: Successful submission calls toast.success
  test('TC-INT-09: valid form submission eventually calls toast.success', async () => {
    render(<BookingForm {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), {
      target: { value: 'Budi Santoso' },
    });
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getFutureDate(7) } });
    const numberInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('email@domain.com'), {
      target: { value: 'budi@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('08123456789'), {
      target: { value: '08123456789' },
    });

    submitForm();

    act(() => { jest.advanceTimersByTime(1500); });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Pesanan Anda telah dikirim! Kami akan menghubungi Anda segera.'
      );
    });
  });

  // TC-INT-10: Form resets after successful submission
  test('TC-INT-10: form fields are reset to empty after successful submission', async () => {
    render(<BookingForm {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), {
      target: { value: 'Budi Santoso' },
    });
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: getFutureDate(7) } });
    const numberInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('email@domain.com'), {
      target: { value: 'budi@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('08123456789'), {
      target: { value: '08123456789' },
    });

    submitForm();
    act(() => { jest.advanceTimersByTime(1500); });

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Masukkan nama lengkap') as HTMLInputElement;
      expect(nameInput.value).toBe('');
    });
  });
});
