import React, { useState } from "react";
import moment from "moment";

function TaskForm({ onSubmit, users, groups }) {
    const [input, setInput] = useState("");
    const [assignedUser, setAssignedUser] = useState("");
    const [assignedGroup, setAssignedGroup] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleUserChange = (event) => {
        setAssignedUser(event.target.value);
    };

    const handleSubmit = () => {
        if (input.trim() === "") return;
        const newTask = {
            label: input.trim(),
            due: moment().add(7, 'days').format('YYYY-MM-DD'),
            isChecked: false,
            assignedUser: assignedUser,
            assignedGroup: assignedGroup
        };
        onSubmit(newTask);
        setInput("");
        setAssignedUser("");
        setAssignedGroup("");
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
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
                {groups && Array.isArray(groups) && groups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                ))}
            </select>
            <button type="button" className="add-buton" onClick={handleSubmit}>
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;
