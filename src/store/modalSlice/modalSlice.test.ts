import { describe, it, expect } from 'vitest';

import { initialState, modalSlice, setModalData } from './modalSlice';

describe('modalSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = modalSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('изменение данных модалки', () => {
    const startState = initialState;
    const newData = {
      _id: 'sdjfbsdjfbjksdbfnkj',
      uuid: 'wiryeur823ry48923y',
      name: 'Булка бургера',
      type: 'bun',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 5,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
    };
    const result = modalSlice.reducer(startState, setModalData({ modalData: newData }));
    expect(result.modalDataCard).toEqual(newData);
  });
});
