import { useState } from "react";

function ToDoList() {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    // const [newTask, setNewTask] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        setTasks([...tasks, input]);
        setInput("");
    }

    return(
        <>
            <div className="to-do-list">
                <h1>To-Do-List</h1>
            </div>

            {tasks.map((task, index) => (
                <div key={index}>
                    <input type="checkbox" />
                    <span>{task}</span>
                </div>
            ))}

            <div>
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={input}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                />
                <button className="add-buton" onClick={handleSubmit}>
                    Add Task
                </button>
            </div>
        </>
    );
}

export default ToDoList