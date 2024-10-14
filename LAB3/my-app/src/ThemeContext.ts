// ThemeContext.ts
import React from 'react';

export const themes = {
 light: {
   notebackground: 'white',
   background: '#eeeeee',
   inputbox: 'white',
   lines: 'black',
   noteborder: '#ccc',
   noteglow: 'rgba(0, 0, 0, 0.1)',

 },
 dark: {
  notebackground: 'rgb(25, 25, 25)',
  background: '#222222',
  inputbox: '#222222',
  lines: 'lightgray',
  noteborder: 'darkgray',
  noteglow: 'dimgray',
 },
};


export const ThemeContext = React.createContext(themes.light);