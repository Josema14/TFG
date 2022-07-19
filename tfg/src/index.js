import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

//Crea una raíz que podemos usar para renderizar un elemento de React
const root = createRoot(document.getElementById('root'));

//Renderizamos la App
root.render(<App />);
