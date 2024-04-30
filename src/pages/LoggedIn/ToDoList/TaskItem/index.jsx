import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "./style.scss";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import groups from "../../../../data/groups.js";
import users from '../../../../data/users.js';
import UserSelectionModal from '../UserSelectionModal/index.jsx';

function TaskItem({ task, onChangeIsChecked, onSaveEdit, onDelete }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskLabel, setEditedTaskLabel] = useState(task.label);
  const [dueDate, setDueDate] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowActionMenu = () => {
    setShowMenu(true);
  };

  const handleHideActionMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (task.due) setDueDate(moment(task.due));
  }, []);

  const handleEditButtonClick = () => {
    setEditingTask(task);
    setShowMenu(false);
  };

  const handleSaveEdit = () => {
    onSaveEdit(task, editedTaskLabel, dueDate.format('YYYY-MM-DD'));
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditedTaskLabel(task.label);
    setEditingTask(null);
  };

  const handleDeleteClick = () => {
    onDelete(task);
    setShowMenu(false);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setShowUserModal(false);
    
  }

  const isEditing = editingTask === task;
  const group = groups.find((g) => g.id === task.group);

  return (
    <>
      {isEditing && (
        <>
          <span className="item-label">
            Task:
            <input
              type="text"
              value={editedTaskLabel}
              onChange={(e) => setEditedTaskLabel(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit();
                }
              }}
            />
          </span>
          <span className="item-due-date">
            <b>Due: </b> <br />
            <DatePicker
              selected={dueDate ? dueDate.toDate() : null}
              onChange={(date) => setDueDate(moment(date))}
              dateFormat="d MMM yyyy"
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
          <span className="item-label">{task.label}</span>
          <span className="item-label">{group && group.label}</span>
          <span className={`item-due-date ${moment().isAfter(task.due) ? "item-due-date__urgent" : ""}`}>
            Due: {moment(task.due).format('D MMM YYYY')}
          </span>

          <span className="item-user">{selectedUser ? selectedUser.label : 'Unassigned'}</span>

          <div className="ellipsis-dropdown">
            <button className="button button__more-actions" onClick={handleShowActionMenu}>
              <img src="/src/assets/ellipsis-vertical.svg" alt="More Actions" />
            </button>

            {showMenu && (
              <>
                <div className="actions-menu-bg" onClick={handleHideActionMenu}></div>
                <div className="actions-menu">
                  <div className="action-item action-edit" onClick={handleEditButtonClick}>Edit Task</div>
                  <div className="action-item action-delete" onClick={handleDeleteClick}>Delete Task</div>
                </div>
              </>
            )}

            <button className="button button__user-select" onClick={() => setShowUserModal(true)}>
              <img src="/src/assets/user-icon.svg" alt="Select User" />
            </button>

            {showUserModal && (
              <UserSelectionModal
              users={users}
              onSelect={handleUserSelection}
              onClose={() => setShowUserModal(false)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default TaskItem;