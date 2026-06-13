import { describe, it, expect } from 'vitest';

import { ingridientsSlice } from './ingriedientsSlice';

describe('ingridientsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = ingridientsSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({
      ingriedients: [],
      isLoading: false,
      errorMes: '',
    });
  });
});
