import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskList } from "../../../../store/slices/tasksSlice.js";

function ColorPicker({ task }) {
    const tasks = useSelector((state) => state.tasks.list);
    const [showColorMenu, setShowColorMenu] = useState(false);
    const dispatch = useDispatch();

    const handleShowColorMenu = () => {
        setShowColorMenu(true);
    };

    const handleHideColorMenu = () => {
        setShowColorMenu(false);
    };

    const handleSetColor = (color) => {
        setShowColorMenu(false);
        const newTasks = tasks.map(t => {
            if (t === task) {
                const newTask = { ...task, color: color };
                return newTask;
            } else {
                return t;
            }
        });
        dispatch(setTaskList(newTasks));
    };

    return (
        <div className="color-dropdown">
            <button className="color-dropdown-button" onClick={handleShowColorMenu}
                style={{ backgroundColor: task.color }}>
            </button>
            {showColorMenu && (
                <>
                    <div className="actions-menu-bg" onClick={handleHideColorMenu}></div>
                    <div className="color-dropdown-menu">
                        <div className="action-item" onClick={() => handleSetColor("#ffffff")}>White</div>
                        <div className="action-item" onClick={() => handleSetColor("#ff0000")}>Red</div>
                        <div className="action-item" onClick={() => handleSetColor("#ffaa00")}>Orange</div>
                        <div className="action-item" onClick={() => handleSetColor("#00ff00")}>Green</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ColorPicker;
