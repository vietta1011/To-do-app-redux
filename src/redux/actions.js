export const setTodos = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const fetchTodos = () => ({
  type: "FETCH_TODOS",
});

export const addTodoSaga = (todo) => ({
  type: "ADD_TODOS_SAGA",
  payload: todo,
});

export const deleteTodoSaga = (id) => ({
  type: "DELETE_TODOS_SAGA",
  payload: id,
});

export const updateTodoSaga = (todo) => ({
  type: "UPDATE_TODOS_SAGA",
  payload: todo,
});

export const toggleAllTodosSaga = (completed) => ({
  type: "TOGGLE_ALL_TODOS_SAGA",
  payload: { completed },
});

export const clearCompletedTodosSaga = () => ({
  type: "CLEAR_COMPLETED_TODOS_SAGA",
});
