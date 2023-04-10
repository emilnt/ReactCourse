import { useState } from 'react';

import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {

  const [showForm, setShowForm] = useState(false);

  const showFormToggleHandler = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);

    showFormToggleHandler();
  };

  if (!showForm) {
    return <div className="new-expense">
        <div className="new-expense__action">
          <button type="button" onClick={showFormToggleHandler}>Add Expense</button>
        </div>
      </div>
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={showFormToggleHandler} />
    </div>
  );
};

export default NewExpense;
