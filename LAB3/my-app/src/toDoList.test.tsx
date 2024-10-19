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
  //// Doesn't work
  // test("displays the correct number of items bought", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/todolist/"]}>
  //       <Routes>
  //         <Route path="/todolist/" element={<ToDoList />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   // Initially, no items are purchased
  //   expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

  //   // Check an item
  //   const applesCheckbox = screen.getByLabelText("Apples");
  //   fireEvent.click(applesCheckbox);
  //   expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

  //   console.log(`1 Should be Apples: ${applesCheckbox.name}, should be false: ${applesCheckbox.checked}`)
    
  //   // Check another item
  //   const bananasCheckbox = screen.getByLabelText("Bananas");
  //   fireEvent.click(bananasCheckbox);
  //   expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

    
  //   console.log(`1 Should be Bananas: ${bananasCheckbox.name}, should be false: ${bananasCheckbox.checked}`)

  //   // Uncheck an item
  //   fireEvent.click(applesCheckbox);
  //   expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

  //   fireEvent.click(bananasCheckbox);

  //   console.log(`2 Should be Apples: ${applesCheckbox.name}, should be false: ${applesCheckbox.checked}`)
  //   console.log(`2 Should be Bananas: ${bananasCheckbox.name}, should be false: ${bananasCheckbox.checked}`)
  // });

  // test("updates item list when items are checked or unchecked", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/todolist/"]}>
  //       <Routes>
  //         <Route path="/todolist/" element={<ToDoList />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const applesCheckbox = screen.getByLabelText("Apples");

  //   console.log(`before name: ${applesCheckbox.name}, should be false: ${applesCheckbox.checked}`)
    
  ////doesn't work
  //   // Check items
  //   fireEvent.click(applesCheckbox);

  //   const bananasCheckbox = screen.getByLabelText("Bananas");
  //   console.log(`before banana: ${bananasCheckbox.name}, should be false: ${bananasCheckbox.checked}`)
  //   fireEvent.click(bananasCheckbox);


  //   console.log(`middle apple: ${applesCheckbox.name}, should be true: ${applesCheckbox.checked}`)
  //   console.log(`middle banana: ${bananasCheckbox.name}, should be true: ${bananasCheckbox.checked}`)
  //   expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

  //   const bananasCheckboxAfter = screen.getByLabelText("Bananas");
  //   console.log(`after banana: ${bananasCheckboxAfter.name}, should be false: ${bananasCheckboxAfter.checked}`)
  //   // Uncheck items
  //   fireEvent.click(bananasCheckboxAfter);
  //   expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  // });

  test("items checked from the top should move bellow unchecked and count should change", () => {
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

    items = getItemLabels();
    fireEvent.click(items[0].checkbox);
    items = getItemLabels();
    fireEvent.click(items[1].checkbox);

    expect(items[0].checkbox.checked).toBe(false);
    expect(items[1].checkbox.checked).toBe(false);

  });


  test("if both items check, and bottom is unchecked it should move to top", () => {
    render(
      <MemoryRouter initialEntries={["/todolist/new"]}>
        <Routes>
          <Route path="/todolist/:new?" element={<ToDoList />} />
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
    console.log(items[1])
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
