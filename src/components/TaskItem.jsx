
import { useState } from "react";

function TaskItem({ task, onChangeIsChecked, onSaveEdit, onDelete }) {
    const [editingTask, setEditingTask] = useState(null);
    const [editedTaskLabel, setEditedTaskLabel] = useState(task.label);

    const handleEditButtonClick = () => {
        setEditingTask(task);
    };

    const handleSaveEdit = () => {
        onSaveEdit(task, editedTaskLabel);
        setEditingTask(null);
    };

    return (
        <>
            <input
                type="checkbox"
                checked={task.isChecked}
                onChange={(ev) => onChangeIsChecked(task, ev.target.checked)}
            />

            {editingTask === task ? (
                <>
                    <input
                        type="text"
                        value={editedTaskLabel}
                        onChange={(e) => setEditedTaskLabel(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSaveEdit();
                            }
                        }}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                </>
            ) : (
                <>
                    <span className="itemLabel">{task.label}</span>
                    <button className="button-edit" onClick={handleEditButtonClick}>
                        Edit
                    </button>
                    <button className="button-delete" onClick={() => onDelete(task)}>
                        Delete
                    </button>
                </>
            )}
      </>
    );
}

export default TaskItem;
