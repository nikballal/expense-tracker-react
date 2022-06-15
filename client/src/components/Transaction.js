import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext); //pull out deleteTransaction from the 'transaction'

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
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
        {/* Math.abs gives a positive number */}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)} //transaction_id - coming from the database
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default Transaction;
