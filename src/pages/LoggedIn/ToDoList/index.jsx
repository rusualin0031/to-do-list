import { useEffect, useState } from "react";
import TaskForm from "./AddNewTask";
import DndContainer from "./DndContainer";
import Swal from 'sweetalert2';
import moment from "moment/moment.js";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [urgentTasksOnly, setUrgentTasksOnly] = useState(false);
    const [selectedChecked, setSelectedChecked] = useState('checked');
    console.log(selectedChecked);

    const handleDeleteTask = (task) => {
        Swal.fire({
            title: "Do you want to delete this task?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks(tasks.filter((t) => t !== task));
            }
        });
    };

    const handleSubmit = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleChangeIsChecked = (task, isChecked) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    label: task.label,
                    isChecked: isChecked,
                    due: task.due,
                };
            }
            return t;
        });
        setTasks(newTasks);
    };

    const handleSaveEdit = (task, editedName, due) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    label: editedName,
                    isChecked: task.isChecked,
                    due: due,
                };
            }
            return t;
        });
        setTasks(newTasks);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newTasks = Array.from(tasks);
        const [reorderedTask] = newTasks.splice(result.source.index, 1);
        newTasks.splice(result.destination.index, 0, reorderedTask);
        setTasks(newTasks);
    };

    const filteredTasks = tasks
      .filter((task) => {
        if(searchInput === "") return true;
        return task.label.toLowerCase().includes(searchInput.toLowerCase());
      })
      .filter((task) => {
        if(!urgentTasksOnly) return true;
        return moment().isAfter(task.due);
      })
      .filter((task) => {
        if(selectedChecked === "all") return true;
        if(selectedChecked === "checked") return task.isChecked;
        if(selectedChecked === "unchecked") return !task.isChecked;
      })

    useEffect(() => {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            setTasks(JSON.parse(tasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <>
            <div className="container">
                <div className="card">
                    <h1>To Do List</h1>

                    <TaskForm onSubmit={handleSubmit} />

                    <div className="filter-tasks">
                        <div>
                            <input
                                type="text"
                                placeholder="Search task"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                        <div className="urgent-tasks">
                            <div className="checkbox">
                                <img
                                    src={urgentTasksOnly ? "/src/assets/checkbox-selected.svg" : "/src/assets/checkbox-unselected.svg"}
                                    onClick={() => setUrgentTasksOnly(!urgentTasksOnly)}
                                />
                            </div>
                            <label>
                                <h3 style={{ color: 'red' }}>Urgent tasks only</h3>
                            </label>
                        </div>
                        <div>
                            <select
                                value={selectedChecked}
                                onChange={e => setSelectedChecked(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="checked">Checked</option>
                                <option value="unchecked">Unchecked</option>
                            </select>
                        </div>
                    </div>

                    <DndContainer
                        tasks={filteredTasks}
                        onDragEnd={handleDragEnd}
                        onDelete={handleDeleteTask}
                        onChangeIsChecked={handleChangeIsChecked}
                        onSaveEdit={handleSaveEdit}
                    />

                    {/*
                    {tasks.length > tasksPerPage && (
                        <div className="pagination">
                            {[...Array(Math.ceil(tasks.length / tasksPerPage)).keys()].map((number) => (
                                <button key={number} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                    )}
                    */}
                </div>
            </div>
        </>
    );
}

export default ToDoList;
