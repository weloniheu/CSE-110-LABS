import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext); // Use budget from context

  const totalExpenses = expenses.reduce((total, item) => {return total + item.cost}, 0);
  const remaining = budget - totalExpenses;

  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (remaining < 0) {
      alert("Warning: You have exceeded your budget!");
    }
  }, [remaining]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;
