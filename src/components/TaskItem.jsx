
import {useEffect, useState} from "react";

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

    const handleCancelEdit = () => {
        setEditedTaskLabel(task.label);
        setEditingTask(null);
    }

    console.log(editedTaskLabel, task.label)

    const isEditing = editingTask === task;

    return (
        <>
            {isEditing && (
                <>
                  <span className="itemLabel">
                    <input
                      type="text"
                      value={editedTaskLabel}
                      onChange={( e ) => setEditedTaskLabel( e.target.value )}
                      onKeyUp={( e ) => {
                        if ( e.key === "Enter" ) {
                          handleSaveEdit();
                        }
                      }}
                    />
                  </span>
                  <button className="button button__save" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="button button__cancel" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
            )}

            {!isEditing && (
              <>
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={( ev ) => onChangeIsChecked( task, ev.target.checked )}
                />
                <span className="itemLabel">{task.label}</span>
                <button className="button button__edit" onClick={handleEditButtonClick}>
                  Edit
                </button>
                <button className="button button__delete" onClick={() => onDelete( task )}>
                  Delete
                </button>
              </>
            )}
        </>
    );
}

export default TaskItem;
