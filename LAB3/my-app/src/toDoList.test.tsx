// toDoList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom';

describe("ToDoList Component", () => {
  test("renders all items in the list", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/"]}>
        <Routes>
          <Route path="/todolist/" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );

    // Check title
    expect(screen.getByText("'s To Do List")).toBeInTheDocument();

    // Check all items are displayed
    expect(screen.getByLabelText("Apples")).toBeInTheDocument();
    expect(screen.getByLabelText("Bananas")).toBeInTheDocument();

  });

  test("items checked from the top should move below unchecked and count should change", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/"]}>
        <Routes>
          <Route path="/todolist/:name?" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );


    // grabs the new state of the items in the grovery list when called
    const getItemLabels = () =>
      screen.getAllByRole("checkbox").map((checkbox) => {
        const label = screen.getByText(
          (checkbox.nextSibling as HTMLElement).textContent || ""
        );
        return {
          checkbox: checkbox as HTMLInputElement,
          labelText: label.textContent,
        };
      });
  
    // grabs inital list 
    let items = getItemLabels();
    expect(items[0].labelText).toBe("Apples");
    expect(items[1].labelText).toBe("Bananas");
  
    // Check "Apples"
    fireEvent.click(items[0].checkbox);
    
  
    // get new list
    items = getItemLabels();
  
    // apples should move to the bottom
    expect(items[0].labelText).toBe("Bananas");
    expect(items[1].labelText).toBe("Apples");
  
    // apples should be checked bananas not
    expect(items[0].checkbox.checked).toBe(false);
    expect(items[1].checkbox.checked).toBe(true);

    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  
    // uncheck apples
    fireEvent.click(items[1].checkbox);
  
    // grab list
    items = getItemLabels();
  
    // apples shouldn't have move at least given the original code
    expect(items[1].labelText).toBe("Apples");
    expect(items[0].labelText).toBe("Bananas");

    //neither item box is checked so no items should be bought
    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

    // grab new list
    items = getItemLabels();

    // check both boxes, bananans and then apples to not shift order and ensure the clicks are correct
    fireEvent.click(items[1].checkbox);
    fireEvent.click(items[0].checkbox);
  
    // apples still on the bottom, banana at the top
    expect(items[1].labelText).toBe("Apples");
    expect(items[0].labelText).toBe("Bananas");

    // both should be true
    expect(items[0].checkbox.checked).toBe(true);
    expect(items[1].checkbox.checked).toBe(true);

    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

    // items = getItemLabels();
    // fireEvent.click(items[0].checkbox);
    // items = getItemLabels();
    // fireEvent.click(items[1].checkbox);

    // expect(items[0].checkbox.checked).toBe(false);
    // expect(items[1].checkbox.checked).toBe(false);

  });


  test("if both items check, and bottom is unchecked it should move to top", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/new"]}>
        <Routes>
          <Route path="/todolist/:name?" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );


    // grabs the new state of the items in the grovery list when called
    const getItemLabels = () =>
      screen.getAllByRole("checkbox").map((checkbox) => {
        const label = screen.getByText(
          (checkbox.nextSibling as HTMLElement).textContent || ""
        );
        return {
          checkbox: checkbox as HTMLInputElement,
          labelText: label.textContent,
        };
      });

    // grabs inital list and checked both unchecked
    let items = getItemLabels();
    console.log(items[0])
    expect(items[0].labelText).toBe("Apples");
    expect(items[1].labelText).toBe("Bananas");
    expect(items[1].checkbox.checked).toBe(false);
    expect(items[0].checkbox.checked).toBe(false);
    
  
    // Check "Apples"
    fireEvent.click(items[0].checkbox);
    
  
    // get new list
    items = getItemLabels();
  
    // apples should move to the bottom
    expect(items[0].labelText).toBe("Bananas");
    expect(items[1].labelText).toBe("Apples");
    expect(items[1].checkbox.checked).toBe(true);
  
    // apple moves to bottom new top is bananas check bananas
    fireEvent.click(items[0].checkbox)
  
    // see both checked and bananas on top
    expect(items[0].labelText).toBe("Bananas");
    expect(items[0].checkbox.checked).toBe(true);
    expect(items[1].checkbox.checked).toBe(true);
    
    // see 2 items bought
    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();
  
    // grab list
    items = getItemLabels();

    // unclicked apples to move it to the top
    expect(items[0].labelText).toBe("Bananas");
    expect(items[1].labelText).toBe("Apples");
    fireEvent.click(items[1].checkbox)
  
    // check apples at the top and is false, bananas at bottom and is true
    items = getItemLabels();
    console.log(items[0])
    expect(items[1].checkbox.checked).toBe(true)
    expect(items[0].labelText).toBe("Apples");
    expect(items[0].checkbox.checked).toBe(false)
    expect(items[1].labelText).toBe("Bananas");

    //check one ite bought
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });
});
