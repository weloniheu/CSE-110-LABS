// toDoList.tsx
import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom";

export function ToDoList() {
  let [items, setItems] = useState(dummyGroceryList);
  const { name } = useParams();

  const numRemainingItems = items.filter(item => item.isPurchased).length;

  function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox: HTMLInputElement = e.target as HTMLInputElement;
    const itemName = checkbox.name;
    const itemIndex = items.findIndex((item) => item.name === itemName);
    items[itemIndex] = { name: itemName, isPurchased: checkbox.checked };

    const uncheckedItems = items.filter((item) => !item.isPurchased);
    const checkedItems = items.filter((item) => item.isPurchased);
    const newItems = uncheckedItems.concat(checkedItems);
    setItems([...newItems]);
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>{name}'s To Do List</h1>
        Items bought: {numRemainingItems}
        <form action=".">
          {items.map((item) => ListItem(item, handleCheckboxClick))}
        </form>
      </div>
    </div>
  );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${item.name}`}
        onChange={changeHandler}
        checked={item.isPurchased}
        name={item.name}
      />
      <label htmlFor={`checkbox-${item.name}`}>{item.name}</label>
    </div>
  );
}
