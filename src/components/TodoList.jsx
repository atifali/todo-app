import { useState } from "react";
import TodoItem from "./TodoItem"

function TodoList(props) {
    const [dragging, setDragging] = useState(null);

    const dragStart = (e, index) => {
        setDragging(index);
        setTimeout(() => {
            e.target.style.visibility = "hidden";
        }, 0);
        const allElements = document.querySelectorAll('li>*');
        allElements.forEach(element => {
            element.style.pointerEvents = "none";
        });
    };

    const dragOver = (e, index) => {
        e.preventDefault();
    };

    const dragEnter = (e, index) => {
        e.target.classList.remove("border-gray-200");
        e.target.classList.add("border-gray-800");
        e.target.classList.add("translate-x-4");
    };

    const dragLeave = (e, index) => {
        e.target.classList.add("border-gray-200");
        e.target.classList.remove("border-gray-800");
        e.target.classList.remove("translate-x-4");
    };

    const dragEnd = (e, index) => {
        e.target.style.visibility = "visible";
        const allElements = document.querySelectorAll('li>*');
        allElements.forEach(element => {
            element.style.pointerEvents = "auto";
        });
    };

    const dropOver = (e, index) => {
        if (dragging === null || dragging === index) return;
        const newTodos = [...props.todos];
        const draggedItem = newTodos[dragging];
        newTodos.splice(dragging, 1);
        newTodos.splice(index, 0, draggedItem);
        props.setTodos(newTodos);
        setDragging(null);
        e.target.classList.add("border-gray-200");
        e.target.classList.remove("border-gray-800");
        e.target.classList.remove("translate-x-4");
    };

    return (
        <>
            <ul className="space-y-2">
                {
                    props.todos.map((todo, index) => (
                        <li key={todo.id}
                            draggable="true"
                            onDragStart={(e) => dragStart(e, index)}
                            onDragOver={(e) => dragOver(e, index)}
                            onDragEnd={(e) => dragEnd(e, index)}
                            onDragEnter={(e) => dragEnter(e, index)}
                            onDragLeave={(e) => dragLeave(e, index)}
                            onDrop={(e) => dropOver(e, index)}
                            className="flex items-center p-3 cursor-move
                                rounded-lg bg-slate-100 border
                                hover:opacity-75 border-gray-200">
                            <TodoItem todo={todo} todos={props.todos}
                                setTodos={props.setTodos} />
                        </li>
                    ))
                }
            </ul >
        </>
    )
}

export default TodoList