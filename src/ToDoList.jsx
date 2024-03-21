import React, { useState } from "react";

function ToDoList() {

    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);

    }

    function addTask() {

    }

    function deleteTask(index) {

    }

    function moveTaskUp(index) {

    }

    function moveTaskDown(index) {

    }

    return(
        <>
            <div className="to-do-list">
                <h1>To-Do-List</h1>
            </div>

            <div>
                <input type="text" 
                    placeholder="Enter a task" 
                    value={newTask} 
                    onRateChange={handleInputChange} 
                />
                <button className="add-buton">
                    Add Task
                </button>
            </div>
        </>
    );
}

export default ToDoList