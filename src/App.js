import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllByPlaceholderText } from '@testing-library/react';

const Todo = ({ todo }) => <div className="todo">{todo.name}</div>;

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Learn about React",
      isCompleted: false,
      description: "  I want to learn about react and stuff",
      date: new Date().toLocaleString()
    },
    {
      id: 2,
      name: "Meet friend for lunch",
      isCompleted: false,
      description: "A FRIEND AND I ARE GOING TO GET PASTA",
      date: new Date().toLocaleString()
    },
    {
      id: 3,
      name: "Build a really cool todo app",
      isCompleted: false,
      description: "the app that youre looking at must be prettier",
      date: new Date().toLocaleString()
    }
  ]);



  const addTodo = name => {
    const newTodos = [...todos, { name }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.id}
        {todo.name}
        {todo.description}
        {todo.date}
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
