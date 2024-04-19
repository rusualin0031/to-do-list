import React, { useState } from "react";
import moment from "moment";

function TaskForm({ onSubmit, users }) {
    const [input, setInput] = useState("");
    const [assignedUser, setAssignedUser] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleUserChange = (event) => {
        setAssignedUser(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (input.trim() === "" || assignedUser === "") return; 
        const newTask = {
            label: input.trim(),
            due: moment().add(7, 'days').format('YYYY-MM-DD'),
            isChecked: false,
            assignedUser: assignedUser 
        };
        onSubmit(newTask);
        setInput("");
        setAssignedUser("");
    };

    return (
        <div className="newTaskForm">
            <input
                type="text"
                placeholder="Enter a task"
                value={input}
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
            />
            <select value={assignedUser} onChange={handleUserChange}>
                <option value="">Assign to...</option>
                {users.map((user, index) => (
                    <option key={index} value={user}>{user}</option>
                ))}
            </select>
            <button type="button" className="add-buton" onClick={handleSubmit}>
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;
