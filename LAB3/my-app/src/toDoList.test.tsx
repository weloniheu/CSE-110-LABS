import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";
import { waitFor } from "@testing-library/react";

describe("To-Do List", () => {
  test("renders the initial list and name correctly", () => {
    render(
        <ToDoList />
    );

    // Verify the user's name is displayed in the header (assuming useParams() returns a default name for this test)
    expect(screen.getByText(/'s To Do List/i)).toBeInTheDocument();

    // Check if all items from dummyGroceryList are displayed
    dummyGroceryList.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    // Initially, Items bought should be 0
    expect(screen.getByText(/Items bought: 0/i)).toBeInTheDocument();
  });

  

  test("displays correct number of purchased items 02", async () => {
    render(<ToDoList />);

    screen.debug();

    const fItemCheckB0X = screen.getByLabelText(/Bananas/i);
    const fItemCheckBOX = screen.getByLabelText(/Apples/i);
    

    fireEvent.click(fItemCheckBOX);
    fireEvent.click(fItemCheckBOX);



    
    console.log(`Checkbox name: ${fItemCheckBOX.name}, Label: ${fItemCheckBOX.labels[0].textContent}, isPurchased: ${fItemCheckBOX.checked}`);

    console.log(`Checkbox name: ${fItemCheckB0X.name}, Label: ${fItemCheckB0X.labels[0].textContent}, isPurchased: ${fItemCheckB0X.checked}`);
    

    
    await waitFor(() => {
      expect(screen.getByText(/Items bought: 2/i)).toBeInTheDocument();
    });

  }); 

  test("displays correct number of purchased items 020", async () => {
    render(<ToDoList />);

    const firstItemCheckbox = screen.getByRole('checkbox', {name:/Apples/i });
    const secondItemCheckbox = screen.getByRole("checkbox", { name:/Bananas/i });


    fireEvent.click(firstItemCheckbox)
    fireEvent.click(secondItemCheckbox)


    fireEvent.change(firstItemCheckbox)
    fireEvent.change(secondItemCheckbox)

    await waitFor(() => {
      expect(screen.getByText(/Items bought: 0/i)).toBeInTheDocument();
    });

  }); 

  test("displays correct number of purchased items 1", async () => {
    render(<ToDoList />);

    const firstItemCheckbox = screen.getByRole('checkbox', {name:/Apples/i });


    fireEvent.click(firstItemCheckbox)


    expect(await screen.findByText(/Items bought: 1/i)).toBeInTheDocument();


  }); 
});
