import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";


export async function createExpenseServer(req: Request, res: Response, db: Database) {
        const { id, cost, description } = req.body;
     
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
     
        try {
            await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        } catch (error) {
            return res.status(400).send({ error: `Expense could not be created, + ${error}` });
        };
     
        res.status(201).send({ id, description, cost });
     
     
}


export async function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params;

    console.log("ID from req.params:", id);

    if (!id) {
        return res.status(400).send({ error: "Expense ID is required" });
    }

    // Ensure id is a number
    const expenseId = parseInt(id, 10);
    if (isNaN(expenseId)) {
        return res.status(400).send({ error: "Expense ID must be a number" });
    }

    try {
        // Check if the expense exists
        const expense = await db.get("SELECT * FROM expenses WHERE id = ?", [expenseId]);

        if (!expense) {
            return res.status(404).send({ error: "Expense not found" });
        }

        // Delete the expense if it exists
        await db.run("DELETE FROM expenses WHERE id = ?", [expenseId]);
        res.status(200).send({ message: "Expense deleted successfully", id: expenseId });

    } catch (error) {
        res.status(500).send({ error: "Failed to delete expense" });
    }
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all("SELECT * FROM expenses;");
        res.status(200).send({ data: expenses });
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve expenses" });
    }
}