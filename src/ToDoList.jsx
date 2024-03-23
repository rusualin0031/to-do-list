import React, { useEffect, useState } from "react";

function ToDoList() {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editedTaskLabel, setEditedTaskLabel] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    const handleDeleteTask = (task) => {
        if (window.confirm("Do you really want to delete?")) {
            const newTasks = tasks.filter(
                (t) => t !== task
            );
            setTasks(newTasks);
        }
    }

    const handleSubmit = () => {
        if (input.trim() === '') return;

        const newTask = {
            label: input.trim(),
            isChecked: false,
        };
        setTasks([
            ...tasks,
            newTask
        ]);
        setInput("");
    }

    useEffect(() => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            setTasks(JSON.parse(tasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleChangeIsChecked = (task, isChecked) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    label: task.label,
                    isChecked: isChecked,
                };
            }
            return t;
        });
        setTasks(newTasks);
    }

    const handleEditButtonClick = (task) => {
        setEditingTask(task);
        setEditedTaskLabel(task.label);
    }

    const handleSaveEdit = (task, editedName) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    ...t,
                    label: editedName,
                };
            }
            return t;
        });
        setTasks(newTasks);
        setEditingTask(null);
        setEditedTaskLabel("");
    }

    const reorderList = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    return (
        <>
            <div className="container">
                <div className="card">
                    <h1>To-Do-List</h1> 
                    <div className="newTaskForm">
                        <input
                            type="text"
                            placeholder="Enter a task"
                            value={input}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyUp}
                        />
                        <button type="button" className="add-buton" onClick={handleSubmit}>
                            Add Task
                        </button>
                    </div>
                    <div className="toDoListItems">
                        {tasks.map((task, index) => (
                            <div className="toDoListItem" key={index}>
                                <input type="checkbox" checked={task.isChecked} onChange={(ev) => handleChangeIsChecked(task, ev.target.checked)} />
                                {editingTask === task ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedTaskLabel}
                                            onChange={(e) => setEditedTaskLabel(e.target.value)}
                                            onBlur={() => handleSaveEdit(task, editedTaskLabel)}
                                            onKeyUp={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSaveEdit(task, editedTaskLabel);
                                                }
                                            }}
                                        />
                                        <button onClick={() => handleSaveEdit(task, editedTaskLabel)}>Save</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="itemLabel">{task.label}</span>
                                        <button className="button-edit" onClick={() => handleEditButtonClick(task)}>Edit</button>
                                        <button className="button-delete" onClick={() => handleDeleteTask(task)}>Delete</button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;
