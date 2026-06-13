// import { nanoid } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { describe, it, expect } from 'vitest';

import { BUN_DEFAULT } from '@/utils/constant';

import { constructorSlice } from './constructorSlice';

import type { ConstructorState, Ingriedient } from '../types';

// Вспомогательная функция для создания тестовых ингредиентов
const createIngredient = (type: string, name: string, index?: number): Ingriedient => ({
  // _id: Math.random().toString(36).substring(2, 15),
  // uuid: '',
  _id: index !== undefined ? `id-${index}` : Math.random().toString(36).substring(2, 15),
  uuid: index !== undefined ? `uuid-${index}` : nanoid(),
  name,
  type,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'image',
  image_mobile: 'image_mobile',
  image_large: 'image_large',
});

// Единая фабрика начального состояния (как и в deleteIngridient)
const mockState = (ingredients: Ingriedient[]): ConstructorState => ({
  ingriedientsUser: ingredients,
  isLoadingConstructor: false,
  errorMes: '',
});

describe('constructorSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = constructorSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({
      ingriedientsUser: BUN_DEFAULT,
      isLoadingConstructor: false,
      errorMes: '',
    });
  });
});

describe('constructorSlice - setIngriedientsUser', () => {
  it('должен добавить uuid к каждому ингредиенту через prepare', () => {
    // const startState = { ingriedientsUser: [] };
    const ingredients = [
      createIngredient('bun', 'Булка'),
      createIngredient('ingredient', 'Котлета'),
    ];

    const action = constructorSlice.actions.setIngriedientsUser(ingredients);

    expect(action.payload).toHaveLength(2); // создано два элемента
    expect(action.payload[0].uuid).toBeDefined(); // uuid добавился в prepare
    expect(action.payload[1].uuid).toBeDefined(); // uuid добавился в prepare
    expect(action.payload[0].uuid).not.toBe(ingredients[0].uuid); // uuid новый после prepare
    expect(action.payload[0].uuid).not.toEqual(action.payload[1].uuid); // уникальность uuid
  });

  it('при длине > 2 должен отфильтровать ингредиенты с type === "ingriedientDefault"', () => {
    // const startState: ConstructorState = {
    //   ingriedientsUser: BUN_DEFAULT,
    //   isLoadingConstructor: false,
    //   errorMes: '',
    // };
    const startState = mockState([]);

    const ingredients = [
      createIngredient('ingriedientDefault', 'Default 1'),
      createIngredient('ingriedientDefault', 'Default 2'),
      createIngredient('ingriedientDefault', 'Default 3'),
      createIngredient('bun', 'Булка'),
      createIngredient('ingredient', 'Котлета'),
    ];

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.setIngriedientsUser(ingredients)
    );

    // После prepare у всех есть uuid
    // expect(result.ingriedientsUser).toHaveLength(5);
    result.ingriedientsUser.forEach((item) => expect(item.uuid).toBeDefined());

    // После reducer (фильтрация) остались только не-default
    const filtered = ingredients.filter((item) => item.type !== 'ingriedientDefault');
    expect(result.ingriedientsUser).toHaveLength(filtered.length);
    expect(result.ingriedientsUser.map((i) => i.name)).toEqual(
      filtered.map((i) => i.name)
    );
  });

  it('при длине <= 2 не должен фильтровать ингредиенты, даже если они ingriedientDefault', () => {
    // const startState: ConstructorState = {
    //   ingriedientsUser: BUN_DEFAULT,
    //   isLoadingConstructor: false,
    //   errorMes: '',
    // };
    const startState = mockState([]);
    const ingredients = [
      createIngredient('ingriedientDefault', 'Default 2'),
      createIngredient('ingriedientDefault', 'Default 1'),
    ];

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.setIngriedientsUser(ingredients)
    );

    expect(result.ingriedientsUser).toHaveLength(2);
    expect(result.ingriedientsUser[0].type).toBe('ingriedientDefault');
    expect(result.ingriedientsUser[1].type).toBe('ingriedientDefault');
    expect(result.ingriedientsUser[0].name).toBe('Default 2');
    expect(result.ingriedientsUser[1].name).toBe('Default 1');
  });

  it('должен корректно обрабатывать пустой массив', () => {
    // const startState: ConstructorState = {
    //   ingriedientsUser: BUN_DEFAULT,
    //   isLoadingConstructor: false,
    //   errorMes: '',
    // };
    const startState = mockState([]);
    const ingredients: Ingriedient[] = [];

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.setIngriedientsUser(ingredients)
    );

    expect(result.ingriedientsUser).toEqual([]);
  });

  it('должен сохранять порядок ингредиентов после обработки', () => {
    // const startState: ConstructorState = {
    //   ingriedientsUser: BUN_DEFAULT,
    //   isLoadingConstructor: false,
    //   errorMes: '',
    // };
    const startState = mockState([]);

    const ingredients = [
      createIngredient('bun', 'Булка 1'),
      createIngredient('ingredient', 'Котлета 1'),
      createIngredient('ingredient', 'Котлета 2'),
      createIngredient('ingriedientDefault', 'Default'),
    ];

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.setIngriedientsUser(ingredients)
    );

    expect(result.ingriedientsUser.map((i) => i.name)).toEqual([
      'Булка 1',
      'Котлета 1',
      'Котлета 2',
    ]);
  });
});

describe('constructorSlice - deleteIngridient', () => {
  // const mockState = (ingredients: Ingriedient[]): ConstructorState => ({
  //   ingriedientsUser: ingredients,
  //   isLoadingConstructor: false,
  //   errorMes: '',
  // });

  it('должен удалить ингредиент по индексу', () => {
    const startIngredients = [
      createIngredient('bun', 'Булка 1', 0),
      createIngredient('main', 'Котлета', 1),
      createIngredient('sauce', 'Соус', 2),
    ];
    const startState = mockState(startIngredients);

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.deleteIngridient({ index: 1 })
    );

    expect(result.ingriedientsUser).toHaveLength(2);
    expect(result.ingriedientsUser.map((i) => i.name)).toEqual(['Булка 1', 'Соус']);
  });

  it('если после удаления нет main/sauce, должен добавить BUN_DEFAULT[1]', () => {
    const startIngredients = [
      createIngredient('bun', 'Булка 1', 0),
      createIngredient('bun', 'Булка 2', 1),
    ];
    const startState = mockState(startIngredients);
    const defaultItem = BUN_DEFAULT[1];

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.deleteIngridient({ index: 0 })
    );

    // Было 2, удалили 1, добавили 1 -> осталось 2
    expect(result.ingriedientsUser).toHaveLength(2);

    // Проверяем, что добавленный элемент совпадает с BUN_DEFAULT[1] по ключевым полям
    expect(result.ingriedientsUser[0]).toEqual(defaultItem);
    expect(result.ingriedientsUser[1]).toEqual(startIngredients[1]);
  });

  it('не должен добавлять BUN_DEFAULT, если после удаления всё ещё есть main или sauce', () => {
    const startIngredients = [
      createIngredient('bun', 'Булка', 0),
      createIngredient('main', 'Котлета', 1), // есть main
      createIngredient('bun', 'Булка доп', 2),
    ];
    const startState = mockState(startIngredients);

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.deleteIngridient({ index: 0 })
    );

    expect(result.ingriedientsUser).toHaveLength(2);
    // BUN_DEFAULT не добавлен, просто удалился первый элемент
    expect(result.ingriedientsUser.map((i) => i.name)).toEqual(['Котлета', 'Булка доп']);
  });

  it('корректно обрабатывает удаление последнего элемента', () => {
    const startIngredients = [
      createIngredient('bun', 'Булка 1', 0),
      createIngredient('bun', 'Булка 2', 1),
    ];
    const startState = mockState(startIngredients);
    const defaultItem = BUN_DEFAULT[1];

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.deleteIngridient({ index: 1 })
    );

    expect(result.ingriedientsUser).toHaveLength(2); // удалили + добавили
    expect(result.ingriedientsUser[0]).toEqual(startIngredients[0]);
    expect(result.ingriedientsUser[1]).toEqual(defaultItem);
  });

  it('игнорирует некорректный индекс (за пределами массива), но логика main/sauce всё равно проверяется', () => {
    const startIngredients = [createIngredient('bun', 'Булка', 0)];
    const startState = mockState(startIngredients);

    // Индекс 5 не существует, splice просто ничего не сделает
    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.deleteIngridient({ index: 5 })
    );

    // Массив не изменился из-за splice, но логика "нет main/sauce" сработает
    expect(result.ingriedientsUser).toHaveLength(2);
    expect(result.ingriedientsUser[0]).toEqual(startIngredients[0]);
    expect(result.ingriedientsUser[1]).toEqual(BUN_DEFAULT[1]);
  });

  it('обрабатывает пустой массив: сразу добавляет BUN_DEFAULT[1]', () => {
    // const startState = {
    //   ingriedientsUser: [],
    //   isLoadingConstructor: false,
    //   errorMes: '',
    // };
    const startState = mockState([]);

    const result = constructorSlice.reducer(
      startState,
      constructorSlice.actions.deleteIngridient({ index: 0 })
    );

    expect(result.ingriedientsUser).toHaveLength(1);
    expect(result.ingriedientsUser[0]).toEqual(BUN_DEFAULT[1]);
  });
});
