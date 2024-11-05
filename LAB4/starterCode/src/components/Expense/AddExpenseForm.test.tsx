import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddExpenseForm from './AddExpenseForm';
import { AppContext } from './../../context/AppContext';



describe('AddExpenseForm Component', () => {
  test('adds a new expense and updates the context', () => {
    const setExpenses = jest.fn();
    const budget = 1000;
    const setBudget = jest.fn();


    const { getByPlaceholderText, getByText } = render(
      <AppContext.Provider value={{ expenses : [], setExpenses, budget, setBudget }}>
        <AddExpenseForm />
      </AppContext.Provider>
    );

    const expenseName = getByPlaceholderText('Enter expense name');
    const expenseAmount = getByPlaceholderText('Enter amount');
    const Save = getByText('Save');

    // check that setExpenses was never called
    expect(setExpenses).toHaveBeenCalledTimes(0);

    // Input an expense
    fireEvent.change(expenseName, { target: { value: 'Bananas' }, });

    // Input the cose
    fireEvent.change(expenseAmount, { target: { value: '10' }, });

    // click save to add expense
    fireEvent.click(Save);

    // checks if the jest.fn() setExpense was called once 
    expect(setExpenses).toHaveBeenCalledTimes(1);

    // assuming it was called once, make sure the time it was called was with the values and cost we specified
    expect(setExpenses).toHaveBeenCalledWith([
      { id: expect.any(String), name: 'Bananas', cost: 10 },
    ]);
  });
});
