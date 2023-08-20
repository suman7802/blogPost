import axios from "axios";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const url = `http://localhost:8000/api/todo`;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [responseFromServer, setResponseFromServer] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cookieExists = document.cookie.indexOf(`access-token-01=`) !== -1;
    cookieExists ? navigate("/home") : navigate("/login");
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const updatedTodos = data.map((todoItem) => {
          return {
            id: todoItem._id,
            todo: todoItem.todo,
            completed: todoItem.completed,
          };
        });
        setTodos(updatedTodos);
      } catch (error) {
        setResponseFromServer(`Error Fetching Data`);
        console.error("Error Fetching:", error.message);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    if (responseFromServer) {
      const timer = setTimeout(() => {
        setResponseFromServer("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [responseFromServer]);

  const handleRemove = async (todoId) => {
    try {
      const response = await axios.delete(url, {
        data: {_id: todoId},
      });
      if (response.status === 200) {
        setResponseFromServer("Todo Removed");
      }
    } catch (error) {
      setResponseFromServer(error.message);
      console.error(error.message);
    }

    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleEdit = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, editable: true};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleSave = async (todoId, newText) => {
    const trimmedText = newText.trim();

    if (trimmedText.length === 0) {
      handleCancel(todoId);
      return;
    }
    const newTodo = {
      _id: todoId,
      todo: newText,
    };
    try {
      const response = await axios.put(url, newTodo);
      if (response.status === 200) {
        setResponseFromServer(`Todo Edited`);
      }
    } catch (error) {
      setResponseFromServer(error.message);
      console.error(error.message);
    }

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, todo: trimmedText};
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleCancel = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, editable: false};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleInputChange = (todoId, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, todo: newText};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleKeyDown = async (event, todoId, newText) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(todoId, newText);
    }
  };

  const handleToggleComplete = async (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    });

    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find((todo) => todo.id === todoId);
    const {completed} = todoToUpdate;

    const newTodo = {
      _id: todoId,
      completed,
    };

    try {
      await axios.put(url, newTodo);
      setResponseFromServer(`Updated`);
    } catch (error) {
      console.error(error.message);
      setResponseFromServer(error.message);
    }
  };

  const handleAddTodo = async () => {
    const trimmedText = newTodoText.trim();

    if (trimmedText.length === 0) return;

    const newTodo = {
      todo: trimmedText,
      completed: false,
    };

    try {
      axios.post(url, newTodo).then(function (response) {
        setResponseFromServer(`Added new Todo "${response.data.todo}"`);
      });
    } catch (error) {
      setResponseFromServer(error.message);
      console.error("Error Creating Todo:", error.message);
    }

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const handleLogout = () => {
    document.cookie =
      "access-token-01" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h2>Todo List</h2>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      {responseFromServer && <p>{responseFromServer}</p>}
      <div className="add-todo">
        <input
          className="inside-add-todo"
          type="todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <div className="todo-actions">
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
      {todos.length === 0 ? <h2>Empty</h2> : null}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item  ${todo.completed ? "completed" : ""}`}>
            {todo.editable ? (
              <input
                className="inside-add-todo"
                type="todo"
                value={todo.todo}
                onChange={(e) => handleInputChange(todo.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, todo.id, todo.todo)}
              />
            ) : (
              <span>{todo.todo}</span>
            )}
            <div className="todo-actions">
              {todo.editable ? (
                <>
                  <div className="save-cancel">
                    <button onClick={() => handleSave(todo.id, todo.todo)}>
                      Save
                    </button>
                    <button onClick={() => handleCancel(todo.id)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => handleRemove(todo.id)}>Remove</button>
                  <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
