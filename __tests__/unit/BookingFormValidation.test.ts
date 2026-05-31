/**
 * Pure logic unit tests for BookingForm validation.
 * We extract and test the validation logic in isolation (no React rendering needed).
 */

interface FormData {
  name: string;
  departureDate: string;
  pax: string;
  institution: string;
  email: string;
  whatsapp: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  departureDate?: string;
  pax?: string;
  email?: string;
  whatsapp?: string;
}

// Pure validation function extracted from BookingForm.tsx for unit testing
function validateBookingForm(formData: FormData): FormErrors {
  const newErrors: FormErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = 'Nama pemesan wajib diisi';
  } else if (formData.name.trim().length < 3) {
    newErrors.name = 'Nama minimal 3 karakter';
  }

  // Departure date validation
  if (!formData.departureDate) {
    newErrors.departureDate = 'Tanggal keberangkatan wajib diisi';
  } else {
    const selectedDate = new Date(formData.departureDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.departureDate = 'Tanggal keberangkatan tidak boleh di masa lalu';
    }
  }

  // PAX validation
  const paxNumber = parseInt(formData.pax);
  if (!formData.pax || isNaN(paxNumber)) {
    newErrors.pax = 'Jumlah PAX wajib diisi';
  } else if (paxNumber < 1) {
    newErrors.pax = 'Jumlah PAX minimal 1 orang';
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email wajib diisi';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Format email tidak valid';
  }

  // WhatsApp validation
  if (!formData.whatsapp.trim()) {
    newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
  } else if (!/^[0-9]{10,15}$/.test(formData.whatsapp.replace(/[\s-]/g, ''))) {
    newErrors.whatsapp = 'Nomor WhatsApp tidak valid (10-15 digit)';
  }

  return newErrors;
}

const getFutureDate = (daysAhead: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

const getPastDate = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const validFormData: FormData = {
  name: 'Budi Santoso',
  departureDate: getFutureDate(7),
  pax: '10',
  institution: 'PT Maju Jaya',
  email: 'budi@example.com',
  whatsapp: '08123456789',
  notes: '',
};

describe('BookingForm Validation Logic — Unit Tests', () => {
  // TC-UNIT-31: All valid → no errors
  test('TC-UNIT-31: valid form data returns empty errors object', () => {
    const errors = validateBookingForm(validFormData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  // TC-UNIT-32: Empty name → required error
  test('TC-UNIT-32: empty name returns required error', () => {
    const errors = validateBookingForm({ ...validFormData, name: '' });
    expect(errors.name).toBe('Nama pemesan wajib diisi');
  });

  // TC-UNIT-33: Whitespace-only name → required error
  test('TC-UNIT-33: whitespace-only name returns required error', () => {
    const errors = validateBookingForm({ ...validFormData, name: '   ' });
    expect(errors.name).toBe('Nama pemesan wajib diisi');
  });

  // TC-UNIT-34: Name less than 3 chars → min length error
  test('TC-UNIT-34: name with 2 characters returns min length error', () => {
    const errors = validateBookingForm({ ...validFormData, name: 'AB' });
    expect(errors.name).toBe('Nama minimal 3 karakter');
  });

  // TC-UNIT-35: Name with exactly 3 chars → no name error
  test('TC-UNIT-35: name with exactly 3 characters is valid', () => {
    const errors = validateBookingForm({ ...validFormData, name: 'Abi' });
    expect(errors.name).toBeUndefined();
  });

  // TC-UNIT-36: Missing departure date → required error
  test('TC-UNIT-36: missing departure date returns required error', () => {
    const errors = validateBookingForm({ ...validFormData, departureDate: '' });
    expect(errors.departureDate).toBe('Tanggal keberangkatan wajib diisi');
  });

  // TC-UNIT-37: Past date → past date error
  test('TC-UNIT-37: past departure date returns past date error', () => {
    const errors = validateBookingForm({ ...validFormData, departureDate: getPastDate(1) });
    expect(errors.departureDate).toBe('Tanggal keberangkatan tidak boleh di masa lalu');
  });

  // TC-UNIT-38: Future date → no date error
  test('TC-UNIT-38: future departure date is valid', () => {
    const errors = validateBookingForm({ ...validFormData, departureDate: getFutureDate(1) });
    expect(errors.departureDate).toBeUndefined();
  });

  // TC-UNIT-39: Empty PAX → required error
  test('TC-UNIT-39: empty PAX returns required error', () => {
    const errors = validateBookingForm({ ...validFormData, pax: '' });
    expect(errors.pax).toBe('Jumlah PAX wajib diisi');
  });

  // TC-UNIT-40: PAX = 0 → min value error
  test('TC-UNIT-40: PAX value of 0 returns minimum error', () => {
    const errors = validateBookingForm({ ...validFormData, pax: '0' });
    expect(errors.pax).toBe('Jumlah PAX minimal 1 orang');
  });

  // TC-UNIT-41: PAX = -5 → min value error
  test('TC-UNIT-41: negative PAX returns minimum error', () => {
    const errors = validateBookingForm({ ...validFormData, pax: '-5' });
    expect(errors.pax).toBe('Jumlah PAX minimal 1 orang');
  });

  // TC-UNIT-42: PAX = 1 → valid
  test('TC-UNIT-42: PAX value of 1 is valid', () => {
    const errors = validateBookingForm({ ...validFormData, pax: '1' });
    expect(errors.pax).toBeUndefined();
  });

  // TC-UNIT-43: Empty email → required error
  test('TC-UNIT-43: empty email returns required error', () => {
    const errors = validateBookingForm({ ...validFormData, email: '' });
    expect(errors.email).toBe('Email wajib diisi');
  });

  // TC-UNIT-44: Invalid email format → format error
  test('TC-UNIT-44: email without @ returns format error', () => {
    const errors = validateBookingForm({ ...validFormData, email: 'notanemail' });
    expect(errors.email).toBe('Format email tidak valid');
  });

  // TC-UNIT-45: Email missing TLD → format error
  test('TC-UNIT-45: email without domain TLD returns format error', () => {
    const errors = validateBookingForm({ ...validFormData, email: 'user@domain' });
    expect(errors.email).toBe('Format email tidak valid');
  });

  // TC-UNIT-46: Valid email → no email error
  test('TC-UNIT-46: valid email format passes validation', () => {
    const errors = validateBookingForm({ ...validFormData, email: 'user@domain.co.id' });
    expect(errors.email).toBeUndefined();
  });

  // TC-UNIT-47: Empty WhatsApp → required error
  test('TC-UNIT-47: empty WhatsApp number returns required error', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '' });
    expect(errors.whatsapp).toBe('Nomor WhatsApp wajib diisi');
  });

  // TC-UNIT-48: WhatsApp too short (9 digits) → format error
  test('TC-UNIT-48: WhatsApp with 9 digits returns format error', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '081234567' });
    expect(errors.whatsapp).toBe('Nomor WhatsApp tidak valid (10-15 digit)');
  });

  // TC-UNIT-49: WhatsApp too long (16 digits) → format error
  test('TC-UNIT-49: WhatsApp with 16 digits returns format error', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '0812345678901234' });
    expect(errors.whatsapp).toBe('Nomor WhatsApp tidak valid (10-15 digit)');
  });

  // TC-UNIT-50: WhatsApp with dashes/spaces → valid (after sanitization)
  test('TC-UNIT-50: WhatsApp with dashes is valid if digits are 10-15', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '0812-3456-789' });
    expect(errors.whatsapp).toBeUndefined();
  });

  // TC-UNIT-51: WhatsApp with spaces → valid if digits are 10-15
  test('TC-UNIT-51: WhatsApp with spaces is valid if digits are 10-15', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '0812 3456 789' });
    expect(errors.whatsapp).toBeUndefined();
  });

  // TC-UNIT-52: WhatsApp with exactly 10 digits → valid
  test('TC-UNIT-52: WhatsApp with exactly 10 digits is valid', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '0812345678' });
    expect(errors.whatsapp).toBeUndefined();
  });

  // TC-UNIT-53: WhatsApp with exactly 15 digits → valid
  test('TC-UNIT-53: WhatsApp with exactly 15 digits is valid', () => {
    const errors = validateBookingForm({ ...validFormData, whatsapp: '081234567890123' });
    expect(errors.whatsapp).toBeUndefined();
  });

  // TC-UNIT-54: Multiple invalid fields → multiple errors returned
  test('TC-UNIT-54: multiple invalid fields produce multiple errors simultaneously', () => {
    const errors = validateBookingForm({
      name: '',
      departureDate: '',
      pax: '',
      institution: '',
      email: '',
      whatsapp: '',
      notes: '',
    });
    expect(errors.name).toBeDefined();
    expect(errors.departureDate).toBeDefined();
    expect(errors.pax).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.whatsapp).toBeDefined();
    expect(Object.keys(errors)).toHaveLength(5);
  });

  // TC-UNIT-55: Institution field is optional, no validation error
  test('TC-UNIT-55: empty institution field does not produce an error', () => {
    const errors = validateBookingForm({ ...validFormData, institution: '' });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
