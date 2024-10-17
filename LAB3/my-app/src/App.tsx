import "./App.css";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { StickyNotes } from "./stickyNotes";
import { Navbar } from "./navbar";
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./ThemeContext";



const App = () => {
  const theme = useContext(ThemeContext);
  return (
   <div 
  //  style={{
  //   background: theme.background,
  //   color: theme.lines,
  //   }}
    >
     <Navbar />
     <Routes>
       <Route path="/" element={<StickyNotes />} />
       <Route path="/todolist/:name" element={<ToDoList />} />\
     </Routes>
   </div>
 );
};

// function ToggleTheme() {
//   const [currentTheme, setCurrentTheme] = useState(themes.light);
 
//   const toggleTheme = () => {
//     setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
//   };
 
//   const theme = useContext(ThemeContext);

//   return (
//     <ThemeContext.Provider value={currentTheme}>
//       <button onClick={toggleTheme}> Toggle Theme </button>
//       <App />
//     </ThemeContext.Provider>
//   );
//  }

// export default ToggleTheme;

export default App;