import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../../Molecules/Custom Button/CustomButton";
import CustomInput from "../../Molecules/Custom Input/CustomInput";
import styles from "./TaskopolisBox.module.css";
import LogoutPopover from "../../Molecules/Logout Popover/LogoutPopover";
import StarRating from "../../Molecules/Star Rating/StarRating";
import Swal from "sweetalert2";

function TaskopolisBox() {
  const [user] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    return storedUser;
  });

  const [todos, setTodos] = useState(() => {
    const storedTodos = user
      ? JSON.parse(localStorage.getItem(`todos_${user.email}`)) || []
      : [];
    return storedTodos;
  });

  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: styles["ConfirmButton"],
      cancelButton: styles["CancelButton"],
    },
    buttonsStyling: false,
  });

  const matchedDeets = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(todos));
    }
  }, [user, todos]);

  function handleNewTodoChange(event) {
    setNewTodo(event.target.value);
  }

  function handleAddTodo() {
    if (newTodo) {
      const newId = uuidv4();
      const newTodoItem = { id: newId, text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    if (!todos.find((todo) => todo.id === id).completed) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task completed.",
        showConfirmButton: false,
        timer: 2050,
      });
    }
  }

  function deleteTodo(id) {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel it!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedTodos = todos.filter((todo) => todo.id !== id);
          setTodos(updatedTodos);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Don't worry! Your task is safe.",
            "error"
          );
        }
      });
  }

  function handleEditButtonClick(id, text) {
    setEditingTodoId(id);
    setEditingTodoText(text);
  }

  function handleEditTodoChange(event) {
    setEditingTodoText(event.target.value);
  }

  function handleSaveButtonClick() {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingTodoId) {
        return { ...todo, text: editingTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your edits has been saved.",
      showConfirmButton: false,
      timer: 2050,
    });
  }

  return (
    <div className={styles.MainTaskpolisBoxContainer}>
      <div className={styles.AddTaskContainer}>
        <CustomInput
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          className={styles.InputContainer}
          placeholder="What's the plan for today?"
        />
        <div className={styles.ButtonPlusLogo}>
          <CustomButton
            className={styles.ButtonContainer}
            buttontext="Add Task"
            onClick={handleAddTodo}
          />
          <h2 className={styles.Logo}>Taskopolis</h2>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className={styles.AlternativeMessage}>
          <img
            className={styles.LadyImage}
            src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png"
            alt="lady"
          />
          <p className={styles.NoTasksMessage}>
            Thank you for choosing us, {matchedDeets.firstName}!
          </p>
          <span className={styles.LogoutPopover}>
            <LogoutPopover />
          </span>{" "}
          <span className={styles.StarRating}>
            <StarRating />{" "}
          </span>{" "}
        </div>
      ) : (
        <div className={styles.AllTasksContainer}>
          {todos.map((todo) => (
            <div key={todo.id} className={styles.TaskList}>
              <p
                className={styles.TaskNameContainer}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <CustomInput
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => completeTodo(todo.id)}
                  className={styles.CheckBox}
                />
                {editingTodoId === todo.id ? (
                  <CustomInput
                    type="text"
                    value={editingTodoText}
                    onChange={handleEditTodoChange}
                    className={styles.EditInputContainer}
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
              </p>

              {editingTodoId === todo.id ? (
                <CustomButton
                  className={styles.ButtonContainer}
                  onClick={handleSaveButtonClick}
                  buttontext="Save"
                />
              ) : (
                <CustomButton
                  className={styles.ButtonContainer}
                  onClick={() => handleEditButtonClick(todo.id, todo.text)}
                  buttontext="Edit"
                />
              )}
              <CustomButton
                className={styles.ButtonContainer}
                onClick={() => deleteTodo(todo.id)}
                buttontext="Delete"
              />
            </div>
          ))}
          <span className={styles.LogoutPopover}>
            <LogoutPopover />
          </span>
          <span className={styles.StarRating}>
            <StarRating />{" "}
          </span>{" "}
        </div>
      )}
    </div>
  );
}

export default TaskopolisBox;
