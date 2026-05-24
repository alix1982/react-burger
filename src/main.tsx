import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@components/app/app';

import { store } from './store';

import './index.css';

// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Проверяем существование элемента
if (!rootElement) {
  throw new Error('Root element with id "root" not found in the document');
}

// Создаём корневой компонент и рендерим приложение
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
