import { useState } from "react";

function TodoItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.todo.text);

    const editTodo = () => {
        setIsEditing(true);
    };

    const saveTodo = () => {
        updateTodo(props.todo.id, editedText);
        setIsEditing(false);
    };

    const cancelTodo = () => {
        setIsEditing(false);
        setEditedText(props.todo.text);
    };

    const changeInput = (e) => {
        setEditedText(e.target.value);
    };

    const updateTodo = (id, newText) => {
        props.setTodos(props.todos.map(todo =>
            todo.id === id ?
                { ...todo, text: newText } :
                todo))
    }

    const toggleTodo = () => {
        props.setTodos(
            props.todos.map((t) => (
                t.id === props.todo.id ? {
                    ...t, completed: !t.completed
                } : t
            ))
        )
    };

    const deleteTodo = () => {
        props.setTodos(props.todos.filter(
            (t) => t.id !== props.todo.id))
    };

    return (
        <>
            {isEditing ? (
                <>
                    <input
                        value={editedText}
                        onChange={changeInput}
                        type="text"
                        className="flex-grow px-3 py-2 border 
                        rounded-l-lg focus:outline-none focus:ring-2 
                        focus:ring-blue-500" />
                    <button onClick={cancelTodo}
                        className="ml-2 border-none p-2 rounded-lg 
                        bg-red-500 text-white hover:bg-red-800">
                        Cancel
                    </button>
                    <button onClick={saveTodo}
                        className="ml-2 border-none p-2 rounded-lg 
                        bg-emerald-500 text-white hover:bg-emerald-800">
                        Save
                    </button>
                </>
            ) : (
                <>
                    <span className="grippy"></span>
                    <input type="checkbox" checked={props.todo.completed}
                        onChange={toggleTodo}
                        className="mr-2 h-5 min-w-5 text-blue-600"
                    />
                    <span className={`flex-1/2 break-all ${props.todo.completed ?
                        "line-through text-gray-500" : "text-gray-800"}`}>
                        {props.todo.text}
                    </span>
                    <button onClick={editTodo}
                        className="ml-2 border-none p-2 rounded-lg 
                        bg-emerald-500 text-white hover:bg-emerald-800">
                        Edit
                    </button>
                    <button onClick={deleteTodo}
                        className="ml-2 border-none p-2 rounded-lg 
                        bg-red-500 text-white hover:bg-red-800">
                        Delete
                    </button>
                </>
            )
            }
        </>
    )
}

export default TodoItem