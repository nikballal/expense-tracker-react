import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//Initial State

//test data for transactions
// { id: 1, text: "Flower", amount: -20 },
// { id: 2, text: "Salary", amount: 300 },
// { id: 3, text: "Book", amount: -10 },
// { id: 4, text: "Camera", amount: 150 },
const initialState = {
  transactions: [],
  error: null,
  loading: true, //for the spinner
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions

  //to integrate backend with frontend to get transactions
  async function getTransactions() {
    try {
      const res = await axios("/api/v1/transactions"); //since http://localhost:5000 - proxy in package.json

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`); //deleting from the server

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    //since we are sending data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  //returns all the stuff under 'return' in app.js
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }} //pass the actions to the provider
    >
      {children}
    </GlobalContext.Provider>
  );
};
