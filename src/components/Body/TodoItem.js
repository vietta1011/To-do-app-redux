import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoSaga, updateTodoSaga } from "../../redux/actions";
import { memo } from "react";
import { toast } from "react-toastify";
import "../../styles/body/TodoItem.css";
import "react-toastify/dist/ReactToastify.css";

const TodoItem = ({ todo }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleUpdate = useCallback(() => {
    dispatch(updateTodoSaga({ ...todo, text }));
    toast.success("Đã cập nhật nội dung việc!");
  }, [text, todo, dispatch]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTodoSaga(todo.id));
    toast.success("Xóa việc thành công!");
  }, [todo.id, dispatch]);

  const handleCheckboxChange = useCallback(() => {
    dispatch(updateTodoSaga({ ...todo, completed: !todo.completed }));
    if (todo.completed) {
      toast.success("Đã cập nhật trạng thái công việc là chưa hoàn thành!");
    } else {
      toast.success("Đã cập nhật trạng thái công việc là hoàn thành!");
    }
  }, [todo, dispatch]);

  const handleDoubleClick = () => {
    setEdit(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
      setEdit(false);
    }
  };

  return (
    <li className={todo.completed ? "liComplete" : "li"}>
      <div className="row">
        {!edit && (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
        )}
        {edit ? (
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            className="editInput"
            value={text}
            onBlur={() => {
              handleUpdate();
              setEdit(false);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div
            className="todo-text-container"
            onDoubleClick={handleDoubleClick}
          >
            <p className={todo.completed ? "textComplete" : "text"}>
              {todo.text}
            </p>
          </div>
        )}
        {!edit && (
          <button className="deleteTodo" onClick={handleDelete}>
            x
          </button>
        )}
      </div>
    </li>
  );
};

export default memo(TodoItem);
