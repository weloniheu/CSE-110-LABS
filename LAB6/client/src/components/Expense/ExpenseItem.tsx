import { Expense } from "../../types/types";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";


const ExpenseItem = ({ id, description, cost }: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = () => {
    // Exercise: Remove expense from expenses context array
    const updatedExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{description}</div>
      <div>${cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense()}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
