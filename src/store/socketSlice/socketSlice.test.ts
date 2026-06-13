import { describe, it, expect } from 'vitest';

import {
  connect,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
  socketSlice,
} from './socketSlice';

import type { MessageSocket, SocketState } from '../types';

describe('socketSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = socketSlice.reducer(undefined, { type: '' });
    expect(result).toEqual({
      isConnected: false,
      messages: [],
      errorMesSocket: null,
      isLoadingSocket: false,
    });
  });

  it('установка флагов при connect', () => {
    const startState = {
      errorMesSocket: 'error',
      isLoadingSocket: false,

      isConnected: false,
      messages: [],
      // errorGetUser: 'errorGet',
      // errorPatchUser: 'errorPatch',
    };
    const result = socketSlice.reducer(startState, connect('wss://all'));
    expect(result.errorMesSocket).toBe(null);
    expect(result.isLoadingSocket).toBe(true);
  });

  it('установка флагов при disconnect', () => {
    const startState: SocketState = {
      isConnected: true,
      messages: [
        {
          _id: '6a2a8ew141cff1001b6e35sd',
          orders: [
            {
              _id: '6a2a8ew14001b6e35sd',
              createdAt: '2026-06-11T10:33:05.348Z',
              ingredients: [
                '6a2ew11cff1001b6e',
                '6aa8w11cff10015sd',
                '6a2ae141cf1001b6e',
              ],
              name: 'Краторный фалленианский экзо-плантаго бургер',
              number: 10,
              status: 'done',
              updatedAt: '2026-06-11T10:33:05.396Z',
            },
            {
              _id: '6a2a8ew141cff1001b6ed',
              createdAt: '2026-06-11T10:33:05.348Z',
              ingredients: [
                '6a2a8ew141cff35sd',
                '6a2a841cff10015sd',
                '6a2a8ew1411001b6e',
              ],
              name: 'Краторный фалленианский экзо-плантаго бургер',
              number: 12,
              status: 'pending',
              updatedAt: '2026-06-11T10:33:05.396Z',
            },
          ],
          success: true,
          total: 500,
          totalToday: 5,
        },
      ],
      // messages: ['6a2ew11cff1001b6e', '6aa8w11cff10015sd', '6a2ae141cf1001b6e'],

      isLoadingSocket: true,
      errorMesSocket: null,
    };

    const result = socketSlice.reducer(startState, disconnect());
    expect(result.isConnected).toBe(false);
    expect(result.messages).toEqual([]);
    expect(result.isLoadingSocket).toBe(false);
  });

  it('установка флагов при onOpen', () => {
    const startState = {
      isLoadingSocket: true,
      isConnected: false,
      errorMesSocket: 'error',

      messages: [],
    };
    const result = socketSlice.reducer(startState, onOpen());
    expect(result.isLoadingSocket).toBe(false);
    expect(result.isConnected).toBe(true);
    expect(result.errorMesSocket).toBe(null);
  });

  it('добавление в массив сообщений при onMessage', () => {
    const startState = {
      messages: [],

      isConnected: false,
      errorMesSocket: null,
      isLoadingSocket: false,
    };
    const newMessage: MessageSocket = {
      _id: '6a2a8ew141cff1001b6e35sd',
      orders: [
        {
          _id: '6a2a8ew14001b6e35sd',
          createdAt: '2026-06-11T10:33:05.348Z',
          ingredients: ['6a2ew11cff1001b6e', '6aa8w11cff10015sd', '6a2ae141cf1001b6e'],
          name: 'Краторный фалленианский экзо-плантаго бургер',
          number: 10,
          status: 'done',
          updatedAt: '2026-06-11T10:33:05.396Z',
        },
        {
          _id: '6a2a8ew141cff1001b6ed',
          createdAt: '2026-06-11T10:33:05.348Z',
          ingredients: ['6a2a8ew141cff35sd', '6a2a841cff10015sd', '6a2a8ew1411001b6e'],
          name: 'Краторный фалленианский экзо-плантаго бургер',
          number: 12,
          status: 'pending',
          updatedAt: '2026-06-11T10:33:05.396Z',
        },
      ],
      success: true,
      total: 500,
      totalToday: 5,
    };
    const result = socketSlice.reducer(startState, onMessage(newMessage));
    expect(result.messages).toEqual([
      {
        _id: '6a2a8ew141cff1001b6e35sd',
        orders: [
          {
            _id: '6a2a8ew14001b6e35sd',
            createdAt: '2026-06-11T10:33:05.348Z',
            ingredients: ['6a2ew11cff1001b6e', '6aa8w11cff10015sd', '6a2ae141cf1001b6e'],
            name: 'Краторный фалленианский экзо-плантаго бургер',
            number: 10,
            status: 'done',
            updatedAt: '2026-06-11T10:33:05.396Z',
          },
          {
            _id: '6a2a8ew141cff1001b6ed',
            createdAt: '2026-06-11T10:33:05.348Z',
            ingredients: ['6a2a8ew141cff35sd', '6a2a841cff10015sd', '6a2a8ew1411001b6e'],
            name: 'Краторный фалленианский экзо-плантаго бургер',
            number: 12,
            status: 'pending',
            updatedAt: '2026-06-11T10:33:05.396Z',
          },
        ],
        success: true,
        total: 500,
        totalToday: 5,
      },
    ]);
  });

  it('установка флагов и текста ошибки при onError', () => {
    const startState = {
      errorMesSocket: null,
      isLoadingSocket: true,

      isConnected: false,
      messages: [],
    };
    const textError = 'error';
    const result = socketSlice.reducer(startState, onError(textError));
    expect(result.isLoadingSocket).toBe(false);
    expect(result.errorMesSocket).toBe('error');
  });

  it('установка флагов при onClose', () => {
    const startState = {
      isConnected: true,
      isLoadingSocket: true,

      messages: [],
      errorMesSocket: null,
    };
    const result = socketSlice.reducer(startState, onClose());
    expect(result.isLoadingSocket).toBe(false);
    expect(result.isConnected).toBe(false);
  });
});
