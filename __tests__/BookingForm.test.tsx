import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../components/ui/BookingForm';
import toast from 'react-hot-toast';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

describe('BookingForm Validation', () => {
  const defaultProps = {
    packagePrice: 'Rp 1.500.000',
    packageTitle: 'Paket Wisata Bali',
  };

  it('shows error messages for empty required fields on submit', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const submitButton = screen.getByText('Pesan Sekarang');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Nama pemesan wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Tanggal keberangkatan wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Email wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nomor WhatsApp wajib diisi')).toBeInTheDocument();
  });

  it('successfully submits the form with valid data', async () => {
    render(<BookingForm {...defaultProps} />);
    
    fireEvent.change(screen.getByPlaceholderText('Masukkan nama lengkap'), { target: { value: 'John Doe' } });
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: dateStr } });

    fireEvent.change(screen.getByPlaceholderText('email@domain.com'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('08123456789'), { target: { value: '081234567890' } });
    
    const submitButton = screen.getByText('Pesan Sekarang');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Pesanan Anda telah dikirim! Kami akan menghubungi Anda segera.');
    }, { timeout: 3000 });
  });
});
