import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoSaga, toggleAllTodosSaga } from "../../redux/actions";
import { memo } from "react";
import { serverTimestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "../../styles/body/TodoInput.css";
import "react-toastify/dist/ReactToastify.css";

function TodoInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.app);

  const handleAddTodo = useCallback(() => {
    if (input.trim() === "") {
      toast.error("Hãy nhập việc cần làm!");
      return;
    }
    const newTodo = {
      text: input,
      completed: false,
      timestamp: serverTimestamp(),
    };
    dispatch(addTodoSaga(newTodo));
    setInput("");
    toast.success("Tạo mới công việc thành công!");
  }, [input, dispatch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTodo();
    }
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    dispatch(toggleAllTodosSaga(!allCompleted));
    toast.success(
      allCompleted
        ? "Tất cả việc đã được đặt lại là chưa hoàn thành!"
        : "Tất cả việc đã hoàn thành!"
    );
  };

  return (
    <div>
      <div className="input-container">
        {todos.length > 0 && (
          <button className="toggle-button" onClick={toggleAll}>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        )}
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="text-input"
          placeholder="What needs to be done?"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default memo(TodoInput);
