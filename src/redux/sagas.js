import { takeLeading, put, all, call } from "redux-saga/effects";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/Firebase";
import {
  setTodos,
  fetchTodos,
  addTodoSaga,
  deleteTodoSaga,
  updateTodoSaga,
} from "./actions";

function* fetchTodosSaga() {
  try {
    const todoCollection = collection(db, "todos");
    const todosQuery = query(todoCollection, orderBy("timestamp", "asc"));
    const todoSnapshot = yield getDocs(todosQuery);
    const todos = todoSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Error fetching todos: ", error);
  }
}

function* onAddTodoSaga({ payload }) {
  try {
    const todoRef = yield addDoc(collection(db, "todos"), {
      text: payload.text,
      completed: false,
      timestamp: serverTimestamp(),
    });
    const newTodo = {
      ...payload,
      id: todoRef.id,
      completed: false,
      timestamp: new Date(),
    };
    yield put(addTodoSaga(newTodo));
  } catch (error) {
    console.error("Error creating todo: ", error);
  }
}

function* onDeleteTodoSaga({ payload }) {
  try {
    const todoDocRef = doc(db, "todos", payload);
    yield deleteDoc(todoDocRef);
    yield put(deleteTodoSaga(payload));
    yield put(fetchTodos());
  } catch (error) {
    console.error("Error deleting todo: ", error);
  }
}

function* onUpdateTodoSaga({ payload }) {
  try {
    const todoDocRef = doc(db, "todos", payload.id);
    yield updateDoc(todoDocRef, {
      text: payload.text,
      completed: payload.completed,
    });
    yield put(updateTodoSaga(payload));
  } catch (error) {
    console.error("Error updating todo: ", error);
  }
}

function* onToggleAllTodosSaga({ payload }) {
  try {
    const todoCollection = collection(db, "todos");
    const todosSnapshot = yield getDocs(todoCollection);
    const todos = todosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    for (const todo of todos) {
      const todoDocRef = doc(db, "todos", todo.id);
      yield updateDoc(todoDocRef, {
        completed: payload.completed,
      });
    }
  } catch (error) {
    console.error("Error toggling all todos: ", error);
  }
}

function* onClearCompletedTodosSaga() {
  try {
    const todoCollection = collection(db, "todos");
    const todosSnapshot = yield getDocs(todoCollection);
    const completedTodos = todosSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((todo) => todo.completed);
    for (const todo of completedTodos) {
      const todoDocRef = doc(db, "todos", todo.id);
      yield deleteDoc(todoDocRef);
    }
  } catch (error) {
    console.error("Error clearing completed todos: ", error);
  }
}

function* onFetchTodos() {
  yield takeLeading("FETCH_TODOS", fetchTodosSaga);
}

function* onAdd() {
  yield takeLeading("ADD_TODOS_SAGA", onAddTodoSaga);
}

function* onDelete() {
  yield takeLeading("DELETE_TODOS_SAGA", onDeleteTodoSaga);
}

function* onUpdate() {
  yield takeLeading("UPDATE_TODOS_SAGA", onUpdateTodoSaga);
}

function* onToggleAllTodos() {
  yield takeLeading("TOGGLE_ALL_TODOS_SAGA", onToggleAllTodosSaga);
}

function* onClearCompletedTodos() {
  yield takeLeading("CLEAR_COMPLETED_TODOS_SAGA", onClearCompletedTodosSaga);
}

export function* todos() {
  yield all([
    call(onFetchTodos),
    call(onAdd),
    call(onDelete),
    call(onUpdate),
    call(onToggleAllTodos),
    call(onClearCompletedTodos),
  ]);
}
