import { describe, it, expect } from 'vitest';

import { orderSlice } from './orderSlice';

describe('orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = orderSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({
      order: {},
      isLoading: false,
      errorMes: '',
    });
  });
});
