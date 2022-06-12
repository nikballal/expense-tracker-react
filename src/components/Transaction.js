import React from "react";

const Transaction = ({ transaction }) => {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      key={transaction.id}
      className={transaction.amount < 0 ? "minus" : "plus"}
    >
      {/* Gives green/red border if income or expense */}
      {transaction.text}
      <span>
        {sign}${Math.abs(transaction.amount)}
        {/* Math.abs gives a positive number */}
      </span>
      <button className="delete-btn">x</button>
    </li>
  );
};

export default Transaction;
