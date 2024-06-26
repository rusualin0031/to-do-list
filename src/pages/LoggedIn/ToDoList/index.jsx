import { useEffect, useState } from "react";
import TaskForm from "./AddNewTask";
import DndContainer from "./DndContainer";
import Swal from 'sweetalert2';
import moment from "moment";
import groups from "../../../data/groups";
import users from "../../../data/users";
import {useDispatch, useSelector} from "react-redux";
import {setTaskList} from "../../../store/slices/tasksSlice.js";

function ToDoList() {
    const [searchInput, setSearchInput] = useState("");
    const [urgentTasksOnly, setUrgentTasksOnly] = useState(false);
    const [selectedChecked, setSelectedChecked] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [selectedUser, setSelectedUser] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState(0);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.list);
    const [selectedTaskColor, setSelectedTaskColor] = useState(null);

    const handleDeleteTask = (task) => {
        Swal.fire({
            title: "Do you want to delete this task?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setTaskList(tasks.filter((t) => t !== task)));
            }
        });
    };

    const handleSubmit = (newTask) => {
        dispatch(setTaskList([...tasks, newTask]));
    };

    const handleChangeIsChecked = (task, isChecked, group, user,) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    ...t,
                    label: task.label,
                    isChecked: isChecked,
                    due: task.due,
                    group: group || t.group,
                    user: user || t.user,
                };
            }
            return t;
        });
        dispatch(setTaskList(newTasks));
    };

    const handleSaveEdit = (task, editedName, due, group, user) => {
        const newTasks = tasks.map((t) => {
            if (t === task) {
                return {
                    ...t,
                    label: editedName,
                    isChecked: task.isChecked,
                    due: due,
                    group: group || t.group,
                    user: user || t.user,
                };
            }
            return t;
        });
        dispatch(setTaskList(newTasks));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newTasks = Array.from(tasks);
        const [reorderedTask] = newTasks.splice(result.source.index, 1);
        newTasks.splice(result.destination.index, 0, reorderedTask);
        dispatch(setTaskList(newTasks));
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
            if (selectedGroup === 0) return true;
            return task.group === selectedGroup;
        })
        .filter((task) => {
            if (selectedUser === 0) return true;
            return task.user === selectedUser;
        });

    const sortedTasks = filteredTasks
        .sort((a, b) => {
            if (sortBy === "default") return 0;

            if (sortBy === "name") return a.label.localeCompare(b.label);
            if (sortBy === "name-desc") return b.label.localeCompare(a.label);

            if (sortBy === "due-date") return new Date(a.due) - new Date(b.due);
            if (sortBy === "due-date-desc") return new Date(b.due) - new Date(a.due);
        });

    const setTaskColor = (color) => {
        dispatch(setSelectedTaskColor(color));
    }

    useEffect(() => {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            const localStorageTasks = JSON.parse(tasks);
            dispatch(setTaskList(localStorageTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("selectedTaskColor", "selectedTaskColor");
    }, [selectedTaskColor]);

    return (
        <>
            <div className="container">
                <div className="card">
                    <h1>To Do List</h1>

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
                        <div>
                            <select
                                value={selectedUser}
                                onChange={e => setSelectedUser(parseInt(e.target.value))}
                            >
                                <option value="0">All Users</option>
                                {users.map((user) => (
                                    <option
                                        value={user.id}
                                        key={user.id}
                                    >
                                        {user.label}
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
                    <TaskForm onSubmit={handleSubmit} />

                </div>
            </div>
        </>
    );
}

export default ToDoList;
