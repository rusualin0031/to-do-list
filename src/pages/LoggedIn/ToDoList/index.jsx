import { useEffect, useState } from "react";
import TaskForm from "./AddNewTask";
import DndContainer from "./DndContainer";
import Swal from 'sweetalert2';
import moment from "moment";
import groups from "../../../data/groups";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [urgentTasksOnly, setUrgentTasksOnly] = useState(false);
    const [selectedChecked, setSelectedChecked] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [users] = useState(["User 1", "User 2", "User 3"]);
    const [selectedGroup, setSelectedGroup] = useState( 0 );

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

    const handleChangeIsChecked = (task, isChecked, groups) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    ...t,
                    label: task.label,
                    isChecked: isChecked,
                    due: task.due,
                    groups: groups || t.groups
                };
            }
            return t;
        });
        setTasks(newTasks);
    };

    const handleSaveEdit = (task, editedName, due, groups) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    ...t,
                    label: editedName,
                    isChecked: task.isChecked,
                    due: due,
                    groups: groups || t.groups,
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
            if (searchInput === "") return true;
            return task.label.toLowerCase().includes(searchInput.toLowerCase());
        })
        .filter((task) => {
            if (!urgentTasksOnly) return true;
            return moment().isAfter(task.due);
        })
        .filter((task) => {
            if (selectedChecked === "all") return true;
            if (selectedChecked === "checked") return task.isChecked;
            if (selectedChecked === "unchecked") return !task.isChecked;
        })
        .filter((task) => {
            if (selectedGroup === 0 ) return true;
            return task.group === selectedGroup;
        });

    const sortedTasks = filteredTasks
        .sort((a, b) => {
            if (sortBy === "default") return 0;

            if (sortBy === "name") return a.label.localeCompare(b.label);
            if (sortBy === "name-desc") return b.label.localeCompare(a.label);

            if (sortBy === "due-date") return new Date(a.due) - new Date(b.due);
            if (sortBy === "due-date-desc") return new Date(b.due) - new Date(a.due);
        });

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

                    <TaskForm onSubmit={handleSubmit} users={users} groups={groups} />

                    <div className="filter-tasks">
                        <div className="search-task">
                            <input
                                type="text"
                                placeholder="Search task"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                        <div className="urgent-tasks">
                            <label>
                                Urgent tasks only
                            </label>
                            <div className="checkbox">
                                <img
                                    src={urgentTasksOnly ? "/src/assets/checkbox-selected.svg" : "/src/assets/checkbox-unselected.svg"}
                                    onClick={() => setUrgentTasksOnly(!urgentTasksOnly)}
                                />
                            </div>
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
                        <div>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                            >
                                <option value="default">Default</option>
                                <option value="name">Name</option>
                                <option value="name-desc">Name (DESC)</option>
                                <option value="due-date">Due date</option>
                                <option value="due-date-desc">Due date (DESC)</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={selectedGroup}
                                onChange={e => setSelectedGroup(parseInt(e.target.value))}
                            >
                                <option value="0">All Groups</option>
                                {groups.map((group) => (
                                    <option
                                        value={group.id}
                                        key={group.id}
                                    >
                                        {group.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <DndContainer
                        tasks={sortedTasks}
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
