import React, { useEffect, useState } from 'react';
import todoApi from './api/todoApi';
import './App.css';
import TodoForm from './components/TodoForm';

function App() {
  // useState is a hook that helps you manage the state (i.e. the values in the component).
  // useState returns two things 1. the data, 2. a function to update the data
  // in this case the state is the `todos` and the way  to update the state is using `setTodos`
  const [todos, setTodos] = useState([])

  // useEffect is called when the component is being `mounted`
  useEffect(() => {
    // load the todos from the server
    const data = todoApi.getAll();
    // update the state of the component -> will cause the componet to redraw themselves
    setTodos(data);
  }, []);

  const addTodo = name => {
    const newTodo = {
      name, // same as writing `name: name`
      description: "Missing desc",
      isCompleted: false
    }
    // Call todoApi.add to update the todos
    todoApi.add(newTodo);

    // Get the latest todos and update the state;
    // The reason we use the ... operator is to copy the data over
    // so that react can "notice" there was a change
    setTodos([...todoApi.getAll()]);
  };

  // TODO: Alex L - try to redo the logic using todoApi
  const completeTodo = index => {
    const newTodos = [...todoApi.getAll()];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  // TODO: Alex L - try to redo the logic using todoApi
  const removeTodo = index => {
    const newTodos = [...todoApi.getAll()];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  function Todo({ todo, index, completeTodo, removeTodo }) {

    function KeyValue({ label, children }) {
      return (
        <div>
          <span style={{ fontWeight: "bold" }}>{label}: </span>{children}
        </div>
      );
    }

    return (
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        <div className="todo-content">
          <KeyValue label="ID">{todo.id}</KeyValue>
          <KeyValue label="Name">{todo.name}</KeyValue>
          <KeyValue label="Description">{todo.description}</KeyValue>
        </div>
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => removeTodo(index)}>x</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}


export default App;
