const todos = [
    {
        id: 1,
        name: "Learn to cook",
        description: "I want to learn how to cook",
        isCompleted: false,
        createdAt: new Date(),
    },
    {
        id: 2,
        name: "Learn to dance",
        description: "I want to learn how to cook life Gordon",
        isCompleted: false,
        createdAt: new Date(),
    },
    {
        id: 3,
        name: "Learn to play guitar",
        description: "I want to learn how to rock out with my cock out",
        isCompleted: false,
        createdAt: new Date(),
    }
];

class TodoApi {
    add(todo) {
        todos.push(todo);
    }

    getAll() {
        return todos;
    }

    updateByID(todoID, data) {
        const todo = this.getAll().find(c => c.id === parseInt(todoID));
        if (!todo) return null;

        const { isCompleted, description } = data

        const isNotNullOrUndefined = value => value !== null || value !== undefined

        if (isNotNullOrUndefined(isCompleted)) {
            todo.isCompleted = isCompleted
        }

        if (isNotNullOrUndefined(description)) {
            todo.description = description
        }
        return todo;
    }

    deleteByID(todoID) {
        const todo = this.getAll().find(c => c.id === parseInt(todoID));
        if (!todo) return null;

        const index = todos.indexOf(todo);
        todos.splice(index, 1);
        return todo;
    }
} 

// Export the TodoApi to be visible to other files
export default new TodoApi();