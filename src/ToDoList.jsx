import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

    const handleDragEnd = (result) => {
        if (!result.destination) return; // dropped outside the list
        const newTasks = Array.from(tasks);
        const [reorderedTask] = newTasks.splice(result.source.index, 1);
        newTasks.splice(result.destination.index, 0, reorderedTask);
        setTasks(newTasks);
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
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="tasks">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="toDoListItems">
                                    {tasks.map((task, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="toDoListItem"
                                                >
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
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </>
    );
}

export default ToDoList;
