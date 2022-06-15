//reducers are used to change state and send the changes to the components
export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };

    //filter out all the transactions through id which have a type 'DELETE TRANSACTION'
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };

    //add the new (action.payload) to the existing set of transactions in an array
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
