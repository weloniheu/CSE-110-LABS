import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const { newBudget } = body.amount;

    if (typeof newBudget !== "number" || newBudget < 0){
        return res.status(400).send({ error: "Invalid budget amount. Must but a number great that 0"});
    
    }

    budget.amount = newBudget;

    res.status(200).send({ message: "Budget udpate successfully", data: budget})
}
