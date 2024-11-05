import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());

  const handleEditClick = () => {
    if (isEditing) {
      const budgetValue = parseFloat(newBudget);
      if (!isNaN(budgetValue) && budgetValue > 0) {
        setBudget(budgetValue);
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    loadBudget();
  }, []);

    const loadBudget = async () => {
      try {
        const budject = await fetchBudget();
        setBudget(budget);
      } catch (err: any) {
        console.log(err.message);
      }
    };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <input
          data-testid="budget-input"
          type="number"
          className="form-control"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
        />
      ) : (
        <div data-testid="budget-display">Budget: ${budget}</div>
      )}
      <button
        className={`btn btn-${isEditing ? 'success' : 'primary'} ms-2`}
        onClick={handleEditClick}
        aria-label={isEditing ? 'Save budget' : 'Edit budget'}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Budget;
