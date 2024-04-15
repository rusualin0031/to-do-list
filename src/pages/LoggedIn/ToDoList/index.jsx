import { useEffect, useState } from "react";
import TaskForm from "./AddNewTask";
import DndContainer from "./DndContainer";
import Swal from 'sweetalert2';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [urgentTasksOnly, setUrgentTasksOnly] = useState(false);
    const tasksPerPage = 10;

    console.log({searchInput, urgentTasksOnly});

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

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks
      // .filter(() => {})
      .slice(indexOfFirstTask, indexOfLastTask);

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

                    <div className="filter-tasks">
                      <div>
                          <input
                            type="text"
                            placeholder="Search task"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                          />
                      </div>
                      <div>
                          <label>
                            <input
                              type="checkbox"
                              checked={urgentTasksOnly}
                              onChange={(e) => setUrgentTasksOnly(e.target.checked)}
                            />
                            Urgent tasks only
                          </label>
                      </div>
                    </div>

                    <DndContainer
                      tasks={currentTasks}
                      onDragEnd={handleDragEnd}
                      onDelete={handleDeleteTask}
                      onChangeIsChecked={handleChangeIsChecked}
                      onSaveEdit={handleSaveEdit}
                    />

                    <TaskForm onSubmit={handleSubmit}/>

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
