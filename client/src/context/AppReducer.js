//reducers are used to change state and send the changes to the components
export default (state, action) => {
  switch (action.type) {
    //filter out all the transactions through id which have a type 'DELETE TRANSACTION'
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    //add the new (action.payload) to the existing set of transactions in an array
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};
