import {useEffect, useState} from "react";

function ToDoList() {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    // const [newTask, setNewTask] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
      if(input.trim() === '') return;

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

    useEffect( () => {
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

    return(
        <>
            <div className="to-do-list">
                <h1>To-Do-List</h1>
            </div>

            {tasks.map((task, index) => (
                <div key={index}>
                    <input type="checkbox" onChange={(ev) => {
                      handleChangeIsChecked(task, ev.target.checked);
                    }} />
                    <span>
                      {task.label}
                      {task.isChecked ? " (done)" : ""}
                    </span>
                </div>
            ))}

            <div>
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={input}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                />
                <button className="add-buton" onClick={handleSubmit}>
                    Add Task
                </button>
            </div>
        </>
    );
}

export default ToDoList