
import './App.css';
import { StrictMode } from 'react';
import Links from './Routes';

export default function App() {
  return (

    //En la App simplemente llamamos al elemento Links de Routes.js
    <StrictMode>
      <Links />
    </StrictMode>
  );
}
