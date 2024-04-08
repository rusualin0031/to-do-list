import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import "./taskitem.scss";
import deletetask from "../../../assets/delete-task.svg";
import edittask from "../../../assets/edit-task.svg";
import 'react-datepicker/dist/react-datepicker.css';

function TaskItem({ task, onChangeIsChecked, onSaveEdit, onDelete }) {
    const [editingTask, setEditingTask] = useState(null);
    const [editedTaskLabel, setEditedTaskLabel] = useState(task.label);
    const [dueDate, setDueDate] = useState(null);

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
                <div className="task-check" onClick={() => onChangeIsChecked(task, !task.isChecked)}>
                  {task.isChecked ? (
                    <img src="/src/assets/checkbox-selected.svg" />
                  ) : (
                    <img src="/src/assets/checkbox-unselected.svg" />
                  )}
                </div>
                <span className="itemLabel">{task.label}</span>
                <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
                <button className="button button__edit" onClick={handleEditButtonClick}>
                  <img src={edittask} alt="Edit" />
                </button>
                <button className="button button__delete" onClick={() => onDelete(task)}>
                  <img src={deletetask} alt="Delete" />
                </button>
              </>
            )}
        </>
    );
}

export default TaskItem;
