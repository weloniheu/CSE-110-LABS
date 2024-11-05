import React, { useState } from 'react';
import { render, fireEvent, queryByRole } from '@testing-library/react';
import ExpenseItem from './ExpenseItem';
import Remaining from '../Remaining';
import ExpenseTotal from './ExpenseTotal';
import { AppContext } from './../../context/AppContext';
import ExpenseList from './ExpenseList';


describe('ExpenseItem Component', () => {
  test('deletes an expense and updates the context', () => {
    const expenseToDelete = { id: '1', description: 'Junk Food', cost: 500 };
    const initialExpenses = [expenseToDelete];
    const budget = 1000;

    const Wrapper = () => {
      const [expenses, setExpenses] = useState(initialExpenses);
      const [currentBudget, setBudget] = useState(budget);

      return (
        <AppContext.Provider value={{ expenses, setExpenses, budget: currentBudget, setBudget }}>
          <ExpenseList />
          <Remaining />
          <ExpenseTotal />
        </AppContext.Provider>
      );
    };

    const { getByText, queryAllByRole, queryByText } = render(<Wrapper />);

    const instialRemaining = getByText('Remaining: $500')
    const instialSpent = getByText('Spent so far: $500')
    const instialListSize = queryAllByRole('listitem')

    // check the intial state with expense to be deleted for remaining and spent so far
    expect(instialRemaining).toBeInTheDocument();
    expect(instialSpent).toBeInTheDocument();

    // check the size of the list is 1
    expect(instialListSize).toHaveLength(1);

    // Click Delete button to remove item
    fireEvent.click(getByText('x'));

    const newRemaining = getByText('Remaining: $1000');
    const newSpent = getByText('Spent so far: $0');
    const newList = queryAllByRole('listitem');
    // After deletion check if the values have changed Assert updated Remaining balance and Total Expenses
    expect(newRemaining).toBeInTheDocument();
    expect(newSpent).toBeInTheDocument();

    expect(queryByText('Junk Food')).not.toBeInTheDocument();

    // check the size of the list is 0
    expect(newList).toHaveLength(0);
  });
});
