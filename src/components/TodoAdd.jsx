import { useState } from "react";

function TodoAdd(props) {
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input !== "") {
            props.setTodos([...props.todos, {
                id: Date.now(),
                text: input,
                completed: false
            }]);
            setInput("");
        }
    };

    return (
        <>
            <div className="mb-4 flex">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" placeholder="Add a new todo item..."
                    className="flex-grow w-sm px-3 py-2 border rounded-l-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-8 py-2 
                    rounded-r-lg hover:bg-blue-600">Add
                </button>
            </div>
        </>
    )
}

export default TodoAdd