import React from 'react';
import { createRoot } from 'react-dom/client'; // Імпортуємо createRoot
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './index.css';

// Знаходимо кореневий елемент у вашому HTML
const container = document.getElementById('root');

// Створюємо корінь для рендерингу
const root = createRoot(container!); // Використовуємо "!", бо TypeScript не знає, що container точно існує

// Рендеримо додаток
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);