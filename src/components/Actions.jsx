import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import SaveModal from "./SaveModal";

function Actions(props) {
    const [todosObj, setTodosObj] = useState(null);
    const [todosUrl, setTodosUrl] = useState("");

    const clearTodos = () => {
        props.setTodos([])
    };

    const toggleSaveModal = () => {
        document.getElementById('modal').classList.toggle('hidden');
    };

    const newTodos = () => {
        props.setTodosId("");
        props.setTodos([]);
        window.history.replaceState(null, "Todo App", "/");
    }

    const saveTodos = () => {
        if (props.todosId != "") {
            setTodosObj({
                ...todosObj,
                id: props.todosId,
                todos: props.todos
            });
        } else {
            const todosId = nanoid();
            setTodosObj({
                id: todosId,
                todos: props.todos
            });
            props.setTodosId(todosId);
            window.history.replaceState(null, "Todo App", "/" + todosId);
        }
        toggleSaveModal();
    };

    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
    useEffect(() => {
        if (todosObj != null) {
            fetch(apiEndpoint + '/api/todos?id=' + todosObj.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todosObj.todos),
            })
                .then(response => response.json())
                .catch(error => console.error('Error fetching data:', error));
            setTodosUrl(window.location.origin + "/" + todosObj.id);
        }
    }, [todosObj]);

    return (
        <>
            <div className="p-8 text-center">
                <button
                    onClick={newTodos}
                    className="bg-blue-500 text-white px-6 py-2 
                    rounded-lg hover:bg-blue-800">New
                </button>
                <button onClick={clearTodos}
                    className="ml-2 border-none px-4 py-2 rounded-lg 
                        bg-red-500 text-white hover:bg-red-800">
                    Clear All
                </button>
                <button onClick={saveTodos}
                    className="ml-2 border-none px-6 py-2 rounded-lg 
                        bg-emerald-500 text-white hover:bg-emerald-800">
                    Save
                </button>
                <SaveModal todos={props.todos} todosUrl={todosUrl} toggleModal={toggleSaveModal} />
            </div>
        </>
    )
}

export default Actions