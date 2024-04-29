import { useState } from "react";
import moment from "moment";
import groups from "../../../../data/groups.js";
import users from "../../../../data/users.js";

function TaskForm({ onSubmit }) {
    const [input, setInput] = useState("");
    const [assignedUser, setAssignedUser] = useState(users[0]);
    const [assignedGroup, setAssignedGroup] = useState(groups[0].id);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = () => {
        if (input.trim() === "") return;
        const newTask = {
            label: input.trim(),
            due: moment().add(7, 'days').format('YYYY-MM-DD'),
            isChecked: false,
            user: assignedUser,
            group: assignedGroup
        };
        onSubmit(newTask);
        setInput("");
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
            <select
                value={assignedGroup.id}
                onChange={(e) => setAssignedGroup(parseInt(e.target.value))}
            >
                {groups.map((group) => (
                    <option key={group.id} value={group.id}>{group.label}</option>
                ))}
            </select>
            <select
                value={assignedUser.id}
                onChange={(e) => setAssignedUser(users.find(user => user.id === parseInt(e.target.value)))}
            >
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.label}</option>
                ))}
            </select>
            <button type="button" className="add-buton" onClick={handleSubmit}>
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;
