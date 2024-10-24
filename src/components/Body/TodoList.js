import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, clearCompletedTodosSaga } from "../../redux/actions";
import TodoItem from "./TodoItem";
import { memo } from "react";
import { toast } from "react-toastify";
import "../../styles/body/TodoList.css";
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.app);

  const activeCount = todos.filter((todo) => todo.id && !todo.completed).length;

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleClearCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length === 0) {
      toast.info("Không thể xóa vì chưa có việc hoàn thành!");
      return;
    }
    dispatch(clearCompletedTodosSaga());
    toast.success("Đã xóa tất cả các việc đã hoàn thành!");
  };

  const filterTodos = (filter) => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="list-container">
      <ul>
        {filterTodos(filter)
          .filter((todo) => todo.id)
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </ul>

      {todos.length > 0 && (
        <footer className="footer">
          <p className="count">{activeCount} items left</p>
          <div className="filters">
            <button
              className={filter === "all" ? "selected" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "selected" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "selected" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
}

export default memo(TodoList);
