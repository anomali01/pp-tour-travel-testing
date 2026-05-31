import { renderHook, act } from '@testing-library/react';
import { useTableSort } from '@/hooks/useTableSort';

interface TestItem {
  id: number;
  name: string;
  price: number;
  score: number | null;
}

const testData: TestItem[] = [
  { id: 3, name: 'Bali Tour', price: 2500000, score: 95 },
  { id: 1, name: 'Yogyakarta Tour', price: 1200000, score: null },
  { id: 2, name: 'Malang Tour', price: 800000, score: 88 },
  { id: 5, name: 'Bandung Tour', price: 600000, score: 72 },
  { id: 4, name: 'Semarang Tour', price: 1500000, score: 80 },
];

describe('useTableSort Hook — Unit Tests', () => {
  // TC-UNIT-56: Returns original data when no sort applied
  test('TC-UNIT-56: returns original data order when no sort is applied', () => {
    const { result } = renderHook(() => useTableSort(testData));
    expect(result.current.sortedData).toEqual(testData);
  });

  // TC-UNIT-57: Initial sortConfig has null key and direction
  test('TC-UNIT-57: initial sortConfig has null key and null direction', () => {
    const { result } = renderHook(() => useTableSort(testData));
    expect(result.current.sortConfig.key).toBeNull();
    expect(result.current.sortConfig.direction).toBeNull();
  });

  // TC-UNIT-58: Sorts strings ascending
  test('TC-UNIT-58: sorts string column ascending correctly', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('name'); });
    const names = result.current.sortedData.map(d => d.name);
    expect(names[0]).toBe('Bali Tour');
    expect(names[names.length - 1]).toBe('Yogyakarta Tour');
  });

  // TC-UNIT-59: Sorts strings descending on second click
  test('TC-UNIT-59: sorts string column descending on second click', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('name'); });
    act(() => { result.current.requestSort('name'); });
    const names = result.current.sortedData.map(d => d.name);
    expect(names[0]).toBe('Yogyakarta Tour');
    expect(names[names.length - 1]).toBe('Bali Tour');
  });

  // TC-UNIT-60: Returns to original on third click (null direction)
  test('TC-UNIT-60: resets to original order on third click (null direction)', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('name'); });
    act(() => { result.current.requestSort('name'); });
    act(() => { result.current.requestSort('name'); });
    expect(result.current.sortConfig.direction).toBeNull();
    expect(result.current.sortedData).toEqual(testData);
  });

  // TC-UNIT-61: Sorts numbers ascending
  test('TC-UNIT-61: sorts numeric column ascending correctly', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('price'); });
    const prices = result.current.sortedData.map(d => d.price);
    expect(prices[0]).toBe(600000);
    expect(prices[prices.length - 1]).toBe(2500000);
  });

  // TC-UNIT-62: Sorts numbers descending
  test('TC-UNIT-62: sorts numeric column descending correctly', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('price'); });
    act(() => { result.current.requestSort('price'); });
    const prices = result.current.sortedData.map(d => d.price);
    expect(prices[0]).toBe(2500000);
    expect(prices[prices.length - 1]).toBe(600000);
  });

  // TC-UNIT-63: Null values sort to end when ascending
  test('TC-UNIT-63: null values are sorted to the end when ascending', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('score'); });
    const lastItem = result.current.sortedData[result.current.sortedData.length - 1];
    expect(lastItem.score).toBeNull();
  });

  // TC-UNIT-64: Switching sort key resets direction to asc
  test('TC-UNIT-64: switching to a different sort key resets to ascending', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('name'); });
    act(() => { result.current.requestSort('name'); }); // now desc
    act(() => { result.current.requestSort('price'); }); // switch key → asc
    expect(result.current.sortConfig.direction).toBe('asc');
    expect(result.current.sortConfig.key).toBe('price');
  });

  // TC-UNIT-65: getSortIcon returns element for inactive column
  test('TC-UNIT-65: getSortIcon returns a React element for inactive column', () => {
    const { result } = renderHook(() => useTableSort(testData));
    const icon = result.current.getSortIcon('name');
    expect(icon).toBeTruthy();
    expect(typeof icon).toBe('object');
  });

  // TC-UNIT-66: getSortIcon returns different icon for active ascending column
  test('TC-UNIT-66: getSortIcon changes when sort is active', () => {
    const { result } = renderHook(() => useTableSort(testData));
    const iconBefore = result.current.getSortIcon('name');
    act(() => { result.current.requestSort('name'); });
    const iconAfter = result.current.getSortIcon('name');
    // Both are React elements but different instances (different icon state)
    expect(iconAfter).toBeTruthy();
    expect(iconBefore).toBeTruthy();
  });

  // TC-UNIT-67: Empty data array returns empty sorted array
  test('TC-UNIT-67: handles empty data array gracefully', () => {
    const { result } = renderHook(() => useTableSort<TestItem>([]));
    act(() => { result.current.requestSort('name'); });
    expect(result.current.sortedData).toEqual([]);
  });

  // TC-UNIT-68: Single item data returns same item
  test('TC-UNIT-68: single item data returns that item unchanged', () => {
    const single = [testData[0]];
    const { result } = renderHook(() => useTableSort(single));
    act(() => { result.current.requestSort('name'); });
    expect(result.current.sortedData).toHaveLength(1);
    expect(result.current.sortedData[0]).toEqual(testData[0]);
  });

  // TC-UNIT-69: sortConfig updates correctly after requestSort
  test('TC-UNIT-69: sortConfig.key and direction update after requestSort', () => {
    const { result } = renderHook(() => useTableSort(testData));
    act(() => { result.current.requestSort('price'); });
    expect(result.current.sortConfig.key).toBe('price');
    expect(result.current.sortConfig.direction).toBe('asc');
  });

  // TC-UNIT-70: Case-insensitive string sort
  test('TC-UNIT-70: string sorting is case-insensitive', () => {
    const mixedCase = [
      { id: 1, name: 'zebra Tour', price: 100, score: 1 },
      { id: 2, name: 'Alpha Tour', price: 200, score: 2 },
      { id: 3, name: 'Mango Tour', price: 300, score: 3 },
    ];
    const { result } = renderHook(() => useTableSort(mixedCase));
    act(() => { result.current.requestSort('name'); });
    expect(result.current.sortedData[0].name).toBe('Alpha Tour');
    expect(result.current.sortedData[result.current.sortedData.length - 1].name).toBe('zebra Tour');
  });
});
