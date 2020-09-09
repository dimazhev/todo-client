import React from 'react'

function Todo({ todo, index, completeTodo, uncompleteTodo, removeTodo }) {
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
                {todo.isCompleted
                    ? <button onClick={() => uncompleteTodo(index)}>Uncomplete</button>
                    : <button onClick={() => completeTodo(index)}>Complete</button>}
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

export default Todo;