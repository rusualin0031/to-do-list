import { useState } from "react";
import moment from "moment";
import groups from "../../../../data/groups.js";

function TaskForm({ onSubmit }) {
    const [input, setInput] = useState("");
    const [assignedUser, setAssignedUser] = useState("");
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
            assignedUser: assignedUser,
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
            <button type="button" className="add-buton" onClick={handleSubmit}>
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;
