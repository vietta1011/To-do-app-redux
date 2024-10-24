const appReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;

    case "ADD_TODOS_SAGA":
      return [...state, action.payload];

    case "DELETE_TODOS_SAGA":
      return state.filter((todo) => todo.id !== action.payload);

    case "UPDATE_TODOS_SAGA":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

    case "TOGGLE_ALL_TODOS_SAGA":
      return state.map((todo) => ({
        ...todo,
        completed: action.payload.completed,
      }));

    case "CLEAR_COMPLETED_TODOS_SAGA":
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};

export default appReducer;
