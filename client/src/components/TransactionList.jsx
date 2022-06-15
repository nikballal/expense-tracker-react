import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext); //destructure context, instead of context.transactions, use destructured {transactions}

  useEffect(() => {
    getTransactions();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;

//for an async call like 'getTransactions', need to use, useEffect (making a http request from a component)
