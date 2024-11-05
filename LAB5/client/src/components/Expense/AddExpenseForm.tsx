import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const createExpense = (expense: Expense) => {
    console.log("Creating expense:", expense);
    // Add any additional handling here if necessary
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: generateUniqueId(),
      description: name,
      cost: parseFloat(cost),
    };

    createExpense(newExpense); // Call createExpense before updating state

    setExpenses([...expenses, newExpense]);
    setName("");
    setCost("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter expense name"
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
