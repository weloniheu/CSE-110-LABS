import "./App.css";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { StickyNotes } from "./stickyNotes";
import { Navbar } from "./navbar";
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./ThemeContext";



const App = () => {

  return (
   <div
    >
     <Navbar />
     <Routes>
       <Route path="/" element={<StickyNotes />} />
       <Route path="/todolist/:name" element={<ToDoList />} />\
     </Routes>
   </div>
 );
};

export default App;