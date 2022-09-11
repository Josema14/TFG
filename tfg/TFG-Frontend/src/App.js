
import './App.css';
import { StrictMode } from 'react';
import Links from './Routes';

export default function App() {
  return (

    //En la App simplemente llamamos al elemento Links de Routes.js
    <StrictMode>
      
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-
awesome.min.css" rel="stylesheet" integrity="sha384-
wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" 
crossorigin="anonymous"></link>
      <Links />
    </StrictMode>
  );
}
