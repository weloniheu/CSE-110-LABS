// toDoList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom';

describe("ToDoList Component", () => {
  // test("renders all items in the list", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/todolist/"]}>
  //       <Routes>
  //         <Route path="/todolist/" element={<ToDoList />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // Check title
  //   expect(screen.getByText("'s To Do List")).toBeInTheDocument();

  //   // Check all items are displayed
  //   expect(screen.getByLabelText("Apples")).toBeInTheDocument();
  //   expect(screen.getByLabelText("Bananas")).toBeInTheDocument();

  // });

  test("displays the correct number of items bought", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/Jane"]}>
        <Routes>
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );

    // Initially, no items are purchased
    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

    // Check an item
    const applesCheckbox = screen.getByLabelText("Apples");
    fireEvent.click(applesCheckbox);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

    // Check another item
    const bananasCheckbox = screen.getByLabelText("Bananas");
    fireEvent.click(bananasCheckbox);
    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

    // Uncheck an item
    fireEvent.click(applesCheckbox);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

    fireEvent.click(applesCheckbox);

    console.log(`after name: ${applesCheckbox.name}, ispurch: ${applesCheckbox.checked}`)
    console.log(`after name: ${bananasCheckbox.name}, ispurch: ${bananasCheckbox.checked}`)
  });

  // test("updates item list when items are checked or unchecked", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/todolist/"]}>
  //       <Routes>
  //         <Route path="/todolist/" element={<ToDoList />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const applesCheckbox = screen.getByLabelText("Apples");
  //   const bananasCheckbox = screen.getByLabelText("Bananas");

  //   console.log(`before name: ${applesCheckbox.name}, ispurch: ${applesCheckbox.checked}`)
  //   console.log(`before name: ${bananasCheckbox.name}, ispurch: ${bananasCheckbox.checked}`)

  //   // Check items
  //   fireEvent.click(applesCheckbox);
  //   fireEvent.click(bananasCheckbox);


  //   console.log(`middle name: ${applesCheckbox.name}, ispurch: ${applesCheckbox.checked}`)
  //   console.log(`mideel name: ${bananasCheckbox.name}, ispurch: ${bananasCheckbox.checked}`)
  //   expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

  //   console.log(`after name: ${applesCheckbox.name}, ispurch: ${applesCheckbox.checked}`)
  //   console.log(`after name: ${bananasCheckbox.name}, ispurch: ${bananasCheckbox.checked}`)
  //   // Uncheck items
  //   fireEvent.click(bananasCheckbox);
  //   expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  // });
});
